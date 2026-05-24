# R_hmt ofc — Cinematic Portfolio

Static portfolio siap deploy ke Vercel, Netlify, GitHub Pages, atau hosting biasa.

## Run lokal

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Cek file

```bash
npm run check
```

## Deploy Vercel

Upload folder ini ke GitHub, lalu import project di Vercel. Tidak butuh build khusus karena ini static site.

## Deploy hosting biasa

Upload isi folder ini ke public_html atau root hosting statis.

## Catatan desain

- No emoji icon. Icon memakai SVG/CSS mask.
- Profile image tidak dibuat bulat biasa.
- Fake 3D memakai CSS transform/perspective agar tetap ringan.
- Animasi mendukung `prefers-reduced-motion`.
- Mobile-first dan device rendah diprioritaskan.
