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
            src: `https://testcdnamisapp.misacdn.net/chat/bubble-chat/1.0.0-testonline/index.js`,
            type: 'text/javascript',
            onload: () => {
                (window as any).AmisChat.init({
                    sessionId: localStorage.getItem('x-sessionId') || '',
                });
            }
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen p-6 overflow-auto">
            <div id='btn-amis-chat'></div>
        </div>
    );
}
