import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/config/site';
import './globals.css';

const inter = localFont({
  src: [
    { path: '../fonts/Inter_400Regular.ttf', weight: '400' },
    { path: '../fonts/Inter_500Medium.ttf', weight: '500' },
    { path: '../fonts/Inter_600SemiBold.ttf', weight: '600' },
    { path: '../fonts/Inter_700Bold.ttf', weight: '700' },
    { path: '../fonts/Inter_800ExtraBold.ttf', weight: '800' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url ?? 'http://localhost:3000'),
  title: site.title,
  description: site.description,
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: 'fr_CM',
    type: 'website',
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: Boolean(site.url), follow: Boolean(site.url) },
};
export const viewport: Viewport = { themeColor: '#F8F8FA' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
