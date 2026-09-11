# Ella's Haarshop Bestelsysteem

Private webapp voor medewerkers van Ella's Haarshop om producten bij leveranciers te bestellen. Dit is geen webshop: er zijn geen prijzen en er is geen automatische e-mailfunctie.

## Stack

- React + TypeScript + Vite
- Cloudflare Pages Functions
- Cloudflare D1
- Cloudflare Access / Zero Trust
- Vitest

## Lokale setup

```bash
npm install
npm run import:catalog
npm run db:local:apply
npm run dev
```

De app draait lokaal via Wrangler Pages Dev. Zet voor lokale ontwikkeling variabelen in `.dev.vars` op basis van `.env.example`.

## Belangrijke scripts

```bash
npm run import:catalog     # Excel-bronbestand valideren en seed SQL genereren
npm run db:local:apply     # migrations + gegenereerde seed toepassen op lokale D1
npm run test               # unit/integratietests
npm run build              # frontend build
npm run dev                # lokale Cloudflare Pages devserver
```

## Authenticatie

Productie hoort achter Cloudflare Access te staan. Cloudflare Access laat alleen toegestane e-mailadressen binnen. Daarnaast controleert de API server-side:

- `ALLOWED_EMAILS`: komma-gescheiden lijst toegestane gebruikers
- `ADMIN_EMAILS`: komma-gescheiden lijst beheerders

Hardcode deze e-mailadressen niet in broncode.

## Cloudflare deployment

1. Maak een Cloudflare D1 database aan.
2. Vul de database-id in `wrangler.toml`.
3. Maak een Cloudflare Pages project vanaf deze repository.
4. Configureer Cloudflare Access voor de Pages URL met one-time PIN of gewenste IdP.
5. Voeg `ALLOWED_EMAILS` en `ADMIN_EMAILS` toe als Cloudflare secrets/environment variables.
6. Draai migrations en seed:

```bash
npm run import:catalog
npx wrangler d1 migrations apply ellashaarshop-db --remote
npx wrangler d1 execute ellashaarshop-db --remote --file=./generated/catalog-seed.sql
```

## Nieuwe allowed e-mailadressen

Voeg het e-mailadres toe aan:

1. De Cloudflare Access policy allowlist.
2. De Pages environment variable/secret `ALLOWED_EMAILS`.
3. Indien beheerrechten nodig zijn ook aan `ADMIN_EMAILS`.

## Masterdata export en D1 backup

In Beheer kan de product-masterdata als CSV worden geëxporteerd. Voor een D1 backup:

```bash
npx wrangler d1 export ellashaarshop-db --remote --output=backup.sql
```

Bewaar backups buiten de repository.

## Productbeheer

Via Beheer kunnen merken, lijnen/submerken, categorieën, producttypes, leveranciers en producten worden toegevoegd of aangepast. Producten met orderhistorie worden gedeactiveerd in plaats van hard verwijderd.

## Toekomstige uitbreidingen

De database is voorbereid op optionele barcode/GTIN en permanente interne product-ID's. Voorraad, besteladvies en POS-integratie worden in V1 niet gebouwd, maar kunnen later op basis van `products.id` en `products.barcode_gtin` worden toegevoegd.
