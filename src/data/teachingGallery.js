// Teaching-form photo gallery data.
// Photos live in /public/coursepic. All photos are shown on a single gallery
// page regardless of which delivery-format card was clicked.
// Each Masonry item needs: id, img, url, height.
// `height` is the rendered cell height target (Masonry internally uses height/2).

const base = '/coursepic'

const PHOTOS = [
  { file: 'online1.jpg', height: 460 },
  { file: 'online2.jpg', height: 600 },
  { file: 'online3.jpg', height: 520 },
  { file: 'online4.jpg', height: 640 },
  { file: 'online5.jpg', height: 480 },
  { file: 'offline1.jpg', height: 520 },
  { file: 'offline2.jpg', height: 640 },
  { file: 'offline3.jpg', height: 480 },
  { file: 'offline4.jpg', height: 560 },
  { file: 'offline5.jpg', height: 680 },
  { file: 'offline6.jpg', height: 460 },
  { file: 'offline7.png', height: 600 },
  { file: 'offline8.png', height: 540 },
  { file: 'offline9.png', height: 500 },
  { file: 'blended1.jpg', height: 520 },
  { file: 'blended2.jpg', height: 680 },
  { file: 'blended3.jpg', height: 480 },
]

export const galleryItems = PHOTOS.map((p, index) => ({
  id: `photo-${index + 1}`,
  img: `${base}/${p.file}`,
  // Clicking a tile opens the full-size photo in a new tab.
  url: `${base}/${p.file}`,
  height: p.height,
}))
