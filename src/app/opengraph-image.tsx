import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'MboaGo — Voyagez. Séjournez. Profitez. Bientôt sur iOS et Android.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function SocialImage() {
  const font = await readFile(join(process.cwd(), 'src/fonts/Inter_700Bold.ttf'));
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f8f8fa',
        color: '#202b33',
        display: 'flex',
        flexDirection: 'column',
        padding: '58px 72px',
        fontFamily: 'Inter',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', fontSize: 38, letterSpacing: -2 }}>
        MboaGo<span style={{ color: '#c99100' }}>.</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 78,
          lineHeight: 1.1,
          letterSpacing: -4,
          marginTop: 58,
        }}
      >
        <span>Voyagez. Séjournez.</span>
        <span style={{ display: 'flex', marginTop: 10 }}>
          <span style={{ background: '#ffc928', padding: '0 14px' }}>Profitez.</span>
        </span>
      </div>
      <div style={{ display: 'flex', marginTop: 48, fontSize: 22, color: '#68757d' }}>
        Bus · Hôtels · Activités — Tout votre Cameroun, dans une seule app.
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 72,
          top: 68,
          fontSize: 17,
          padding: '12px 20px',
          background: '#202b33',
          color: 'white',
          borderRadius: 30,
        }}
      >
        Le Cameroun, à portée de main.
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Inter', data: font, weight: 700, style: 'normal' }] },
  );
}
