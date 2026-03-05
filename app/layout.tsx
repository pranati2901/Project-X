import './globals.css';
import AITutor from '@/components/AITutor';
import AuthGuard from '@/components/AuthGuard';

export const metadata = {
  title: 'NTUlearn - AI-Powered Adaptive Learning',
  description: 'Personalized learning platform powered by AI for NTU students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
        <AITutor />
      </body>
    </html>
  );
}
