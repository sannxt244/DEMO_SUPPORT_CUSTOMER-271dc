'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function RootLayout() {
    useEffect(() => {}, []);
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
    function createNewUser() {
        const id = crypto.randomUUID();
        localStorage.setItem('amis-support-identity-id', id);
        return id;
    }

    function initNewSupport() {
        createNewUser();
        initSupport();
    }
    function initSupport() {
        let identityId = localStorage.getItem('amis-support-identity-id') || '';
        if (!identityId) {
            identityId = createNewUser();
        }
        _loadSource('script', {
            src: `https://testcdnamisapp.misacdn.net/support/core/1.0.0-testonline/core.js`,
            type: 'text/javascript',
            onload: () => {
                (window as any).initAmisSupport({
                    clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
                    identityId: identityId
                });
            }
        });
    }

    return (
        <div className="flex flex-col min-h-screen p-6">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Khởi tạo chat</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Khởi tạo người dùng help mới</AlertDialogTitle>
                        <AlertDialogDescription>
                            Nếu muốn tiếp dùng người dùng cũ hãy nhấn bỏ qua
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={initNewSupport}>Bỏ qua</AlertDialogCancel>
                        <AlertDialogAction onClick={initSupport}>Tiếp tục</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
