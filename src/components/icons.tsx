import { useTranslation } from 'react-i18next';
import { ControlGlyph, type ControlGlyphName } from './ControlGlyph';
import { PremiumGlyph, type PremiumGlyphName } from './PremiumGlyph';

export function Icon({
  name,
  size = 28,
  className = '',
}: {
  name: PremiumGlyphName;
  size?: number;
  className?: string;
}) {
  return <PremiumGlyph name={name} size={size} className={className} aria-hidden="true" />;
}

export function Arrow({
  name = 'arrow',
  size = 20,
  className = '',
}: {
  name?: ControlGlyphName;
  size?: number;
  className?: string;
}) {
  return (
    <ControlGlyph
      name={name}
      size={size}
      color="currentColor"
      className={className}
      aria-hidden="true"
    />
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  const { t } = useTranslation();
  return (
    <a
      href="#accueil"
      className={`brand${light ? ' brand-light' : ''}`}
      aria-label={t('navigation.home')}
    >
      <span className="brand-symbol">
        <Icon name="bus" size={29} />
      </span>
      MboaGo<span className="brand-dot">.</span>
    </a>
  );
}
