'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UserSelector, { ChatUser } from './user-selector';
import { USERS } from './USERS';

const CONTEXT_TEMPLATES = [
    {
        name: 'Quy trình',
        objectType: 'Quy trình',
        appLogo:
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMCAyNEMwIDQuOCA0LjggMCAyNCAwQzQzLjIgMCA0OCA0LjggNDggMjRDNDggNDMuMiA0My4yIDQ4IDI0IDQ4QzQuOCA0OCAwIDQzLjIgMCAyNFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNzdfMjcpIj48L3BhdGg+CiAgPHBhdGggZD0iTTI0IDEwLjIwMDFDMzEuNjIxMyAxMC4yMDAzIDM3Ljc5OTUgMTYuMzc4NyAzNy43OTk1IDI0LjAwMDFDMzcuNzk5NSAzMS42MjE0IDMxLjYyMTMgMzcuNzk5OSAyNCAzNy44QzE2LjM3ODcgMzcuOCAxMC4yIDMxLjYyMTUgMTAuMiAyNC4wMDAxQzEwLjIgMTYuMzc4NiAxNi4zNzg2IDEwLjIwMDEgMjQgMTAuMjAwMVpNMjQgMTUuMDAwMUMxOS4wMjk1IDE1LjAwMDEgMTUgMTkuMDI5NSAxNSAyNC4wMDAxQzE1LjAwMDEgMjguOTcwNSAxOS4wMjk1IDMzIDI0IDMzQzI4Ljk3MDUgMzIuOTk5OSAzMyAyOC45NzA1IDMzLjAwMDEgMjQuMDAwMUMzMy4wMDAxIDE5LjAyOTYgMjguOTcwNiAxNS4wMDAyIDI0IDE1LjAwMDFaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgogIDxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTM3LjggMjUuMzYwNkMzNy43NTkgMjcuMTgwNyAzNy4xMTkyIDI4Ljk2NTIgMzYuMyAzMC42QzM1LjQ4MDggMzIuMjM0OCAzMy43MjE3IDM0LjA1NzkgMzEuOCAzNS40TDI4LjIgMzEuOThDMjkuMzI5NCAzMS4zMTEzIDMyLjE1MyAyOS43MzMzIDMyLjY4IDI1LjJMMzcuOCAyNS4zNjA2WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzE3N18yNykiIGZpbGwtb3BhY2l0eT0iMC4yNCI+PC9wYXRoPgogIDxwYXRoIGQ9Ik0zMy42IDM2Ljg5MjlDMzMuNiAzNy4wMTIxIDMzLjU3NzkgMzcuMTMwMiAzMy41MzQ4IDM3LjI0MDNDMzMuNDkxOCAzNy4zNTA0IDMzLjQyODcgMzcuNDUwNSAzMy4zNDkyIDM3LjUzNDdDMzMuMjY5NyAzNy42MTkgMzMuMTc1MyAzNy42ODU4IDMzLjA3MTQgMzcuNzMxM0MzMi45Njc2IDM3Ljc3NjggMzIuODU2MyAzNy44MDAxIDMyLjc0MzkgMzcuOEgyNEMyNCAzNy44IDI0IDM0LjE1MjUgMjQgMzNDMjUgMzMgMjYuNCAzMyAyNy42MTIzIDMyLjI4TDI4LjE1MjIgMzEuOTkyN0MyOC4zMTExIDMxLjkwMzUgMjguNTE4NSAzMS43OTc2IDI4Ljc1IDMxLjgwMDJDMjguOTI5MyAzMS44MTM4IDI5LjE4MjggMzEuODgwNSAyOS4zMjgxIDMxLjk5MjdMMjkuNTM2NyAzMi4yMTRMMzMuMzgzOCAzNi4yOTU0QzMzLjUyMjMgMzYuNDU5OCAzMy41OTkyIDM2LjY3MjQgMzMuNiAzNi44OTI5WiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xNzdfMjciIHgxPSIyNCIgeTE9IjAiIHgyPSIyNCIgeTI9IjQ4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzREM5RjkiPjwvc3RvcD4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDJBM0VDIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzE3N18yNyIgeDE9IjMxLjc2ODkiIHkxPSIzNC4wNTc5IiB4Mj0iMzUuNDQxOSIgeTI9IjI4LjU3NTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzJFM0U1MSI+PC9zdG9wPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuMDkiIHN0b3AtY29sb3I9IiMyRTNFNTEiIHN0b3Atb3BhY2l0eT0iMC44MzkiPjwvc3RvcD4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjc2IiBzdG9wLWNvbG9yPSIjMkUzRTUxIiBzdG9wLW9wYWNpdHk9IjAuMDcxIj48L3N0b3A+CiAgICAgIDxzdG9wIG9mZnNldD0iMC44OCIgc3RvcC1jb2xvcj0iIzJFM0U1MSIgc3RvcC1vcGFjaXR5PSIwLjAyIj48L3N0b3A+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJFM0U1MSIgc3RvcC1vcGFjaXR5PSIwIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg==',
        actionUrl: 'https://testamisapp.misa.vn/process/'
    }
];

declare global {
    interface Window {
        AmisChat: {
            attachContextMessage: (data: {
                userId: string;
                items: Array<{
                    itemType: string;
                    objectType: string;
                    appLogo: string;
                    title: string;
                    subtitle: string;
                    actionUrl: string;
                }>;
            }) => Promise<void>;

            show: (data: { userId: string }) => Promise<void>;
        };
    }
}

export default function ContextMessageForm() {
    const [userId, setUserId] = useState('amis-id-001');

    const [form, setForm] = useState({
        objectType: '',
        appLogo: '',
        title: '371424',
        subtitle: 'Yêu cầu mang và tái sử dụng tài sản cá nhân trong công ty',
        actionUrl: ''
    });

    const selectTemplate = (template: (typeof CONTEXT_TEMPLATES)[number]) => {
        setForm((prev) => ({
            ...prev,
            objectType: template.objectType,
            appLogo: template.appLogo,
            actionUrl: template.actionUrl
        }));
    };

    const updateField = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleAttach = async () => {
        if (!form.objectType) {
            alert('Vui lòng chọn context');
            return;
        }

        const res = await window.AmisChat.attachContextMessage({
            userId,

            items: [
                {
                    itemType: 'integration-context',

                    objectType: form.objectType,

                    appLogo: form.appLogo,

                    title: form.title,

                    subtitle: form.subtitle,

                    actionUrl: form.actionUrl,

                    metadata: null
                }
            ]
        });
        await window.AmisChat.show({
            userId
        });
    };

    const handleShow = async () => {
        await window.AmisChat.show({
            userId
        });
    };

    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

    const handleUserChange = (user: ChatUser) => {
        setSelectedUser(user);
        setUserId(user.AmisID);
    };

    return (
        <div className="mt-8 space-y-6 rounded-xl p-6">
            <h2 className="text-xl font-semibold">Test Context Message</h2>
            <UserSelector users={USERS} value={selectedUser?.AmisID} onChange={handleUserChange} />

            <div className="space-y-2">
                <label className="text-sm font-medium">Chọn context</label>

                <div className="flex gap-3 overflow-x-auto pb-2">
                    {CONTEXT_TEMPLATES.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                                setForm((prev) => ({
                                    ...prev,
                                    objectType: item.objectType,
                                    appLogo: item.appLogo,
                                    actionUrl: item.actionUrl
                                }));
                            }}
                            className={`
                              flex
                              w-[180px]
                              shrink-0
                              flex-col
                              items-center
                              gap-2
                              rounded-xl
                              border
                              p-4
                              text-center
                              transition
                              hover:bg-muted

                              ${form.objectType === item.objectType ? 'border-blue-500 bg-blue-50' : ''}
                            `}
                        >
                            <img
                                src={item.appLogo}
                                alt={item.objectType}
                                className="
            h-12
            w-12
            rounded-xl
            object-contain
            bg-white
          "
                            />

                            <div>
                                <div className="font-semibold">{item.objectType}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* User */}
            <div className="space-y-2">
                <label className="text-sm font-medium">User ID</label>

                <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>

                <Input value={form.title} onChange={(e) => updateField('title', e.target.value)} />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Subtitle</label>

                <Textarea value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} />
            </div>

            {/* Action URL */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Action URL</label>

                <Input value={form.actionUrl} readOnly />
            </div>

            <div className="flex gap-3">
                <Button onClick={handleAttach}>Attach Context</Button>

                <Button variant="outline" onClick={handleShow}>
                    Show Chat
                </Button>
            </div>
        </div>
    );
}
