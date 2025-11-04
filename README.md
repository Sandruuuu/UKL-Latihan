## Penjelasan
![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2008-18-37.png?raw=true)

Oke, jadi ini adalah endpoint yang saya gunakan untuk proses login (POST /api/auth/login). Saya mengirimkan username dan password saya, dan saya berhasil!
Seperti yang terlihat di screenshot, testing ini sukses karena statusnya 201 Created dan pesannya 'Login berhasil'. Ini berarti server menerima dan memverifikasi data saya.
MD5 & Token: Secara spesifik, saya menggunakan semacam hashing (mungkin MD5 atau sejenisnya) di backend untuk mencocokkan kata sandi dengan aman. Begitu verifikasi ini lulus, server langsung memberikan saya JSON Web Token (JWT) yang panjang itu.

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2008-39-41.png?raw=true)

Saya menggunakan metode POST ke endpoint /api/users. Ini adalah standar untuk membuat data baru. Begitu saya mengirimkan detail pengguna baru (seperti nama, username, dan password), server langsung merespons dengan 201 Created dan pesan 'Pengguna berhasil ditambahkan'. Ini artinya user baru, yaitu 'Hendrik Guguk' dengan username 'Zyroo', sudah sukses tersimpan ke database saya.

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2009-14-52.png?raw=true)

Di permintaan ini, saya mengirimkan data baru—seperti mengubah username pengguna tersebut. Seperti yang terlihat, testing saya berhasil dengan respons 200 OK dan pesan 'Pengguna berhasil diperbarui'. Data yang dikembalikan server menunjukkan bahwa username pengguna dengan ID 2 sudah sukses berubah menjadi 'Bazing'.

Ini penting karena membuktikan bahwa pengguna bisa mengubah data mereka sendiri (seperti mengganti nama atau username). Dan yang terpenting, password hash tetap muncul di respons, ini memastikan bahwa server tetap tidak pernah menampilkan kata sandi asli, bahkan setelah ada pembaruan data. Jadi, fungsi update ini sudah aman dan berjalan dengan baik.

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2010-00-38.png?raw=true)

Saya menggunakan metode GET ke endpoint localhost:3000/api/users/1. Angka /1 di sini berarti saya secara spesifik ingin mengambil data pengguna yang memiliki ID = 1. Karena ini adalah data rahasia, saya pasti sudah menyertakan Token JWT yang saya dapat saat login di header permintaan (Authorization).

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2010-32-49.png?raw=true)

Jadi saya disini menggunakan method POST untuk mencatat kehadiran para siswa by id. Mencatat kehadiran siswa tentu nya memakai json dengan membuat date,time,dan status (hadir/alpa/izin) untuk semua siswa yang tersimpan ke dalam data presensi  Jadi seperti bisa dilihat sudah working dan juga ini membuktikan bahwa kode saya berjalan dengan lancar.

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2011-07-38.png?raw=true)

Untuk yang disini simpel saja saya membuat history untuk para kehadiran dari pada id siswa dengan begitu semua pembuatan kehadiran di post akan tersimpan di dalam history para id_siswa, dan juga kode sudah berjalan dengan sangat baik.

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2011-19-52.png?raw=true)

Saya menggunakan metode GET ke endpoint spesifik, yaitu /api/attendance/summary/1. Angka /1 di sini berarti saya meminta ringkasan kehadiran untuk Siswa dengan ID = 1. Seperti biasa, header saya pasti sudah terisi Token JWT untuk otorisasi. Respon yang saya dapat adalah 200 OK, dan datanya sangat informatif: Saya mendapatkan ringkasan kehadiran untuk user_id: 1 di bulan 11-2025, dengan detail seperti: Hadir: 1, Izin: 0, Sakit: 0, Alpha: 0. Ini membuktikan bahwa sistem saya tidak hanya mencatat data, tapi juga bisa mengolah dan menyajikan laporan ringkasan bulanan secara real-time

![App Screenshot](https://github.com/Sandruuuu/UKL-Latihan/blob/master/Screenshot%20from%202025-11-04%2011-39-48.png?raw=true)

Saya menggunakan metode POST ke endpoint /api/attendance/analysis, dan ini penting: Alasan saya menggunakan POST (bukan GET) adalah karena saya mengirimkan parameter filter di body JSON. Di situ, saya menentukan rentang waktu yang spesifik, misalnya dari start_date: 2025-10-11 sampai end_date: 2026-12-10, untuk mengecek data kehadiran siswa.

Responnya sukses (201 Created) dan memberikan hasil insight yang dalam: Saya mendapatkan analisis kelompok (grouped_analysis) untuk rentang waktu yang saya minta, menunjukkan total persentase kehadiran, izin, sakit, dan alpha di seluruh sistem. Misalnya, terlihat hadir_percentage: 50 dan alpa_percentage: 50

## Project setup
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
