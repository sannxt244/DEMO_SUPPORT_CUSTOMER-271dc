'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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
            src: `https://testcdnamisapp.misacdn.net/support/core/2.0.0-testonline/core.js`,
            type: 'text/javascript',
            onload: () => {
                (window as any).initAmisSupport({
                    // clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
                    clientId: '1',
                    company: '1',
                    email: '1',
                    fullname: 'Lê Hoàng Hiếu',
                    identityId: '2',
                    mobile: '1',
                    source: '1',
                    taxcode: '0108767234',
                    blacklistQueryParams: ['token']
                });

                const amisSupport = (window as any).AmisSupport;
                amisSupport.ChatWindow?.on('update_unread', (data) => {
                });
            }
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen p-6 overflow-auto">
            <h1 className="mb-4 text-2xl font-bold">Welcome to the Test Page</h1>
            <div className='h-[200vh]'></div>
        </div>
    );
}
