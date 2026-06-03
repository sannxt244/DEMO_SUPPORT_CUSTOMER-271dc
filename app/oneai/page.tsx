'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        AmisOneAISDK: any;
    }
}

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
            src: `https://testcdnamisapp.misacdn.net/oneai/sdk/amis-oneai-sdk-1.0.1.min.js`,
            type: 'text/javascript',
            onload: () => {
                let instance = new window.AmisOneAISDK({
                    AppCode: 'AmisChat',
                    AppKey: '4eC39HqLyjWDarjtT1zdp7dc'
                });
                instance.OnReady(() => {
                  // window.test= instance
                })
            }
        });
    }, []);

    return <div className="p-4"></div>;
}
