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
            src: `https://amismisa.misacdn.net/support/core/1.0.0-release/core.js`,
            type: 'text/javascript',
            onload: () => {
                const AmisSupport = (window as any).AmisSupport;
                initAmisSupport({
                    clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
                    company: '1',
                    email: '1',
                    fullname: '1',
                    identityId: '1',
                    mobile: '1',
                    source: '1',
                    taxcode: '1'
                });

                AmisSupport.on('update_unread', (data) => {
                    debugger
                });
            }
        });
    }, []);
    const [unread, setUnread] = useState(0);
    const showChat = () => {
        const amisSupport = (window as any).AmisSupport;
        amisSupport.ChatWindow?.show();
    };

    return (
        <div className="flex flex-col min-h-screen p-6">
            {/* <LiveChatWidget license="19273572" /> */}
            <div className="relative w-fit h-fit" onClick={showChat}>
                <svg
                    data-v-fd5c7e17=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 48 48"
                >
                    <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_3957_4502)"></circle>
                    <path
                        fill="#fff"
                        d="M24.4 11c5.875 0 10.854 3.84 12.565 9.145A5.4 5.4 0 0 1 38.8 24.2a5.4 5.4 0 0 1-1.836 4.054C35.253 33.56 30.275 37.4 24.399 37.4s-10.853-3.84-12.564-9.146A5.4 5.4 0 0 1 10 24.2a5.4 5.4 0 0 1 1.834-4.055C13.544 14.84 18.524 11 24.399 11m0 4.8a8.401 8.401 0 0 0-.432 16.789l.432.01h8.4l-2.502-2.42A8.4 8.4 0 0 0 24.4 15.8"
                    ></path>
                    <circle cx="21.4" cy="24.2" r="1.8" fill="#fff"></circle>
                    <circle cx="27.4" cy="24.2" r="1.8" fill="#fff"></circle>
                    <defs>
                        <linearGradient
                            id="paint0_linear_3957_4502"
                            x1="24"
                            x2="24"
                            y1="0"
                            y2="48"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#0DD57D"></stop>
                            <stop offset="1" stopColor="#0FA976"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div className="rounded-full px-1 bg-red-500 absolute -top-1 -right-1 text-[12px] leading-[20px] flex items-center justify-center min-w-5 text-white">
                    {unread}
                </div>
            </div>
        </div>
    );
}
