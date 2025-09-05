'use client';

// export default function RootLayout({ children }) {
//     useEffect(() => {
//         /**
//          * Load file
//          * @author NTSAN 08.06.2025
//          */
//         function _loadSource(tag, config) {
//             var el = document.createElement(tag);
//             if (config) {
//                 for (let i in config) {
//                     el[i] = config[i];
//                 }
//             }
//             document.head.appendChild(el);
//         }

//         function getSessionUUID() {
//             // Định nghĩa key để lưu trong sessionStorage
//             const uuidKey = 'session_uuid';
//             // Thử lấy UUID từ sessionStorage
//             let sessionUUID = sessionStorage.getItem(uuidKey);
//             // Nếu chưa có UUID trong session này
//             if (!sessionUUID) {
//                 // Tạo một UUID mới bằng API của trình duyệt
//                 sessionUUID = crypto.randomUUID();

//                 // Lưu UUID mới vào sessionStorage
//                 sessionStorage.setItem(uuidKey, sessionUUID);
//             }
//             // Trả về UUID
//             return sessionUUID;
//         }

//         _loadSource('script', {
//             src: `https://amismisa.misacdn.net/support/core/1.0.0-release/core.js`,
//             type: 'text/javascript',
//             onload: async () => {
//                 window.initAmisSupport({
//                     clientId: '9ad06c08-71dd-11f0-912f-005056a60cf9',
//                     company: 'CN3',
//                     email: 'dev_cukcuk@gmail.com',
//                     fullname: 'Trần Thị Hương Giang',
//                     identityId: '34bee0d8-c9a0-4d24-8df7-7bd81e81e955',
//                     mobile: '0973818181',
//                     source: 'CUKCUK',
//                     taxcode: ''
//                 });
//             }
//         });
//     }, []);

//     return (
//         <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
//             {/* <LiveChatWidget license="19273572" /> */}
//         </div>
//     );
// }

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
import { useState } from 'react';

export default function RootLayout() {
    const [initData, setInitData] = useState(null);
    const [isShowButtonInit, setIsShowButtonInit] = useState(false);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const companies = [{ id: '1', name: 'Công ty Chiron' }];

    async function showChat() {
        if (window && window.initAmisSupport) {
            await window.initAmisSupport({
                clientId: '1',
                identityId: '1',
                source: 'AMIS_SUPPORT_TEST',
                ...initData
            });

            setIsShowDialog(false);
            setIsShowButtonInit(true);
            window.AmisSupport.ChatWindow.show();
        }
    }

    return (
        <div className="p-4">
            {isShowButtonInit && <header></header>}
            {!isShowButtonInit && (
                <Dialog open={isShowDialog} onOpenChange={setIsShowDialog}>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">Tư vấn ngay</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Điền thông tin</DialogTitle>
                                <DialogDescription>Điền các thông tin sau để bắt đầu tư vấn.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label className="flex items-center" htmlFor="input-1">
                                        Họ và tên
                                    </Label>
                                    <Input
                                        id="input-1"
                                        placeholder="Nhập họ và tên..."
                                        autoComplete=""
                                        required
                                        autoFocus
                                        value={initData?.fullname || ''}
                                        onChange={(e) => setInitData({ ...initData, fullname: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="flex items-center" htmlFor="input-2">
                                        Email
                                    </Label>
                                    <Input
                                        id="input-2"
                                        placeholder="Nhập email..."
                                        autoComplete=""
                                        required
                                        value={initData?.email || ''}
                                        onChange={(e) => setInitData({ ...initData, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="flex items-center" htmlFor="input-3">
                                        Số điện thoại
                                    </Label>
                                    <Input
                                        id="input-3"
                                        placeholder="Nhập số điện thoại..."
                                        autoComplete=""
                                        required
                                        value={initData?.mobile || ''}
                                        onChange={(e) => setInitData({ ...initData, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="flex items-center" htmlFor="input-4">
                                        Tên công ty
                                    </Label>
                                    <Input
                                        id="input-4"
                                        placeholder="Nhập tên công ty..."
                                        autoComplete=""
                                        required
                                        value={initData?.company || ''}
                                        onChange={(e) => setInitData({ ...initData, company: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="flex items-center" htmlFor="input-5">
                                        Mã số thuế
                                    </Label>
                                    <Input
                                        id="input-5"
                                        placeholder="Nhập mã số thuế..."
                                        autoComplete=""
                                        required
                                        value={initData?.taxcode || ''}
                                        onChange={(e) => setInitData({ ...initData, taxcode: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Hủy</Button>
                                </DialogClose>
                                <Button type="submit" onClick={showChat}>
                                    Tiếp tục
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            )}
        </div>
    );
}
