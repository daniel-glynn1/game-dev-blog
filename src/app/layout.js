import '../styles/globals.css';
import Header from '../components/header';

export const metadata = {
  title: "DG Game Dev",
  description: "Daniel Glynn's game development blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Header />
      <main className='container'>{children}</main>
    </body>
  </html>
  );
}




