'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Script from 'next/script';

interface InitRequestDTO {
    clientId: string;
    identityId: string;
    fullname: string;
    email: string;
    mobile: string;
    company: string;
    taxcode: string;
}

const FormSchema = z.object({
    showTrigger: z.boolean().optional(),
    clientId: z.string(),
    identityId: z.string(),
    source: z.string(),
    fullname: z.string().min(1, 'Họ và tên không được để trống'),
    mobile: z.string().min(1, 'Số điện thoại không được để trống'),
    email: z.email('Email không hợp lệ').or(z.literal('')),
    company: z.string().min(1, 'Tên công ty không được để trống'),
    taxcode: z.string().min(1, 'Mã số thuế không được để trống')
});

export default function RootLayout() {
    const [isShowDialog, setIsShowDialog] = useState(false);

    const _window = typeof window !== 'undefined' ? (window as any) : null;

    function getSessionUUID() {
        return crypto.randomUUID();
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
            src: `https://support-misa.misacdn.net/1.0.0-release/core.js`,
            type: 'text/javascript'
        });
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: '',
            email: '',
            mobile: '',
            company: '',
            taxcode: '',
            clientId: '2f4195dc-83fd-11f0-912f-005056a60cf9',
            identityId: '',
            showTrigger: true,
            source: 'AMIS_SUPPORT'
        }
    });

    console.log(JSON.stringify(form.formState.errors));

    async function onSubmit() {
      debugger
        if (_window && _window.initAmisSupport) {
            form.setValue('identityId', getSessionUUID());
            await _window.initAmisSupport(form.getValues());
            _window.AmisSupport.ChatWindow.show();
        } else if (_window?.AmisSupport?.ChatWindow) {
            _window.AmisSupport.ChatWindow.show();
        }
    }

    return (
        <div className="p-4">
            <h3>MKT 1</h3>
            <Dialog
                open={isShowDialog}
                onOpenChange={(v) => {
                    setIsShowDialog(v);
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">Tư vấn ngay</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Điền thông tin</DialogTitle>
                        <DialogDescription>Điền các thông tin sau để bắt đầu tư vấn.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Họ và tên <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập họ và tên..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập email..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Số điện thoại
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập số điện thoại..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Tên công ty
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên công ty..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taxcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mã số thuế
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mã số thuế..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Hủy</Button>
                            </DialogClose>
                            <Button
                                onClick={async () => {
                                    const valid = await form.trigger();
                                    if (valid) {
                                        onSubmit();
                                        setIsShowDialog(false);
                                    }
                                }}
                            >
                                Tiếp tục
                            </Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
