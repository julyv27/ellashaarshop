# Technisch uitvoeringsplan

## Architectuur

Ella's Haarshop wordt een private Cloudflare Pages-app met:

- React + TypeScript + Vite voor de tablet-first interface.
- Cloudflare Pages Functions voor alle API-routes.
- Cloudflare D1 als relationele database.
- Cloudflare Access / Zero Trust als primaire toegangspoort.
- Server-side allowlistcontrole op API-routes via Access email headers.

Er wordt geen eigen wachtwoorddatabase gebouwd. Toegestane e-mailadressen en beheerders worden via secrets/configuratie gezet.

## Datamodel

De database gebruikt permanente interne productcodes zoals `EH-0001`, los van barcode, leverancier en merk. Producten, merken, lijnen, categorieën, producttypes en leveranciers gebruiken soft-deactivation via `active`.

Orderhistorie bewaart snapshots van productvelden zodat historische bestellingen leesbaar blijven wanneer masterdata later wijzigt.

## Import

Het Excel-bestand `Ellas_Haarshop_master_productcatalogus_merken_en_lijnen.xlsx` is de bron van waarheid voor de initiële seed. Importcode behandelt kleurcodes als tekst en gebruikt lege velden als `NULL`. Het importproces maakt een validatierapport met aantallen per merk/producttype en geweigerde regels.

## Fasen

1. Repositorybasis, documentatie en Cloudflare-configuratie.
2. D1-schema, types, import- en seedpipeline.
3. Catalogusimport en validatierapport.
4. Cloudflare Access-compatible authenticatie en autorisatie.
5. Productcatalogus, zoeken, filters en tablet-UI.
6. Bestellijst met aantallen.
7. Excel/PDF/tekstexports.
8. Orderhistorie.
9. Beheeromgeving met CRUD, soft-deactivation en masterdata-export.
10. Tests, responsive QA, security review en deploymentdocumentatie.

## Bewuste eenvoud

Geen betaalde diensten, geen eigen auth-systeem, geen POS- of voorraadmodule in V1. De databasevelden en API-structuur laten deze modules later wel toe.
