# Auth Api

Aplikasi ini adalah portal autentikasi yang memungkinkan pengguna untuk membuat akun, login, dan mengakses profil mereka.
Aplikasi ini menggunakan REST API untuk komunikasi dengan server.

- [Pendahuluan](#pendahuluan)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Menggunakan Aplikasi](#menggunakan-aplikasi)

## Pendahuluan

Aplikasi ini dibangun menggunakan [Express.js](https://expressjs.com/) sebagai backend dan [React](https://reactjs.org/) sebagai frontend. Aplikasi ini memanfaatkan database PostgreSQL untuk menyimpan data pengguna.

## Instalasi
1. Clone repositori ini ke Komputer Anda :
   ``bash
   git clone https://github.com/pasaribuputri/auth-api.git
   ``
3. Install dependensi untuk backend dan frontend
   
   cd server > pnpm add express pg nodemon jsonwebtoken cookie-parser cors bcryptjs
   cd client > pnpm install

## Menjalankan Aplikasi
1. Jalankan server backend
   
   cd server > pnpm run dev
3. Jalankan client frontend
   
   cd client > pnpm run dev

## Menggunakan Aplikasi

Setelah menjalankan aplikasi, Anda dapat mengaksesnya melalui browser dengan alamat http://localhost:5173. Aplikasi memiliki fitur-fitur berikut:

- Pembuatan Akun: Pengguna dapat membuat akun dengan mengisi data seperti nama, email, dan jenis kelamin.
- Login: Setelah membuat akun, pengguna dapat login menggunakan email dan password.
- Profil Pengguna: Pengguna yang sudah login dapat mengakses profil mereka yang berisi informasi nama, email, dan jenis kelamin.
- Logout: Pengguna dapat logout untuk keluar dari aplikasi. 
