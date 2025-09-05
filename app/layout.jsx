import '../styles/globals.css';
import Script from 'next/script';

export const metadata = {
    title: {
        template: '%s | ',
        default: 'AMIS Support'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="min-h-screen">{children}</body>
            <Script src="https://testcdnamisapp.misacdn.net/support/core/1.0.0-testonline/core.js"></Script>
        </html>
    );
}
