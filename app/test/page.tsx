'use client';

import { useEffect } from 'react';

export default function RootLayout() {
    useEffect(() => {
        /**
         * Load file
         * @author NTSAN 08.06.2025
         */
        function _loadSource(tag, config) {
            var el = document.createElement(tag);
            if (config) {
                for (let i in config) {
                    el[i] = config[i];
                }
            }
            document.head.appendChild(el);
        }

        _loadSource('script', {
            src: `https://testcdnamisapp.misacdn.net/support/core/1.0.0-testonline/core.js`,
            type: 'text/javascript',
            onload: async () => {
                (window as any).initAmisSupport({
                    clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
                    company: '1',
                    email: '1',
                    fullname: '1',
                    identityId: '1',
                    mobile: '1',
                    source: '1',
                    taxcode: '1'
                });
            }
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
            {/* <LiveChatWidget license="19273572" /> */}
        </div>
    );
}
