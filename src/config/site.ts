import { createSite } from './site-settings';
export const site = createSite({
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
  VITE_APP_STORE_URL: import.meta.env.VITE_APP_STORE_URL,
  VITE_GOOGLE_PLAY_URL: import.meta.env.VITE_GOOGLE_PLAY_URL,
});

export const navigation = [
  { href: '#decouvrir', label: 'navigation.app' },
  { href: '#destinations', label: 'navigation.inspiration' },
  { href: '#comment-ca-marche', label: 'navigation.how' },
  { href: '#questions', label: 'navigation.faq' },
] as const;

export const destinations = [
  {
    name: 'Kribi',
    image: '/images/kribi.jpg',
    category: 'destinations.kribi.category',
    description: 'destinations.kribi.description',
    tag: 'destinations.kribi.tag',
  },
  {
    name: 'Buéa',
    image: '/images/buea.jpg',
    category: 'destinations.buea.category',
    description: 'destinations.buea.description',
    tag: 'destinations.buea.tag',
  },
  {
    name: 'Douala',
    image: '/images/douala.jpg',
    category: 'destinations.douala.category',
    description: 'destinations.douala.description',
    tag: 'destinations.douala.tag',
  },
  {
    name: 'Yaoundé',
    image: '/images/yaounde.jpg',
    category: 'destinations.yaounde.category',
    description: 'destinations.yaounde.description',
    tag: 'destinations.yaounde.tag',
  },
] as const;

export const faqs = [
  {
    question: 'faq.about.question',
    answer: 'faq.about.answer',
  },
  {
    question: 'faq.available.question',
    answer: 'faq.available.answer',
  },
  {
    question: 'faq.destinations.question',
    answer: 'faq.destinations.answer',
  },
  {
    question: 'faq.booking.question',
    answer: 'faq.booking.answer',
  },
  {
    question: 'faq.payment.question',
    answer: 'faq.payment.answer',
  },
] as const;
