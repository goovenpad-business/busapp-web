export const serviceModes = [
  { id: 'travel', label: 'Prenez la route', icon: 'bus', announcement: 'Voyages en bus' },
  { id: 'stay', label: 'Posez vos valises', icon: 'hotel', announcement: 'Séjours à l’hôtel' },
  {
    id: 'activity',
    label: 'Vivez le moment',
    icon: 'activity',
    announcement: 'Sorties et activités',
  },
] as const;

export type ServiceMode = (typeof serviceModes)[number]['id'];
