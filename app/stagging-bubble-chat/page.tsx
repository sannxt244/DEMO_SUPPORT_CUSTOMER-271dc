'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export default function RootLayout() {
    const [sessionId, setSessionId] = useState('');

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
            src: `https://amisstagingmisa.misacdn.net/chat/bubble-chat/index.js`,
            type: 'text/javascript',
            onload: async () => {
                await (window as any).AmisChat.init({});
            }
        });
    }, []);

    const show = () => {
        debugger;
        (window as any).AmisChat.setAuth({
            sessionId: sessionId
        });
        (window as any).AmisChat.show({});
    };

    return (
        <div className="flex flex-col min-h-screen p-6 overflow-auto">
            {sessionId}
            <Input value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
            <Button onClick={show}>Init</Button>
        </div>
    );
}
