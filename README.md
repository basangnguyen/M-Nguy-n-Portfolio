# Mỹ Nguyễn — Marketing Portfolio

Portfolio một trang được xây dựng từ nội dung và tài nguyên đã xác minh của
Mỹ Nguyễn. Website sử dụng React, Next.js/Vinext và CSS thuần cho animation,
gallery, project slider và responsive.

## Chạy trên máy

Yêu cầu Node.js 22.13 trở lên.

```powershell
npm ci
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm tra

```powershell
npm test
npm run lint
npm run build:vercel
```

## Deploy public bằng Vercel

Repository đã có `vercel.json`, vì vậy không cần thay đổi Build Command thủ
công.

1. Đăng nhập [Vercel](https://vercel.com/) bằng GitHub.
2. Chọn **Add New → Project**.
3. Import repository `basangnguyen/M-Nguy-n-Portfolio`.
4. Giữ **Root Directory** là thư mục gốc và **Framework Preset** là Next.js.
5. Chọn **Deploy**.
6. Khi hoàn tất, Vercel cung cấp URL dạng `https://ten-project.vercel.app`.

Mỗi lần push mới lên nhánh `main`, Vercel sẽ tự build và cập nhật production.
Trong **Settings → Git**, có thể giữ Git LFS ở trạng thái tắt vì production
không đọc `assets_thật`. Chỉ bật LFS và redeploy nếu cần tải toàn bộ file nguồn
vào môi trường build; thao tác này sẽ tải thêm khoảng 210 MB.

## Lưu ý tài nguyên

- Media dùng trên website nằm trong `public/media` và đã được đưa vào Git.
- `assets_thật` chứa file nguồn dung lượng lớn và được lưu bằng Git LFS. Sau khi
  clone, chạy `git lfs pull` nếu Git chưa tự tải các file này.
- Website không đọc trực tiếp `assets_thật`; build production chỉ dùng các bản
  media đã tối ưu trong `public/media`.
- Video trong project được nhúng từ bản YouTube đã xuất bản.
- Form liên hệ mở ứng dụng email mặc định; website không lưu dữ liệu biểu mẫu.
