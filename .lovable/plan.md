## Goal

Use the uploaded LEGO retro-hacker desk photo as a site-wide background image, layered behind the existing aurora orbs, with the hero name/intro sitting on top of it.

## What changes

**1. Upload the image as a CDN asset**
- `lovable-assets create --file /mnt/user-uploads/image-7.png --filename hacker-desk.png` → `src/assets/hacker-desk.png.asset.json`

**2. `Backdrop.tsx` — replace the current aurora wallpaper layer**
- Swap the existing `wallpaper.jpg` layer for the new image, kept `fixed`, `bg-cover bg-center`.
- Two-tier opacity so text always stays readable:
  - Light mode: ~0.10 opacity, plus a paper-toned wash over it.
  - Dark mode: ~0.35 opacity (the photo is already dark green, so it reads naturally).
- Keep the radial mask so the image is strongest behind the hero and fades out down the page.
- Add a vertical gradient scrim (`background → transparent → background`) above the photo so mid-page content isn't fighting the texture.
- Keep the 5 aurora orbs and grid overlay layered on top — they now tint the photo instead of standing alone.

**3. Hero legibility pass (`Hero.tsx`)**
- Add a soft radial vignette / backdrop-blur panel behind the name + tagline block only, so "AYUSH RANA" stays crisp against the busy photo.
- No copy or layout changes.

**4. Cleanup**
- Delete the now-unused `wallpaper.jpg` asset pointer via `lovable-assets delete`.

## Verification

- Playwright screenshots at desktop + mobile, light and dark mode, checking hero contrast and that mid-page sections (Skills, Projects) aren't visually noisy.
