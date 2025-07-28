"use client";

import '../styles/globals.css';

export default function RootLayout({ children }) {
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

    function getSessionUUID() {
        // Định nghĩa key để lưu trong sessionStorage
        const uuidKey = 'session_uuid';
        // Thử lấy UUID từ sessionStorage
        let sessionUUID = sessionStorage.getItem(uuidKey);
        // Nếu chưa có UUID trong session này
        if (!sessionUUID) {
            // Tạo một UUID mới bằng API của trình duyệt
            sessionUUID = crypto.randomUUID();

            // Lưu UUID mới vào sessionStorage
            sessionStorage.setItem(uuidKey, sessionUUID);
        }
        // Trả về UUID
        return sessionUUID;
    }

    _loadSource('script', {
        src: `https://testcdnamisapp.misacdn.net/support/libs/chat-customer-0.0.0/core.js`,
        type: 'text/javascript',
        onload: async () => {
            window.initAmisSupport({
                clientId: '1',
                identityId: getSessionUUID(),
                environment: 'TestOnline'
            });
        }
    });

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-white bg-blue-900">
                <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        <main className="grow">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
