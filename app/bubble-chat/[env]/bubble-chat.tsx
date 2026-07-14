'use client';

import Script from 'next/script';

interface Props {
    env: string;
    sid: string;
    script: string;
}

declare global {
    interface Window {
        AmisChat: {
            init: (options: {}) => void;
            show: () => void;
            setAuth: (options: { sessionId: string }) => void;
            attachContextMessage: (options: {
                userId: string;
                items: Array<{
                    itemType: string;
                    objectType: string;
                    appLogo: string;
                    title: string;
                    subtitle: string;
                    actionUrl: string;
                    metadata: {
                        objectId: string;
                    };
                }>;
            }) => Promise<void>;
        };
    }
}

export default function BubbleChat({ sid, script }: Props) {
    return (
        <>
            <Script
                src={script}
                strategy="afterInteractive"
                onLoad={() => {
                    window.AmisChat.setAuth({
                        sessionId: sid
                    });

                    window.AmisChat.init({});
                }}
            />

            <button
                onClick={() => window.AmisChat?.show()}
                className="
          fixed bottom-6 right-6
          flex h-14 w-14
          items-center justify-center
          rounded-full
          bg-blue-600
          text-white
          shadow-lg
          transition
          hover:scale-105
        "
            >
                💬
            </button>
        </>
    );
}
