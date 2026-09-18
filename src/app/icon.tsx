import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#ffc928',
        color: '#202b33',
        borderRadius: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 46,
        fontWeight: 800,
        letterSpacing: -5,
        paddingRight: 4,
      }}
    >
      m.
    </div>,
    size,
  );
}
