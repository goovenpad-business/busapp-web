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
  Stop = 'stop',
  Ellipse = 'ellipse';

// Small, transparent illustrations. No bitmap loading, opaque tile or SVG filter.
export type PremiumGlyphName =
  | 'home'
  | 'compass'
  | 'ticket'
  | 'profile'
  | 'luggage'
  | 'hotel'
  | 'activity'
  | 'bus'
  | 'car'
  | 'taxi'
  | 'parcel'
  | 'agency'
  | 'search'
  | 'nightlife'
  | 'sport'
  | 'bowling'
  | 'cinema'
  | 'traffic'
  | 'membership'
  | 'heart'
  | 'location'
  | 'bell'
  | 'identity'
  | 'payment'
  | 'preferences'
  | 'language'
  | 'receipt'
  | 'help'
  | 'document'
  | 'grid'
  | 'video'
  | 'groups'
  | 'calendar'
  | 'camera'
  | 'gift'
  | 'shield'
  | 'wallet'
  | 'food'
  | 'seat'
  | 'star'
  | 'crown'
  | 'drink'
  | 'wifi'
  | 'plug'
  | 'air'
  | 'monitor'
  | 'headphones'
  | 'briefcase';

export const glyphAccents = {
  blue: { light: '#69C2FF', main: '#1677FF', dark: '#144ABB', soft: '#EDF4FE' },
  sage: { light: '#87E4B7', main: '#20AB76', dark: '#126746', soft: '#EEF7F1' },
  amber: { light: '#FFDF7A', main: '#FFB522', dark: '#B56D10', soft: '#FFF6E5' },
  coral: { light: '#FF9C91', main: '#FF5B62', dark: '#BF304B', soft: '#FFF0EC' },
  violet: { light: '#BCA8FF', main: '#8B5CF6', dark: '#5830B6', soft: '#F3EFFB' },
} as const;
type Accent = keyof typeof glyphAccents;

export const glyphTones: Record<PremiumGlyphName, Accent> = {
  home: 'blue',
  compass: 'sage',
  ticket: 'blue',
  profile: 'violet',
  luggage: 'blue',
  hotel: 'amber',
  activity: 'sage',
  bus: 'blue',
  car: 'sage',
  taxi: 'amber',
  parcel: 'amber',
  agency: 'sage',
  search: 'blue',
  nightlife: 'violet',
  sport: 'sage',
  bowling: 'coral',
  cinema: 'violet',
  traffic: 'amber',
  membership: 'amber',
  heart: 'coral',
  location: 'coral',
  bell: 'amber',
  identity: 'violet',
  payment: 'sage',
  preferences: 'violet',
  language: 'blue',
  receipt: 'amber',
  help: 'sage',
  document: 'blue',
  grid: 'coral',
  video: 'violet',
  groups: 'sage',
  calendar: 'coral',
  camera: 'violet',
  gift: 'coral',
  shield: 'sage',
  wallet: 'sage',
  food: 'amber',
  seat: 'sage',
  star: 'amber',
  crown: 'amber',
  drink: 'coral',
  wifi: 'sage',
  plug: 'amber',
  air: 'sage',
  monitor: 'violet',
  headphones: 'sage',
  briefcase: 'amber',
};

export const PremiumGlyph = memo(function PremiumGlyph({
  name,
  size = 24,
  tint,
  outline = false,
  ...props
}: SvgProps & {
  name: PremiumGlyphName;
  size?: number;
  tint?: SvgProps['color'];
  outline?: boolean;
}) {
  const id = `glyph-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const palette = glyphAccents[glyphTones[name]];
  const main = tint ?? `url(#${id}-main)`;
  const pearl = `url(#${id}-pearl)`;
  const blue = tint ?? `url(#${id}-blue)`;
  const gold = tint ?? `url(#${id}-gold)`;
  const green = tint ?? `url(#${id}-green)`;
  const coral = tint ?? `url(#${id}-coral)`;
  const ink = '#30445C';
  const star = 'M32 12 37 23 49 24 40 33 42 46 32 40 21 46 23 33 14 24 27 23Z';
  const person = (x: number, y: number, fill: SvgProps['fill'], scale = 1) => (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Circle cx="0" cy="0" r="7" fill={fill} />
      <Path d="M-12 24V20C-12 5 12 5 12 20V24Q0 28-12 24" fill={fill} />
    </G>
  );
  let drawing;
  switch (name) {
    case 'crown':
      drawing = (
        <>
          <Path d="M8 18 20 28 32 8 44 28 56 18 50 49H14Z" fill={main} />
          <Rect x="14" y="47" width="36" height="9" rx="4" fill={main} />
          <Path d="M18 43H46" stroke="#FFF6DA" strokeWidth="2.5" strokeLinecap="round" />
          <Circle cx="32" cy="31" r="4" fill={coral} />
        </>
      );
      break;
    case 'drink':
      drawing = (
        <>
          <Path d="M13 10H51V18L35 35V50H43V55H21V50H29V35L13 18Z" fill={pearl} />
          <Path d="M16 18H48L32 34Z" fill={main} />
          <Path d="M35 24 44 7" stroke={green} strokeWidth="3" strokeLinecap="round" />
          <Circle cx="47" cy="10" r="6" fill={gold} />
        </>
      );
      break;
    case 'wifi':
      drawing = (
        <>
          <Path
            d="M8 22Q32 3 56 22M17 34Q32 21 47 34M26 45Q32 40 38 45"
            stroke={main}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx="32" cy="55" r="4" fill={main} />
        </>
      );
      break;
    case 'plug':
      drawing = (
        <>
          <Path d="M23 7V22M41 7V22" stroke="#AFBEC8" strokeWidth="6" strokeLinecap="round" />
          <Path d="M15 20H49V29Q49 44 35 45V55H29V45Q15 44 15 29Z" fill={main} />
          <Path d="M34 23 25 34H32L30 40 40 29H33Z" fill={pearl} />
        </>
      );
      break;
    case 'air':
      drawing = (
        <>
          <Rect x="5" y="12" width="54" height="27" rx="7" fill={pearl} />
          <Rect x="12" y="29" width="40" height="5" rx="2.5" fill={main} />
          <Circle cx="49" cy="21" r="2" fill={green} />
          <Path
            d="M19 44Q15 49 19 55M32 44Q28 50 32 57M45 44Q41 49 45 55"
            stroke={main}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
      break;
    case 'monitor':
      drawing = (
        <>
          <Rect x="5" y="9" width="54" height="37" rx="7" fill={main} />
          <Rect x="10" y="14" width="44" height="26" rx="3" fill={ink} />
          <Path d="M12 17H39L12 35Z" fill="#DDE9FF" opacity=".17" />
          <Path d="M27 24 38 30 27 36Z" fill={pearl} />
          <Path d="M28 46H36V53H45V58H19V53H28Z" fill={main} />
        </>
      );
      break;
    case 'headphones':
      drawing = (
        <>
          <Path
            d="M12 35V27C12 1 52 1 52 27V35"
            stroke={main}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <Rect x="7" y="29" width="13" height="23" rx="6" fill={main} />
          <Rect x="44" y="29" width="13" height="23" rx="6" fill={main} />
          <Path
            d="M50 50Q50 59 34 57"
            stroke={main}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Rect x="27" y="53" width="11" height="7" rx="3.5" fill={pearl} />
        </>
      );
      break;
    case 'briefcase':
      drawing = (
        <>
          <Rect
            x="23"
            y="6"
            width="18"
            height="15"
            rx="4"
            stroke={ink}
            strokeWidth="4"
            fill="none"
          />
          <Rect x="6" y="17" width="52" height="38" rx="8" fill={main} />
          <Path
            d="M7 28Q32 39 57 28"
            stroke="#FFEDCC"
            strokeOpacity=".7"
            strokeWidth="2"
            fill="none"
          />
          <Rect x="28" y="30" width="8" height="11" rx="2" fill={pearl} />
        </>
      );
      break;
    case 'home':
      drawing = (
        <>
          <Path d="M14 28 33 11 52 28V49Q52 55 46 55H20Q14 55 14 49Z" fill={pearl} />
          <Path
            d="M9 29 31 9Q33 7 35 9L56 29"
            fill="none"
            stroke={main}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect x="28" y="36" width="12" height="19" rx="3" fill={main} />
          <Rect x="43" y="13" width="7" height="12" rx="2" fill={main} />
        </>
      );
      break;
    case 'compass':
      drawing = (
        <>
          <Circle cx="32" cy="31" r="25" fill={main} />
          <Circle cx="32" cy="30" r="20" fill={pearl} />
          <Path d="M43 18 35 34 29 28Z" fill={coral} />
          <Path d="M21 43 29 28 35 34Z" fill={blue} />
          <Path
            d="M32 14V17M48 30H45M32 46V43M16 30H19"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case 'profile':
    case 'groups':
      drawing = (
        <>
          {name === 'groups' ? (
            <>
              {person(13, 25, green, 0.75)}
              {person(51, 25, gold, 0.75)}
            </>
          ) : null}
          {person(32, 18, main, 1.3)}
        </>
      );
      break;
    case 'luggage':
      drawing = (
        <>
          <Rect
            x="24"
            y="6"
            width="16"
            height="14"
            rx="4"
            fill="none"
            stroke={ink}
            strokeWidth="4"
          />
          <Rect x="12" y="17" width="40" height="37" rx="10" fill={main} />
          <Path
            d="M23 26V45M32 26V45M41 26V45"
            stroke="#FFFFFF"
            strokeOpacity=".45"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Circle cx="20" cy="56" r="3" fill={ink} />
          <Circle cx="44" cy="56" r="3" fill={ink} />
        </>
      );
      break;
    case 'bus':
    case 'car':
    case 'taxi':
      drawing = (
        <>
          <Ellipse cx="32" cy="55" rx="23" ry="3" fill={ink} opacity=".08" />
          <Rect x="10" y="38" width="8" height="18" rx="4" fill={ink} />
          <Rect x="46" y="38" width="8" height="18" rx="4" fill={ink} />
          <Path
            d={
              name === 'bus'
                ? 'M10 46V17Q10 9 18 9H46Q54 9 54 17V46Q54 51 48 51H16Q10 51 10 46Z'
                : 'M7 42 11 30 17 17Q19 13 25 13H41Q47 13 49 19L54 31 57 42V49H7Z'
            }
            fill={main}
          />
          <Path d="M17 19Q17 17 20 17H44Q47 17 47 20V32H17Z" fill={ink} />
          <Path d="M20 20H31V29H18Z" fill="#9DD4EE" opacity=".65" />
          <Rect x="14" y="40" width="10" height="5" rx="2.5" fill={pearl} />
          <Rect x="40" y="40" width="10" height="5" rx="2.5" fill={pearl} />
          {name === 'taxi' && <Rect x="26" y="7" width="14" height="7" rx="2" fill={gold} />}
        </>
      );
      break;
    case 'hotel':
    case 'agency':
      drawing = (
        <>
          <Rect x="13" y="15" width="38" height="42" rx="4" fill={pearl} />
          <Rect x="9" y="13" width="46" height="7" rx="3" fill={main} />
          <Rect x="25" y="43" width="14" height="14" rx="2" fill={gold} />
          <Path d="M22 43Q22 34 32 34T42 43Z" fill={main} />
          {[20, 31, 42].map((x) => (
            <Rect key={x} x={x} y="24" width="5" height="9" rx="1.5" fill={blue} />
          ))}
          <Ellipse cx="8" cy="47" rx="5" ry="8" fill={green} />
          <Ellipse cx="56" cy="47" rx="5" ry="8" fill={green} />
          {name === 'agency' && (
            <>
              <Circle cx="33" cy="12" r="9" fill={pearl} />
              <Path
                d="M33 6V12L37 14"
                stroke={ink}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}
        </>
      );
      break;
    case 'activity':
      drawing = (
        <>
          <Circle cx="47" cy="14" r="10" fill={gold} />
          <Path d="M3 54 22 14Q25 8 28 14L48 54Z" fill={main} />
          <Path d="M17 25 24 12 31 25 26 23 23 27Z" fill={pearl} />
          <Path d="M25 55 43 29 60 55Z" fill={green} />
          <Path d="M44 26V59" stroke="#99714A" strokeWidth="4" strokeLinecap="round" />
          <Path d="M36 31H53L58 36 53 41H36Z" fill={gold} />
        </>
      );
      break;
    case 'parcel':
      drawing = (
        <>
          <Path d="M8 19 32 9 57 19V47L32 58 8 47Z" fill={main} />
          <Path d="M8 19 32 29 57 19 32 9Z" fill="#FFE1AD" />
          <Path d="M32 29V58L8 47V19Z" fill="#CA9056" opacity=".45" />
          <Path d="M20 14 44 24V36L38 39V26L14 17Z" fill={blue} />
          <Path
            d="M39 45 51 40M39 49 47 46"
            stroke="#FFF7E7"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case 'search':
      drawing = (
        <>
          <Path d="M39 40 53 54" stroke={main} strokeWidth="12" strokeLinecap="round" />
          <Circle cx="27" cy="27" r="21" fill={main} />
          <Circle cx="27" cy="26" r="15" fill={pearl} />
          <Path
            d="M20 17Q27 12 33 20"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case 'nightlife':
      drawing = (
        <>
          <Path d="M36 7C9 10 1 42 23 53 37 60 49 48 50 39 29 46 20 23 36 7Z" fill={main} />
          <G transform="translate(27 4) scale(.53)">
            <Path d={star} fill={gold} />
          </G>
          <Path d="M52 9V16M49 12H55" stroke="#C9BFFF" strokeWidth="2" strokeLinecap="round" />
        </>
      );
      break;
    case 'sport':
      drawing = (
        <>
          <Circle cx="32" cy="32" r="25" fill={pearl} />
          <Path d="M32 20 43 28 39 40H25L21 28Z" fill={ink} />
          <Path
            d="M20 11 24 17 14 26 7 24M44 11 40 17 50 26 57 24M10 44 19 42 24 53 19 54M54 44 45 42 40 53 45 54"
            fill={main}
          />
          <Path
            d="M24 17 32 20 40 17M14 26 21 28M50 26 43 28M25 40 19 42M39 40 45 42"
            fill="none"
            stroke="#A6B8C8"
            strokeWidth="1.5"
          />
        </>
      );
      break;
    case 'bowling':
      drawing = (
        <>
          <Path
            d="M37 9C29 9 30 21 34 28 24 45 29 56 37 56 46 56 49 45 40 28 44 20 45 9 37 9Z"
            fill={pearl}
          />
          <Path d="M33 24H41M33 28H41" stroke={coral} strokeWidth="3" />
          <G transform="translate(15 0) rotate(12 37 33)">
            <Path
              d="M37 9C29 9 30 21 34 28 24 45 29 56 37 56 46 56 49 45 40 28 44 20 45 9 37 9Z"
              fill={pearl}
            />
            <Path d="M33 24H41" stroke={coral} strokeWidth="3" />
          </G>
          <Circle cx="22" cy="41" r="17" fill={main} />
          <Circle cx="21" cy="32" r="3" fill={ink} />
          <Circle cx="29" cy="36" r="3" fill={ink} />
          <Circle cx="19" cy="40" r="3" fill={ink} />
        </>
      );
      break;
    case 'cinema':
    case 'video':
    case 'camera':
      drawing = (
        <>
          <Rect x="6" y="22" width="43" height="32" rx="7" fill={main} />
          {name === 'cinema' ? (
            <G transform="rotate(-12 7 21)">
              <Rect x="7" y="10" width="45" height="11" rx="3" fill={main} />
              <Path d="M15 10 22 21M31 10 38 21M46 10 52 20" stroke="white" strokeWidth="5" />
            </G>
          ) : name === 'camera' ? (
            <Rect x="17" y="14" width="20" height="10" rx="3" fill={main} />
          ) : (
            <Path d="M50 31 59 25V51L50 46Z" fill={main} />
          )}
          {name === 'camera' ? (
            <>
              <Circle cx="28" cy="37" r="11" fill={pearl} />
              <Circle cx="28" cy="37" r="7" fill={ink} />
            </>
          ) : (
            <Path d="M24 29 38 38 24 47Z" fill={pearl} />
          )}
          <Circle cx="13" cy="28" r="2.5" fill={coral} />
        </>
      );
      break;
    case 'traffic':
      drawing = (
        <>
          <Rect x="6" y="48" width="52" height="11" rx="5" fill={ink} />
          <Path d="M14 48 26 8H38L50 48Z" fill={main} />
          <Path d="M22 21H42L44 29H20ZM17 39H47L49 46H15Z" fill={pearl} />
        </>
      );
      break;
    case 'ticket':
    case 'membership':
      drawing = (
        <>
          <Path d="M8 13H56V26C46 26 46 38 56 38V51H8V38C18 38 18 26 8 26Z" fill={main} />
          <Path
            d="M43 16V23M43 29V35M43 41V48"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <G transform="translate(1 5) scale(.74)">
            <Path d={star} fill={gold} />
          </G>
        </>
      );
      break;
    case 'heart':
      drawing = (
        <>
          <Path
            d="M32 55C23 48 5 35 5 22 5 7 24 3 32 17 40 3 59 7 59 22 59 35 41 48 32 55Z"
            fill={outline ? 'none' : main}
            stroke={outline ? main : undefined}
            strokeWidth={outline ? 4 : 0}
          />
          {!outline && !tint && (
            <Path
              d="M13 23Q12 14 21 14"
              stroke="white"
              strokeOpacity=".55"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </>
      );
      break;
    case 'star':
      drawing = <Path d={star} fill={main} stroke={main} strokeWidth="3" strokeLinejoin="round" />;
      break;
    case 'location':
      drawing = (
        <>
          <Path d="M5 39 22 34 42 39 58 34V56L42 61 22 56 5 61Z" fill={green} />
          <Path d="M22 35V55M42 40V59M8 50 55 47" stroke="white" strokeWidth="3" />
          <Path d="M32 47C27 40 15 28 15 19A17 17 0 0 1 49 19C49 28 37 40 32 47Z" fill={main} />
          <Circle cx="32" cy="19" r="6" fill={pearl} />
        </>
      );
      break;
    case 'bell':
      drawing = (
        <>
          <Circle cx="32" cy="51" r="7" fill={main} />
          <Path d="M9 46 15 37V26C15 7 49 7 49 26V37L55 46Q32 55 9 46Z" fill={main} />
          <Path
            d="M21 27Q20 18 28 17"
            stroke="#FFF0BF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx="32" cy="9" r="4" fill={gold} />
        </>
      );
      break;
    case 'grid':
      drawing = (
        <>
          <Rect x="6" y="6" width="23" height="23" rx="6" fill={blue} />
          <Rect x="35" y="6" width="23" height="23" rx="6" fill={coral} />
          <Rect x="6" y="35" width="23" height="23" rx="6" fill={green} />
          <Rect x="35" y="35" width="23" height="23" rx="6" fill={gold} />
        </>
      );
      break;
    case 'preferences':
      drawing = (
        <>
          <Path
            d="M9 16H55M9 32H55M9 48H55"
            stroke="#CCD6E2"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <Circle cx="24" cy="16" r="8" fill={blue} />
          <Circle cx="43" cy="32" r="8" fill={coral} />
          <Circle cx="21" cy="48" r="8" fill={green} />
        </>
      );
      break;
    case 'identity':
      drawing = (
        <>
          <Rect x="5" y="13" width="54" height="40" rx="8" fill={pearl} />
          <G transform="translate(0 7)">{person(21, 18, main, 0.75)}</G>
          <Path
            d="M37 25H51M37 34H51M37 43H46"
            stroke="#8A9CAF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case 'payment':
    case 'wallet':
      drawing = (
        <>
          <Rect x="5" y="13" width="54" height="40" rx="8" fill={main} />
          <Path d="M6 23H58" stroke={ink} strokeWidth="8" opacity=".6" />
          <Rect x="13" y="34" width="12" height="9" rx="2" fill={gold} />
          <Path d="M42 44H50" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </>
      );
      break;
    case 'calendar':
      drawing = (
        <>
          <Rect x="8" y="12" width="48" height="45" rx="8" fill={pearl} />
          <Path d="M8 25V20Q8 12 16 12H48Q56 12 56 20V25Z" fill={main} />
          <Path d="M21 7V17M43 7V17" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          {[18, 29, 40].map((x) => (
            <G key={x}>
              <Rect x={x} y="32" width="6" height="6" rx="2" fill={main} />
              <Rect x={x} y="43" width="6" height="6" rx="2" fill="#AFBDCA" />
            </G>
          ))}
        </>
      );
      break;
    case 'language':
      drawing = (
        <>
          <Circle cx="28" cy="28" r="23" fill={main} />
          <Ellipse cx="28" cy="28" rx="10" ry="23" fill="none" stroke="#E6F5FF" strokeWidth="2" />
          <Path d="M7 20H49M7 36H49" stroke="#E6F5FF" strokeWidth="2" />
          <Rect x="32" y="30" width="27" height="29" rx="7" fill={pearl} />
          <Path
            d="M38 51 45 37 52 51M41 47H49"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      );
      break;
    case 'help':
      drawing = (
        <>
          <Path d="M32 6C0 6 0 48 20 52L17 61 32 55C67 55 67 6 32 6Z" fill={main} />
          <Path
            d="M24 24C24 13 43 15 40 26L32 33V37"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <Circle cx="32" cy="46" r="2.5" fill="white" />
        </>
      );
      break;
    case 'shield':
      drawing = (
        <>
          <Path d="M32 5 54 14V32Q52 49 32 59 12 49 10 32V14Z" fill={main} />
          <Path
            d="M21 31 29 39 44 23"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
      break;
    case 'gift':
      drawing = (
        <>
          <Path d="M31 20C7 19 13 1 24 9L32 20C57 19 51 1 40 9Z" fill={gold} />
          <Rect x="10" y="26" width="44" height="31" rx="4" fill={main} />
          <Rect x="6" y="20" width="52" height="12" rx="4" fill={main} />
          <Path d="M32 21V57" stroke="#FFE7A5" strokeWidth="8" />
        </>
      );
      break;
    case 'food':
      drawing = (
        <>
          <Path d="M8 29C8 3 56 3 56 29Z" fill={gold} />
          <Path
            d="M8 34 17 31 26 35 36 31 47 35 57 32"
            stroke={green}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <Rect x="6" y="38" width="52" height="8" rx="4" fill="#946145" />
          <Path d="M8 47H56Q56 58 47 58H17Q8 58 8 47Z" fill={main} />
        </>
      );
      break;
    case 'seat':
      drawing = (
        <>
          <Rect x="16" y="7" width="32" height="32" rx="9" fill={main} />
          <Path
            d="M23 15H41M24 20V29M40 20V29"
            stroke="white"
            strokeOpacity=".38"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Rect x="11" y="35" width="42" height="16" rx="6" fill={main} />
          <Path
            d="M12 28V44M52 28V44M20 51V58M44 51V58"
            stroke={ink}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case 'document':
    case 'receipt':
      drawing = (
        <>
          <Path
            d="M13 6H39L53 20V56L46 53 39 57 32 53 25 57 18 53 11 57V10Q11 6 13 6Z"
            fill={pearl}
          />
          <Path d="M39 6V20H53Z" fill={main} />
          <Path
            d="M21 27H37M21 36H43M21 45H35"
            stroke={main}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {name === 'receipt' && <Circle cx="47" cy="46" r="10" fill={gold} />}
        </>
      );
      break;
  }
  if (outline && ['home', 'compass', 'ticket', 'profile'].includes(name)) {
    const stroke = tint ?? '#202B33';
    const shape =
      name === 'home' ? (
        <Path d="M9 29 32 9 55 29M15 25V54H49V25M27 54V37H37V54" />
      ) : name === 'compass' ? (
        <>
          <Circle cx="32" cy="32" r="24" />
          <Path d="M43 21 36 36 21 43 28 28Z" />
        </>
      ) : name === 'ticket' ? (
        <>
          <Path d="M8 14H56V26C46 26 46 38 56 38V50H8V38C18 38 18 26 8 26Z" />
          <Path d="M41 19V23M41 30V34M41 41V45" />
        </>
      ) : (
        <>
          <Circle cx="32" cy="21" r="11" />
          <Path d="M12 55V50C12 31 52 31 52 50V55Z" />
        </>
      );
    return (
      <Svg {...props} width={size} height={size} viewBox="0 0 64 64" fill="none">
        <G stroke={stroke} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
          {shape}
        </G>
      </Svg>
    );
  }
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        {[
          ['main', palette.light, palette.main, palette.dark],
          ['pearl', '#FFFFFF', '#EAF0F6', '#BACBDD'],
          ['blue', '#9AD9FF', '#3188FA', '#2054CA'],
          ['gold', '#FFE6A1', '#FFCD57', '#D49A31'],
          ['green', '#B2E5BC', '#6ABD96', '#36896C'],
          ['coral', '#FFC1B5', '#F77F7F', '#D45160'],
        ].map(([key, light, mid, dark]) => (
          <LinearGradient id={`${id}-${key}`} key={key} x1="0%" y1="0%" x2="75%" y2="100%">
            <Stop offset={0} stopColor={light} />
            <Stop offset={0.48} stopColor={mid} />
            <Stop offset={1} stopColor={dark} />
          </LinearGradient>
        ))}
      </Defs>
      {drawing}
    </Svg>
  );
});
