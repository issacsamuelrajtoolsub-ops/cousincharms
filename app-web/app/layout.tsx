import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Cousin Charms',
  description: 'Charms for the people you call cousin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="font-sans bg-cc-bg-warm text-cc-ink-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
