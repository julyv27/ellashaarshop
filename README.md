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
npm run import:salon-products -- "/pad/naar/bestand.xlsx" 970
npm run import:new-products -- 1150 "/pad/naar/permanent- en ontkrulbehandelingen.xlsx" "/pad/naar/la-riche.xlsx"
npm run import:color-fresh-mask -- "/pad/naar/wella-color-fresh-mask.xlsx" 1205
npm run import:olaplex-products -- "/pad/naar/olaplex.xlsx" 1225
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

Aanvullende salonproducten uit `Salon_producten_fotos_aparte_ml_varianten (1).xlsx` zijn geïmporteerd als `EH-0970` t/m `EH-1149`. De import normaliseert `Schwarzkopf Professional` naar `Schwarzkopf` en `Wella Professionals` naar `Wella`, en laat leverancier/EAN/leveranciersartikelnummer leeg wanneer die niet in het bestand staan.

Nieuwe permanent- en ontkrulbehandelingen/styling en La Riché Directions-producten zijn geïmporteerd als `EH-1150` t/m `EH-1204`. `La Riche` wordt als merk `La Riché` opgeslagen.

Wella Color Fresh Mask-producten zijn geïmporteerd als `EH-1205` t/m `EH-1218`.

Deluxe Tone On Tone Developer 1 Doos is toegevoegd als `EH-1219`.

Wella Ocean Spritz en Wella waterstofperoxide-producten zijn toegevoegd als `EH-1220` t/m `EH-1224`.

OLAPLEX-producten en Schwarzkopf Blonde Me waterstofperoxide-producten zijn toegevoegd als `EH-1225` t/m `EH-1273`.

Wella Koleston Perfect 9/71 is toegevoegd als `EH-1274`.

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
