// app/layout.tsx
import React from 'react';
import Layout from './components/Layout';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;