# MboaGo — Landing page

Site vitrine en français de l’application MboaGo, construit avec Next.js App Router, React et TypeScript. Le site reprend la police Inter, la palette, les illustrations et les icônes du projet mobile `busapp`.

## Développement

Node.js 24 LTS recommandé (voir `.nvmrc`), npm et un navigateur récent.

```bash
npm ci
npm run dev
```

Ouvrir http://localhost:3000.

## Vérifications et production

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Tests de navigation, d’accessibilité et de débordement mobile :

```bash
npm run test:e2e
```

Les tests utilisent le canal Chrome installé sur la machine. Si nécessaire : `npx playwright install chrome`. Ils démarrent automatiquement le serveur de développement sur le port 3000 ; il est possible de choisir une autre adresse via `PLAYWRIGHT_BASE_URL`. Pour tester le build de production, lancer `npm start` avant les tests.

## Configuration du lancement

Copier `.env.example` vers `.env.local` et renseigner :

- `NEXT_PUBLIC_SITE_URL` : URL HTTPS publique du site. Active la canonical, l’indexation et le sitemap. Sans valeur, le site reste en `noindex` pour les aperçus locaux.
- `NEXT_PUBLIC_APP_STORE_URL` : lien officiel `https://apps.apple.com/...`.
- `NEXT_PUBLIC_GOOGLE_PLAY_URL` : lien officiel `https://play.google.com/...`.

Les stores sans URL restent en « Bientôt sur… ». Aucun lien fictif, formulaire de collecte, paiement ou réservation réelle n’est proposé. Les valeurs sont incorporées au build : reconstruire après une modification. Adapter également les réponses de FAQ de `src/config/site.ts` lorsque l’application sera lancée.

## Structure

- `src/app/page.tsx` : sections de la landing page, rendues côté serveur.
- `src/app/globals.css` : tokens visuels, styles, animations et responsive.
- `src/components` : navigation mobile, aperçu interactif, boutons de stores, révélations au défilement et icônes d’origine adaptées au SVG web.
- `src/config/site.ts` : marque, liens, destinations et FAQ.
- `src/components/service-features.tsx` : contenu des trois univers (trajets, hôtels, activités), rendu côté serveur.
- `src/components/service-showcase.tsx` et son module CSS : sélection au clic, glissement continu sur les onglets, balayage du contenu et navigation au clavier. Les panneaux partagent une hauteur stable, les gestes verticaux restent dédiés au défilement et un geste annulé rétablit la sélection précédente.
- `src/app/opengraph-image.tsx` et `icon.tsx` : visuels de partage et favicon générés localement.
- `public/images` : visuels issus de l’application ; illustrations converties en WebP et images servies par `next/image`.
- `src/fonts` : police Inter auto-hébergée et sa licence.
- `tests/landing.spec.ts` : parcours navigateur et audit axe.
- `tests/services.spec.ts` : contenu des onglets, stabilité de mise en page, clavier, souris, tactile natif, annulation de geste et défilement vertical.

Les animations respectent `prefers-reduced-motion`. La FAQ fonctionne sans JavaScript, et les onglets de l’aperçu proposent la navigation avec les flèches du clavier. Aucun service tiers n’est nécessaire au rendu de la page.

## Hébergement Node.js

Déployer avec `npm ci`, `npm run build`, puis `npm start`. Le site peut être hébergé sur un serveur Node.js ou une plateforme compatible Next.js. Les ressources graphiques et polices nécessaires au site sont incluses dans ce dépôt, sans dépendance au dossier mobile à l’exécution.

Les visuels et données de présentation viennent du prototype mobile ; aucune affiliation avec des opérateurs ni disponibilité commerciale n’est affirmée. Les mentions de lancement et les destinations doivent être validées avant ouverture commerciale.
