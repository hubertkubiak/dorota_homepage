# Dorota Czerwińska – homepage

A one-page website for **Dorota Czerwińska**, a mezzo-soprano from Poznań, Poland.
It presents her biography, recordings and a photo gallery, and lets visitors get in
touch through a contact form.

The site is written in plain HTML, CSS and JavaScript. There are no frameworks,
dependencies or build step, so you can open it straight in a browser.

## Features

- **Full-screen hero** with a portrait photo and a *Posłuchaj* (“Listen”) button that
  plays a short Vivaldi recording. The audio player appears on the first click.
- **Sticky navigation** that turns solid once you scroll, highlights the current
  section and collapses into a menu on small screens.
- **Biography** section.
- **Recordings**: responsive YouTube embeds that load lazily and use the
  privacy-enhanced `youtube-nocookie.com` domain.
- **Gallery** grid with a full-size preview built on the native `<dialog>` element.
- **Contact form** with client-side validation, sent asynchronously to a small PHP
  mailer.
- Responsive layout from 320 px phones to wide desktops, keyboard and screen-reader
  friendly, and it respects `prefers-reduced-motion`.

## Tech stack

| Area       | Used                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| Markup     | Semantic HTML5                                                          |
| Styles     | Modern CSS: custom properties, Grid, `clamp()`, `aspect-ratio`          |
| Scripts    | Vanilla JavaScript (ES2020): `IntersectionObserver`, `fetch`, `<dialog>` |
| Back end   | PHP 7.4+ (`mail()`) for the contact form only                           |
| Fonts      | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and [Lato](https://fonts.google.com/specimen/Lato) from Google Fonts |

## Project structure

```
.
├── index.html           # the whole page
├── css/style.css        # all styles
├── js/main.js           # navigation, audio, gallery preview, contact form
├── mail/contact_me.php  # contact form handler
├── img/                 # hero photo: WebP in two sizes + JPEG fallback
└── music/               # audio sample played by the "Posłuchaj" button
```

## Running locally

To browse the site, open `index.html` in a browser.

To test the contact form too, serve the site with PHP's built-in server:

```bash
php -S localhost:8000
```

Then go to <http://localhost:8000>. On most local machines `mail()` isn't set up, so
the form will show its error message. That is expected.

If you don't need the form, any static server works, for example
`npx serve .`.

## Configuration

- **Message recipient:** set `RECIPIENT` and `SENDER` at the top of
  [`mail/contact_me.php`](mail/contact_me.php). `SENDER` should be an address in the
  domain the site is hosted on, or many mail providers will reject the message.
- **Gallery:** the images are placeholders from [picsum.photos](https://picsum.photos).
  To use real photos, replace the `src` (thumbnail) and `data-full` (full-size image)
  attributes of each `.gallery__item` in `index.html`.
- **Recordings:** change the `src` of the iframes in the `#nagrania` section.
- **Hero photo:** the page serves `img/head-1200.webp` / `img/head-2000.webp` to modern
  browsers and `img/head.jpg` as a fallback (and as the social-media preview). When
  replacing the photo, export all three. With [Pillow](https://pypi.org/project/pillow/)
  that is `img.save("head-2000.webp", quality=78, method=6)` and so on. JPEG quality
  around 80 keeps the files small without visible loss.

## Deployment

Upload the files to any host that runs PHP, such as typical shared hosting. If the
contact form isn't needed, a static host like GitHub Pages, Netlify or Cloudflare
Pages is enough.

## History

The site was first built in 2016 on the
[Start Bootstrap – Freelancer](https://github.com/StartBootstrap/startbootstrap-freelancer)
template (Bootstrap 3, jQuery, LESS, Gulp). It was later rewritten without
dependencies while keeping the same content and features. The original version is
still in the git history.

## Author

Hubert Kubiak – [github.com/hubertkubiak](https://github.com/hubertkubiak)

## License

[MIT](LICENSE)
