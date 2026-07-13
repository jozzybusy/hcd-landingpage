import { DotLottieReact } from '@lottiefiles/dotlottie-react'

/*
  Generic .lottie player for cards.

  Loads the original dotLottie archive (which can bundle images and other
  assets) instead of extracting JSON manually. This avoids broken image
  references that occur when lottie-web tries to resolve embedded assets
  from a standalone JSON file.

  Props:
    - src: public URL to the .lottie file
    - loop: whether the animation should loop (default true)
    - autoplay: whether the animation should start automatically (default true)
*/

function DotLottiePlayer({ src, loop = true, autoplay = true }) {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}

export default DotLottiePlayer
