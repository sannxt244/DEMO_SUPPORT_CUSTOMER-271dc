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
            src: `https://support-misa.misacdn.net/2.0.0-release/core.js`,
            type: 'text/javascript',
            onload: () => {
                (window as any).initAmisSupport({
                    clientId: '2f4195dc-83fd-11f0-912f-005056a60cf9',
                    identityId: '1',
                    source: 'AMIS_SUPPORT_TEST_WEB'
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
