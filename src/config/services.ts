export const serviceModes = [
  {
    id: 'travel',
    label: 'services.travel.label',
    category: 'services.travel.category',
    icon: 'bus',
    announcement: 'services.travel.category',
  },
  {
    id: 'stay',
    label: 'services.stay.label',
    category: 'services.stay.category',
    icon: 'hotel',
    announcement: 'services.stay.announcement',
  },
  {
    id: 'activity',
    label: 'services.activity.label',
    category: 'services.activity.category',
    icon: 'activity',
    announcement: 'services.activity.announcement',
  },
] as const;

export type ServiceMode = (typeof serviceModes)[number]['id'];
