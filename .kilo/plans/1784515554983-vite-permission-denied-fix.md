# Fix `npm run dev` → `vite: Permission denied`

## Problem

`npm run dev` fails with `sh: /Users/zhangbiao/hcd_landingpage/node_modules/.bin/vite: Permission denied`.

## Root cause (confirmed by inspection)

All 14 Unix executable shims in `node_modules/.bin/` lost their execute bit:
they are `rw-rw-rw-` instead of `rwxrwxrwx`. The `.cmd`/`.ps1` shims are
unaffected (which is why only `npm run dev` on macOS fails).

The `com.apple.quarantine` xattr on `node_modules/.bin/vite`
(`0082;6a5d62bd;WeChat;`) confirms the `node_modules` tree arrived via WeChat
(or another non-mode-preserving channel such as an archive extracted without
`-p`). That channel strips Unix permission bits.

Affected scope is wider than just the `vite` shim:
- All 14 Unix shims in `node_modules/.bin/` (vite, esbuild, playwright, etc.)
  are missing `+x`.
- Native binary `node_modules/esbuild/bin/esbuild` is `rw-rw-rw-` (no `+x`).
- `.js` bin entrypoints such as `node_modules/vite/bin/vite.js` are also not
  executable (these work via the shim, so they are non-blocking, but they
  should be fixed too for consistency).

Secondary issue (not blocking `vite`, but worth flagging): the installed
`@esbuild` platform packages are `darwin-x64` and `win32-x64`. This machine is
Apple Silicon (`darwin-arm64`), so the correct `@esbuild/darwin-arm64` package
is missing. esbuild may fall back to the WASM build or fail at build time. This
plan does **not** fix that — it is out of scope (see Open questions).

## Goal

Restore execute permissions on the affected files so `npm run dev` works,
without changing package versions or re-installing from the network.

## Plan

1. **Restore execute bit on all `node_modules/.bin/` Unix shims.**
   ```sh
   chmod +x node_modules/.bin/*
   ```
   (Safe: `.cmd`/`.ps1` are already executable; `+x` on directories is a no-op
   for this use case and harmless.)

2. **Restore execute bit on native esbuild binary and any other native bins.**
   ```sh
   chmod +x node_modules/esbuild/bin/esbuild
   ```
   Also scan for other native binaries that lost their bit and fix them:
   ```sh
   find node_modules -type f -path "*/bin/*" ! -perm -u+x \
     \( -name "*.js" -o -name "esbuild" -o -name "node" \) -exec chmod +x {} +
   ```
   (Targets `vite/bin/vite.js`, `semver/bin/semver.js`,
   `@babel/parser/bin/babel-parser.js`, `esbuild/bin/esbuild`.)

3. **Verify the fix.**
   ```sh
   ls -la node_modules/.bin/vite          # expect rwxrwxrwx
   node_modules/.bin/vite --version      # expect a version number, not "Permission denied"
   npm run dev                            # should start the Vite dev server
   ```
   If `npm run dev` still errors with a permission message, re-check that the
   user invoking it is the file owner (`zhangbiao`) — the files are owned by
   `zhangbiao`, so `chmod +x` is sufficient.

4. **(Optional, recommended) Strip the quarantine xattr** that marks the tree
   as having arrived via WeChat. This avoids future Gatekeeper prompts on any
   signed binaries:
   ```sh
   xattr -dr com.apple.quarantine node_modules
   ```

## Out of scope

- Reinstalling `node_modules` from `npm install` (would also fix it, but is
  heavier and requires network). The user may prefer this if they want a
  clean tree.
- Installing the correct `@esbuild/darwin-arm64` platform package. This will
  surface as a separate problem if/when esbuild is invoked. If `npm run dev`
  or `npm run build` fails with an esbuild error after step 3, run
  `npm install @esbuild/darwin-arm64 --no-save` (or delete `node_modules` and
  run `npm install` on an arm64 machine).

## Risks

- `chmod +x node_modules/.bin/*` is safe and reversible; `.bin` only contains
  npm-generated shims.
- The `find ... -exec chmod +x` in step 2 is scoped to `*/bin/*` paths and
  specific names, so it will not make arbitrary `.js` files executable.

## Validation

- `node_modules/.bin/vite --version` prints a version.
- `npm run dev` starts the Vite dev server without "Permission denied".
- `ls -la node_modules/.bin/vite` shows `rwxrwxrwx`.

## Open questions

1. Should we instead do a clean `rm -rf node_modules && npm install` to also
   fix the missing `@esbuild/darwin-arm64` platform package in one shot?
   Recommended: yes, if network is available — it resolves both the
   permission issue and the wrong-platform esbuild package. If the user wants
   the minimal fix only, follow steps 1–4 above.
