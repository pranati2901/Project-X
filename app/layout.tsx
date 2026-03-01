import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NTUlearn — AI-Powered Adaptive Learning',
  description: 'An AI-powered adaptive learning platform that understands who you are and evolves with you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
