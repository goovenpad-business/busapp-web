# MboaGo — Landing page

Site vitrine en français de l’application MboaGo, construit avec React, TypeScript et Vite 8. Le site reprend la police Inter, la palette, les illustrations et les icônes du projet mobile `busapp`.

## Développement

Node.js 22.12 minimum, Node.js 24 LTS recommandé (voir `.nvmrc`), npm et un navigateur récent.

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

Le build produit le dossier **`dist/`** : `index.html`, `404.html`, `assets/`, images,
polices et métadonnées générées, ainsi que `en/index.html` et `en/404.html` pour la version anglaise. `npm start` sert cet export localement sur le port 3000.

Tests de navigation, d’accessibilité et de débordement mobile :

```bash
npm run test:e2e
```

Les tests utilisent le canal Chrome installé sur la machine. Si nécessaire : `npx playwright install chrome`. Ils démarrent automatiquement le serveur de développement sur le port 3000 ; il est possible de choisir une autre adresse via `PLAYWRIGHT_BASE_URL`. Pour tester le build de production, lancer `npm start` avant les tests.

## Langues

La landing utilise **i18next et react-i18next**. Le sélecteur du header propose **Français / English**, sur ordinateur et mobile. Le changement est immédiat et conserve les onglets actifs et la FAQ ouverte.

- `/` : version française par défaut. Un choix anglais précédemment enregistré est restauré après l’hydratation.
- `/en/` : version anglaise accessible directement, prioritaire sur la préférence enregistrée.
- Le choix explicite est conservé dans `localStorage` sous `mboago.language`. Si le navigateur bloque le stockage, le sélecteur et les URL continuent de fonctionner.
- Les paramètres d’URL et l’ancre sont conservés au changement de langue. Les boutons précédent/suivant du navigateur suivent la langue affichée.

Les traductions sont dans `src/i18n/locales/fr.json` et `en.json`, avec les mêmes clés. Utiliser `useTranslation()` pour les textes et `Trans` pour les phrases avec mise en forme. Les clés sont vérifiées par TypeScript ; les tests contrôlent aussi la parité des dictionnaires et leurs variables d’interpolation.

Les deux langues sont prérendues au build, avec le titre, la description, les textes alternatifs et l’attribut HTML `lang` adaptés. Lorsque `VITE_SITE_URL` est renseignée, les canonical, les liens `hreflang` et le sitemap exposent les deux versions. Les traductions sont embarquées : aucun service de traduction ni téléchargement de dictionnaire n’est nécessaire.

## Configuration du lancement

Copier `.env.example` vers `.env.local` et renseigner :

- `VITE_SITE_URL` : URL HTTPS publique du site. Active la canonical, l’indexation et le sitemap. Sans valeur, le site reste en `noindex` pour les aperçus locaux.
- `VITE_APP_STORE_URL` : lien officiel `https://apps.apple.com/...`.
- `VITE_GOOGLE_PLAY_URL` : lien officiel `https://play.google.com/...`.

Les anciens noms `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_STORE_URL` et `NEXT_PUBLIC_GOOGLE_PLAY_URL` restent acceptés pour les fichiers `.env.local` existants ; les noms `VITE_` sont prioritaires.

Les stores sans URL restent en « Bientôt sur… ». Aucun lien fictif, formulaire de collecte, paiement ou réservation réelle n’est proposé. Les valeurs sont incorporées au build : reconstruire après une modification. Adapter également les réponses de FAQ de `src/config/site.ts` lorsque l’application sera lancée.

## Structure

- `src/App.tsx` : sections de la landing page, prérendues en HTML à la compilation.
- `src/styles/globals.css` : tokens visuels, styles, animations et responsive.
- `src/i18n` : dictionnaires français/anglais, initialisation i18next, langue mémorisée et métadonnées localisées.
- `src/components/language-selector.tsx` : menu animé des langues dans le header, avec langue active, navigation au clavier et fermeture au clic extérieur ou avec Échap.
- `src/main.tsx` : hydratation React du HTML généré, ou rendu client pendant le développement.
- `scripts/prerender.mjs` : prérendu au build, sans serveur de rendu à déployer.
- `vite.config.ts` : Vite, ports, métadonnées HTML, `robots.txt` et sitemap.
- `src/components` : navigation mobile, aperçu interactif, boutons de stores, révélations au défilement et icônes d’origine adaptées au SVG web.
- `src/config/site.ts` : marque, liens, destinations et FAQ.
- `src/components/service-features.tsx` : contenu des trois univers (trajets, hôtels, activités), prérendu en HTML.
- `src/components/service-showcase.tsx` et son module CSS : sélection au clic, glissement continu sur les onglets, balayage du contenu et navigation au clavier. Les panneaux partagent une hauteur stable, les gestes verticaux restent dédiés au défilement et un geste annulé rétablit la sélection précédente.
- `src/hooks/use-spring-indicator.ts` : suivi direct du doigt, puis retour souple à l’onglet sélectionné, sans rendu React à chaque mouvement. Les cartes entrent avec un léger décalage comme les billets de l’application.
- `src/components/interactive-card.tsx` : relief au survol, au toucher et au focus clavier, sans bloquer les gestes. Les effets se désactivent avec la préférence de réduction des animations.
- `src/components/shared-moments.tsx` : présentation d’Explorer, des souvenirs sur le profil et des groupes de voyages et d’activités, avec les visuels et icônes de l’application.
- `public/opengraph-image.png` et `public/favicon.png` : visuels de partage et favicon statiques.
- `public/images` : visuels issus de l’application ; illustrations converties en WebP et images servies directement comme fichiers statiques avec des balises HTML `img` et chargement différé.
- `src/fonts` : police Inter auto-hébergée et sa licence.
- `tests/landing.spec.ts` : parcours navigateur et audit axe.
- `tests/services.spec.ts` : contenu des onglets, stabilité de mise en page, clavier, souris, tactile natif, annulation de geste et défilement vertical.
- `tests/services-motion.spec.ts` : suivi partiel du curseur, changements rapides de direction, fin du mouvement, relief tactile et respect de la réduction des animations.

- `tests/languages.spec.ts` : traduction des parcours, préférence persistante, historique, stockage indisponible, responsive et accessibilité en anglais.

Les animations respectent `prefers-reduced-motion`. La FAQ fonctionne sans JavaScript, et les onglets de l’aperçu proposent la navigation avec les flèches du clavier. Aucun service tiers n’est nécessaire au rendu de la page.

## Hébergement statique

Exécuter `npm ci` puis `npm run build`, et déployer **tout le contenu de `dist/`** à la racine de l’hébergement : `index.html`, `assets/`, `images/`, favicon, image de partage, `robots.txt`, `sitemap.xml` et `404.html`. Inclure le sous-dossier **`en/`**. Le build contient déjà le texte de la landing dans les deux langues ; la FAQ et les liens restent disponibles sans JavaScript à leur URL respective. Aucun serveur Node.js n’est nécessaire sur l’hébergement.

`npm start` ou `npm run preview` lance l’aperçu Vite du build sur le port 3000. Pour tester sur un autre port : `npm run preview -- --port 3002`. Cet aperçu sert à la vérification locale ; en production, utiliser un hébergement de fichiers statiques. Les ressources graphiques et polices sont incluses dans le build, sans dépendance au dossier mobile à l’exécution.

Configurer l’hébergement pour servir `404.html` avec un statut HTTP 404 sur les chemins inexistants. Le site est prévu pour la racine d’un domaine. Un déploiement sous un sous-répertoire demande également d’adapter les URL publiques des médias et de configurer la propriété `base` de Vite.

L’hébergement doit servir `/en/index.html` à l’adresse `/en/` (index de répertoire standard), sans le remplacer par l’index français. Une page `en/404.html` traduite est aussi disponible si l’hébergeur permet de définir une erreur 404 propre à ce répertoire.

La sortie est désormais `dist/`. Les anciens dossiers `.next/` et `out/` ne sont plus utilisés. Les versions sont verrouillées dans `package-lock.json`. Documentation : [Vite — build de production](https://vite.dev/guide/build).

Les visuels et données de présentation viennent du prototype mobile ; aucune affiliation avec des opérateurs ni disponibilité commerciale n’est affirmée. Les mentions de lancement et les destinations doivent être validées avant ouverture commerciale.

L’espace professionnel est accessible depuis le menu, le bloc partenaires et le pied de page, en français et en anglais. Les liens ouvrent l’accueil public `https://mboago-management.goovenpad.com/`. `VITE_MANAGEMENT_URL` permet de remplacer cette destination HTTPS lors du build.
