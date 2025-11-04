export class Presensi {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;

  constructor(data: Partial<Presensi> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.username = data.username ?? '';
    this.password = data.password ?? '';
    this.role = data.role ?? 'user';
  }
}
