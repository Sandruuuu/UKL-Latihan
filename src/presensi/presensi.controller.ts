import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { Presensi } from './presensi.model';

@Controller('presensi')
export class PresensiController {
  constructor(private readonly presensiService: PresensiService) {}

  @Get()
  findAll(): { status: string; message: string; data: Presensi[] } {
    const data = this.presensiService.findAll();
    return { status: 'success', message: 'Daftar presensi', data };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): { status: string; message: string; data: Presensi } {
    try {
      const item = this.presensiService.findOne(id);
      return { status: 'success', message: 'Detail presensi', data: item };
    } catch (e) {
      throw new NotFoundException('Presensi tidak ditemukan');
    }
  }

  @Post()
  create(@Body() dto: Partial<Presensi>) {
    const newItem = this.presensiService.create(dto);
    return {
      status: 'success',
      message: 'Presensi berhasil ditambahkan',
      data: newItem,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<Presensi>,
  ) {
    const updated = this.presensiService.update(id, dto);
    return {
      status: 'success',
      message: 'Presensi berhasil diperbarui',
      data: updated,
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.presensiService.remove(id);
    return { status: 'success', message: 'Presensi berhasil dihapus' };
  }
}
