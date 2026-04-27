import './globals.css';
import { LanguageProvider } from '../src/context/LanguageContext';
import { SoundProvider } from '../src/context/SoundContext';
import { StudentProvider } from '../src/context/StudentContext';
import ErrorBoundary from '../src/components/ErrorBoundary';

export const metadata = {
  title: 'UAE EduLearn',
  description: 'Gamified learning path for UAE National Curriculum – Grade 4 & 8 Science and Math',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-uae-dark text-white font-sans overflow-x-hidden">
        <ErrorBoundary>
          <LanguageProvider>
            <SoundProvider>
              <StudentProvider>
                {children}
              </StudentProvider>
            </SoundProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
