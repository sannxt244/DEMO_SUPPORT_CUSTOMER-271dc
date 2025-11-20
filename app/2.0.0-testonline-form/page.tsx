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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Script from 'next/script';

interface InitRequestDTO {
    clientId: string;
    identityId: string;
    fullname: string;
    email: string;
    mobile: string;
    company: string;
    taxcode: string;
    source: string;
}

const FormSchema = z.object({
    clientId: z.string(),
    identityId: z.string(),
    source: z.string(),
    fullname: z.string().min(1, 'Họ và tên không được để trống'),
    mobile: z.string().min(1, 'Số điện thoại không được để trống'),
    email: z.string().email('Email không hợp lệ').or(z.literal('')),
    company: z.string().min(1, 'Tên công ty không được để trống'),
    taxcode: z.string().min(1, 'Mã số thuế không được để trống')
});

export default function RootLayout() {
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [currentInfo, setCurrentInfo] = useState<InitRequestDTO | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const _window = typeof window !== 'undefined' ? (window as any) : null;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: '',
            email: '',
            mobile: '',
            company: '',
            taxcode: '',
            clientId: '1',
            identityId: '',
            source: '1.0.0-testonline-form'
        }
    });

    // Khởi tạo AmisSupport khi component mount
    useEffect(() => {
        if (isScriptLoaded && _window && _window.initAmisSupport) {
            const savedData = localStorage.getItem('testonline-support-info');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    setCurrentInfo(data);
                    _window.initAmisSupport(data);
                } catch (error) {
                    console.error('Error parsing saved data:', error);
                }
            } else {
                // Nếu chưa có thông tin, tự động mở dialog
                setIsShowDialog(true);
            }
        }
    }, [isScriptLoaded, _window]);

    // Xử lý khi nhấn nút "Tiếp tục" trong form
    const handleFormSubmit = async () => {
        const valid = await form.trigger();
        if (valid) {
            const formData = form.getValues();
            formData.identityId = crypto.randomUUID();
            
            // Lưu vào localStorage
            localStorage.setItem('testonline-support-info', JSON.stringify(formData));
            
            // Đóng dialog
            setIsShowDialog(false);
            
            // Reload trang
            window.location.reload();
        }
    };

    // Xử lý reset/khởi tạo thông tin
    const handleInitInfo = () => {
        localStorage.removeItem('testonline-support-info');
        setCurrentInfo(null);
        form.reset();
        setIsShowDialog(true);
    };

    return (
        <>
            <Script 
                src="https://testcdnamisapp.misacdn.net/support/core/2.0.0-testonline/core.js"
                onLoad={() => setIsScriptLoaded(true)}
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-4">📋 THÔNG TIN HIỆN TẠI</h3>
                
                {currentInfo ? (
                    <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm text-gray-600">**Họ và tên:**</p>
                                <p className="font-medium">{currentInfo.fullname}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">**Email:**</p>
                                <p className="font-medium">{currentInfo.email || 'Chưa có'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">**Số điện thoại:**</p>
                                <p className="font-medium">{currentInfo.mobile}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">**Tên công ty:**</p>
                                <p className="font-medium">{currentInfo.company}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">**Mã số thuế:**</p>
                                <p className="font-medium">{currentInfo.taxcode}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 p-4 border rounded-lg bg-yellow-50">
                        <p className="text-gray-600">⚠️ Chưa có thông tin. Vui lòng nhập thông tin để bắt đầu.</p>
                    </div>
                )}

                <Dialog open={isShowDialog} onOpenChange={setIsShowDialog}>
                    <DialogTrigger asChild>
                        <Button variant="default" onClick={handleInitInfo}>
                            ⚙️ Khởi tạo thông tin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Điền thông tin</DialogTitle>
                            <DialogDescription>Điền các thông tin sau để bắt đầu tư vấn.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <div className="space-y-4">
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
                            </div>

                            <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                    <Button variant="outline">Hủy</Button>
                                </DialogClose>
                                <Button onClick={handleFormSubmit}>
                                    Tiếp tục
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

