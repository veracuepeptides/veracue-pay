import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Sora, Tenor_Sans } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
});

const tenor = Tenor_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-tenor',
});

export const viewport: Viewport = {
  themeColor: '#f0efeb',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const description =
  'VeracuePay is a secure hosted payment page for independent businesses. Every checkout names who you are paying before you pay.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'VeracuePay — Secure payment pages for independent businesses',
    template: '%s | VeracuePay',
  },
  description,
  applicationName: 'VeracuePay',
  // The whole site is kept out of search results.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'VeracuePay',
    title: 'VeracuePay — Secure payment pages for independent businesses',
    description,
    url: SITE.url,
  },
  twitter: {
    card: 'summary',
    title: 'VeracuePay — Secure payment pages for independent businesses',
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.legalName,
        url: SITE.url,
        email: SITE.supportEmail,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description,
        publisher: { '@id': `${SITE.url}/#organization` },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable} ${tenor.variable}`}>
      <body className="min-h-screen font-sans text-obsidian">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-obsidian focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-linen"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
