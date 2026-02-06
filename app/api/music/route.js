import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  // 1. Xác định đường dẫn folder nhạc (nằm trong public/music)
  const musicDirectory = path.join(process.cwd(), 'public', 'music');

  try {
    // 2. Đọc danh sách file
    const filenames = fs.readdirSync(musicDirectory);

    // 3. Lấy thông tin Host để tạo link tuyệt đối (VD: https://web-cua-ban.vercel.app)
    const host = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // 4. Lọc file .mp3 và map dữ liệu
    const songs = filenames
      .filter((file) => file.endsWith('.mp3'))
      .map((file) => {
        return {
          title: file.replace('.mp3', '').replace(/-/g, ' '), // Bỏ đuôi .mp3 và thay dấu gạch ngang bằng khoảng trắng
          artist: "Unknown", // Hoặc có thể tách tên từ file nếu đặt tên kiểu "CaSi - BaiHat.mp3"
          cover: "https://via.placeholder.com/100", // Ảnh bìa mặc định
          url: `${baseUrl}/music/${file}` // Link trực tiếp đến file
        };
      });

    // 5. Trả về JSON và SET HEADER CORS (Quan trọng)
    // Nếu không set headers này, Tampermonkey sẽ bị chặn.
    return NextResponse.json(songs, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Không tìm thấy folder music hoặc lỗi server' },
      { status: 500 }
    );
  }
}

// Xử lý Preflight Request (Cho trình duyệt "hỏi đường" trước khi fetch)
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
