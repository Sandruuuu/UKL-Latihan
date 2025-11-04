import { Presensi } from "./presensi.model";
import { createHash } from "crypto";

const md5 = (s: string) => createHash("md5").update(s).digest("hex");

export const Data_Presensi: Presensi[] = [
  new Presensi({
    id: 1,
    name: "Purwanto",
    username: "Lapaccio",
    password: md5("00883300!"),
    role: "Siswa",
  }),
  new Presensi({
    id: 2,
    name: "Sandro",
    username: "Sandro",
    password: md5("12345678"),
    role: "Admin",
  }),
];