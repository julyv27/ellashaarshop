# Projectregels voor Ella's Haarshop

Deze repository bevat een private bestelsysteem-app voor de fysieke winkel Ella's Haarshop. Toekomstige Codex-sessies moeten deze regels volgen.

## Data-integriteit

- Exacte kleurcodes nooit automatisch wijzigen.
- `7.0` is niet hetzelfde als `7.00`.
- Numerieke kleurcodes altijd als tekst opslaan en behandelen.
- Verzin nooit ontbrekende EAN-codes, leveranciersartikelnummers, kleurcodes, productnamen of inhoudsmaten.
- Lege bronwaarden blijven leeg of `NULL`.
- Barcode/GTIN is optioneel en nooit de primaire productidentiteit.
- Ieder product heeft een permanente interne product-ID zoals `EH-0001`.

## Producten en historie

- Producten niet hard deleten als er historie is.
- Gebruik soft-deactivation met `active = true/false`.
- Inactieve producten verdwijnen standaard uit de bestelinterface maar blijven zichtbaar in orderhistorie.
- Orderregels bewaren snapshotvelden voor historische leesbaarheid.

## Leveranciers

- Leveranciers intern bewaren.
- Leverancier niet standaard tonen in de zichtbare bestellijst of standaardexports.
- Geen leveranciersfilter in de normale bestelinterface tenzij expliciet gevraagd.

## Architectuur

- Database moet uitbreidbaar zijn voor voorraad, goederenontvangst, besteladvies en toekomstige POS/barcodescanner-integratie.
- Bouw geen eigen wachtwoorddatabase.
- Bescherm frontend en API via Cloudflare Access en server-side allowlistcontrole.
- Geen secrets committen; gebruik environment variables of Cloudflare secrets.
- Houd dependencies beperkt en onderhoudbaar.

## UI

- Tablet-first.
- Rustig, professioneel, duidelijke grote klikvlakken.
- Beheer alleen tonen aan geautoriseerde beheerders.
