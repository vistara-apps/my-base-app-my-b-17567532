import './globals.css';
import '@coinbase/onchainkit/styles.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Social Media App',
  description: 'A modern social media app built with Base Mini Kit',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
