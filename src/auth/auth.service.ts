import { Injectable } from "@nestjs/common";
import { PresensiService } from "../presensi/presensi.service";
import { JwtService } from "@nestjs/jwt";
import { createHash } from "crypto";

const md5 = (s: string) => createHash("md5").update(s).digest("hex");

@Injectable()
export class AuthService {
  constructor(
    private readonly presensiService: PresensiService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = this.presensiService.findByUsername(username);
    if (!user) return null;
    if (user.password !== md5(password)) return null;
    const { password: _p, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}