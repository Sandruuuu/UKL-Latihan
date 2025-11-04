import { Injectable, NotFoundException } from '@nestjs/common';
import { Presensi } from './presensi.model';
import { Data_Presensi } from './presensi.data';

@Injectable()
export class PresensiService {
  private presensi: Presensi[] = Data_Presensi;
  private nextId = this.presensi.length ? Math.max(...this.presensi.map(p => p.id)) + 1 : 1;

  create(dto: Partial<Presensi>): Presensi {
    const newPresensi = new Presensi({ ...dto, id: this.nextId++ });
    this.presensi.push(newPresensi);
    return newPresensi;
  }

  findAll(): Presensi[] {
    return this.presensi;
  }

  findOne(id: number): Presensi {
    const item = this.presensi.find(p => p.id === id);
    if (!item) throw new NotFoundException('Presensi tidak ditemukan');
    return item;
  }

  update(id: number, dto: Partial<Presensi>): Presensi {
    const idx = this.presensi.findIndex(p => p.id === id);
    if (idx === -1) throw new NotFoundException('Presensi tidak ditemukan');
    this.presensi[idx] = new Presensi({ ...this.presensi[idx], ...dto, id });
    return this.presensi[idx];
  }

  remove(id: number): void {
    const idx = this.presensi.findIndex(p => p.id === id);
    if (idx === -1) throw new NotFoundException('Presensi tidak ditemukan');
    this.presensi.splice(idx, 1);
  }

  findByUsername(username: string) {
    return this.presensi.find(u => u.username === username);
  }
}
