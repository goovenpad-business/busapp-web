// Adapted from busapp/src/icons; preserves the original application artwork.
import { memo, useId } from 'react';
import type { SVGProps } from 'react';
type SvgProps = SVGProps<SVGSVGElement>;
const Svg = 'svg',
  Circle = 'circle',
  Defs = 'defs',
  G = 'g',
  LinearGradient = 'linearGradient',
  Path = 'path',
  Rect = 'rect',
  Stop = 'stop';

// Original companion drawings for the illustrated collection: no legacy fallback.
const paths = {
  plus: 'M32 13V51M13 32H51',
  minus: 'M13 32H51',
  close: 'M17 17 47 47M47 17 17 47',
  back: 'M29 13 10 32 29 51M11 32H54',
  arrow: 'M35 13 54 32 35 51M53 32H10',
  down: 'M16 25 32 41 48 25',
  up: 'M16 39 32 23 48 39',
  next: 'M25 16 41 32 25 48',
  external: 'M25 13H51V39M50 14 14 50',
  check: 'M13 33 26 46 51 19',
  menu: 'M11 16H53M11 32H53M11 48H41',
  pause: 'M23 16V48M41 16V48',
  play: 'M23 14 49 32 23 50Z',
  send: 'M8 29 55 8 36 56 28 36 8 29ZM28 36 55 8',
  navigation: 'M10 29 53 10 35 55 28 36 10 29Z',
  repeat: 'M14 25V19Q14 12 21 12H51M43 5 51 12 43 19M50 39V45Q50 52 43 52H13M21 45 13 52 21 59',
  share: 'M32 40V7M21 18 32 7 43 18M15 30H10V53H54V30H49',
  logout: 'M29 10H12V54H29M25 32H55M45 22 55 32 45 42',
  volume: 'M10 25H21L34 13V51L21 39H10ZM43 23Q51 32 43 41M50 16Q64 32 50 48',
  mute: 'M10 25H21L34 13V51L21 39H10ZM44 25 56 39M56 25 44 39',
  wifi: 'M7 23Q32 3 57 23M15 33Q32 19 49 33M24 43Q32 36 40 43M32 52V52.2',
  zap: 'M37 6 13 36H29L25 58 51 27H35Z',
  sparkle: 'M32 6Q32 32 8 32 32 32 32 58 32 32 56 32 32 32 32 6ZM51 8V18M46 13H56',
  bookmark: 'M17 9H47V56L32 45 17 56Z',
  comment: 'M32 8C1 8 0 48 22 52L17 59 34 54C67 54 66 8 32 8Z',
  phoneCall: 'M16 8 26 20 20 27Q25 39 37 44L44 38 56 48Q48 65 28 51 6 35 8 17Z',
  pencil: 'M11 42 43 10 55 22 23 54 8 57ZM36 17 48 29M11 42 23 54',
  crown: 'M9 19 20 29 32 10 44 29 55 19 50 51H14Z',
  drink: 'M12 12H52L32 36ZM32 36V54M22 54H42',
  plug: 'M22 8V22M42 8V22M15 22H49V29Q49 43 32 43V56M15 29Q15 43 32 43',
  air: 'M10 15H54V38H10ZM17 29H47M21 47V55M32 45V58M43 47V55',
  monitor: 'M8 10H56V43H8ZM32 43V54M20 54H44',
  toilet: 'M10 9H27V33H10ZM14 33H53Q53 48 36 48L40 57H23L25 46Q14 42 14 33Z',
  lock: 'M19 28V19C19 1 45 1 45 19V28M12 28H52V56H12ZM32 38V46',
  mail: 'M8 14H56V50H8ZM8 14 32 34 56 14',
  briefcase: 'M23 17V9H41V17M8 17H56V52H8ZM8 30Q32 43 56 30M32 31V40',
  headphones: 'M12 36V28C12 0 52 0 52 28V36M10 30H19V48H10ZM45 30H54V48H45ZM49 48Q49 58 34 57',
  trash: 'M10 17H54M25 17V9H39V17M16 17 19 55H45L48 17M27 27V45M37 27V45',
  at: 'M44 21V38Q44 45 51 41C65 34 51 2 29 8 0 10 0 53 27 56Q41 58 48 51M43 29C39 14 20 21 22 35 24 51 43 40 43 29Z',
} as const;

export type ControlGlyphName =
  | keyof typeof paths
  | 'clock'
  | 'info'
  | 'checkCircle'
  | 'more'
  | 'locate'
  | 'gauge'
  | 'phone'
  | 'game'
  | 'siren'
  | 'ambulance';

export const ControlGlyph = memo(function ControlGlyph({
  name,
  size = 24,
  color = '#35434C',
  strokeWidth = 2,
  ...props
}: SvgProps & { name: ControlGlyphName; size?: number }) {
  const id = `control-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const stroke = `url(#${id})`;
  const weight = Math.max(3, Number(strokeWidth) * 2.4);
  let drawing;
  if (name in paths) {
    drawing = (
      <Path
        d={paths[name as keyof typeof paths]}
        fill={name === 'play' || name === 'zap' || name === 'navigation' ? stroke : 'none'}
      />
    );
  } else
    switch (name) {
      case 'clock':
        drawing = (
          <>
            <Circle cx="32" cy="32" r="24" />
            <Path d="M32 17V32L43 38" />
          </>
        );
        break;
      case 'info':
        drawing = (
          <>
            <Circle cx="32" cy="32" r="24" />
            <Path d="M32 30V45M32 19V19.2" />
          </>
        );
        break;
      case 'checkCircle':
        drawing = (
          <>
            <Circle cx="32" cy="32" r="24" />
            <Path d="M19 32 28 41 45 23" />
          </>
        );
        break;
      case 'more':
        drawing = (
          <>
            {[15, 32, 49].map((y) => (
              <Circle key={y} cx="32" cy={y} r="3" fill={stroke} />
            ))}
          </>
        );
        break;
      case 'locate':
        drawing = (
          <>
            <Circle cx="32" cy="32" r="18" />
            <Circle cx="32" cy="32" r="6" fill={stroke} />
            <Path d="M32 5V14M32 50V59M5 32H14M50 32H59" />
          </>
        );
        break;
      case 'gauge':
        drawing = (
          <>
            <Circle cx="32" cy="32" r="24" />
            <Circle cx="32" cy="32" r="7" />
            <Path d="M9 27 26 31M38 31 55 27M32 39V55" />
          </>
        );
        break;
      case 'phone':
        drawing = (
          <>
            <Rect x="17" y="6" width="30" height="52" rx="7" />
            <Path d="M27 12H37M29 51H35" />
          </>
        );
        break;
      case 'game':
        drawing = (
          <>
            <Path d="M19 19H45Q52 19 54 29L59 48Q59 60 47 48L40 40H24L17 48Q5 60 5 48L10 29Q12 19 19 19Z" />
            <Path d="M19 26V38M13 32H25M44 27V27.2M50 33V33.2" />
          </>
        );
        break;
      case 'siren':
        drawing = (
          <>
            <Path d="M16 48V33C16 11 48 11 48 33V48M10 48H54V56H10ZM32 4V10M7 13 12 18M52 18 57 13" />
            <Path d="M25 34V29" />
          </>
        );
        break;
      case 'ambulance':
        drawing = (
          <>
            <Path d="M5 19H38V47H5ZM38 28H50L59 39V47H38" />
            <Circle cx="17" cy="49" r="6" fill="#FFFFFF" />
            <Circle cx="48" cy="49" r="6" fill="#FFFFFF" />
            <Path d="M16 32H28M22 26V38M19 12H28" />
          </>
        );
        break;
    }
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.72} />
          <Stop offset="0.45" stopColor={color} />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>
      </Defs>
      <G stroke={stroke} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round">
        {drawing}
      </G>
    </Svg>
  );
});
