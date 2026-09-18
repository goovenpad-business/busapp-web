function httpsUrl(value: string | undefined, hosts?: string[]) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (!hosts || hosts.includes(url.hostname))
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export const site = {
  name: 'MboaGo',
  title: 'MboaGo — Le Cameroun, à portée de main.',
  description:
    'Un trajet, une escapade, un nouveau souvenir. Découvrez MboaGo, l’application qui réunit voyages en bus, hôtels et activités au Cameroun.',
  url: httpsUrl(process.env.NEXT_PUBLIC_SITE_URL),
  appStore: httpsUrl(process.env.NEXT_PUBLIC_APP_STORE_URL, ['apps.apple.com']),
  googlePlay: httpsUrl(process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL, ['play.google.com']),
};

export const navigation = [
  { href: '#decouvrir', label: 'L’application' },
  { href: '#destinations', label: 'Inspirations' },
  { href: '#comment-ca-marche', label: 'Comment ça marche' },
  { href: '#questions', label: 'FAQ' },
];

export const destinations = [
  {
    name: 'Kribi',
    image: '/images/kribi.jpg',
    category: 'L’appel de l’océan',
    description: 'Les pieds dans le sable. L’esprit ailleurs.',
    tag: 'Bord de mer',
  },
  {
    name: 'Buéa',
    image: '/images/buea.jpg',
    category: 'Prendre de la hauteur',
    description: 'Un grand bol d’air au pied du mont Cameroun.',
    tag: 'Nature',
  },
  {
    name: 'Douala',
    image: '/images/douala.jpg',
    category: 'Au rythme de la ville',
    description: 'Des adresses, des sorties, de belles rencontres.',
    tag: 'City break',
  },
  {
    name: 'Yaoundé',
    image: '/images/yaounde.jpg',
    category: 'Changer de perspective',
    description: 'Sept collines et mille façons de s’évader.',
    tag: 'Découverte',
  },
];

export const faqs = [
  {
    question: 'Qu’est-ce que MboaGo ?',
    answer:
      'MboaGo est une application pensée pour voyager et sortir au Cameroun. Elle réunit la recherche de trajets en bus, les séjours à l’hôtel, les activités et un espace pour retrouver vos billets. Le projet est actuellement en préparation.',
  },
  {
    question: 'L’application est-elle déjà disponible ?',
    answer:
      'MboaGo est en cours de préparation pour iOS et Android. Les liens officiels de téléchargement seront ajoutés à cette page dès sa publication sur l’App Store et Google Play.',
  },
  {
    question: 'Quelles destinations peut-on découvrir ?',
    answer:
      'L’aperçu présente notamment Douala, Yaoundé, Kribi, Buéa, Limbé et Bafoussam. Les trajets, hébergements et activités réellement disponibles seront précisés dans l’application au lancement.',
  },
  {
    question: 'Comment fonctionnera la réservation ?',
    answer:
      'Le parcours est conçu pour vous permettre de choisir votre trajet et votre siège, de consulter le récapitulatif, puis de retrouver votre billet dans l’application. Les aperçus de cette page sont illustratifs : ils ne permettent pas d’effectuer une réservation réelle.',
  },
  {
    question: 'Quels moyens de paiement sont prévus ?',
    answer:
      'L’application prévoit MTN Mobile Money, Orange Money et la carte bancaire. Leur disponibilité sera confirmée au lancement. Aucun paiement n’est effectué ou collecté sur ce site.',
  },
];
