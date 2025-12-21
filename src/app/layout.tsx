import { Providers } from './providers';
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quiz App Redux',
  description: 'Quiz application refactored to use Next.js App Router',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
