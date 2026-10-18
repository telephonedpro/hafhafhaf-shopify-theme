# Parveja

Premium redesign of [parveja.com](https://parveja.com): automatic pet feeders for cats and dogs.

Vite + React + TypeScript + Framer Motion. All product copy, prices, specifications and images come from the live parveja.com site (`src/data/feeders.ts`, `public/images/`).

## Run

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
```

## Checkout

Payments do not run on this site. Every "Buy" button links to the matching product page on the existing parveja.com store, and the contact page links to the store's contact form. Change `shopUrl` in `src/data/feeders.ts` and `CONTACT_FORM` in `src/pages/Contact.tsx` when checkout moves.

## Pages

`/`, `/products/:slug` (essential, view, preserve, horizon), `/compare`, `/how-it-works`, `/about`, `/faq`, `/shipping`, `/contact`.
