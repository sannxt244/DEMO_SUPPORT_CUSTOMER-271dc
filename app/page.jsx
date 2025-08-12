'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }) {
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
            src: `https://testcdnamisapp.misacdn.net/support/core/1.0.0/core.js`,
            type: 'text/javascript',
            onload: async () => {
                window.initAmisSupport({
                    clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
                    identityId: getSessionUUID(),
                    fullname: "demo support",
                    viewMode: "MOBILE"
                });
            }
        });
    }, []);
    return <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
        <input type="file" id="fileProfile1" name="fileProfile1"  accept="image/png,image/jpeg" capture="filesystem" />
        <input type="file" id="fileProfile2" name="fileProfile2"  capture="filesystem" />
        <input type="file" id="fileProfile2" name="fileProfile2"   />
    </div>;
}
