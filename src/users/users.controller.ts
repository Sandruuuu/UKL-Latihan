import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PresensiService } from '../presensi/presensi.service';
import { createHash } from 'crypto';
import { Presensi } from '../presensi/presensi.model';

class CreateUserDto {
  name: string;
  username: string;
  password: string;
  role?: string;
}

class UpdateUserDto {
  name?: string;
  username?: string;
  password?: string;
  role?: string;
}

const md5 = (s: string) => createHash('md5').update(s).digest('hex');

@Controller('api/users')
export class UsersController {
  constructor(private readonly presensiService: PresensiService) {}

  @Get()
  findAll() {
    const users = this.presensiService.findAll();
    return {
      status: 'success',
      message: 'Daftar pengguna',
      data: users,
    };
  }

  @Get(':id')
  findbyId(@Param('id', ParseIntPipe) id: number) {
    const user = this.presensiService.findOne(id);
    return {
      status: 'success',
      data: user,
    };
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    if (!dto.username || !dto.password) {
      throw new BadRequestException('username and password are required');
    }

    const newUser = this.presensiService.create({
      name: dto.name,
      username: dto.username,
      password: md5(dto.password),
      role: dto.role ?? 'user',
    });

    return {
      status: 'success',
      message: 'Pengguna berhasil ditambahkan',
      data: newUser,
    };
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    if (dto.password) dto.password = md5(dto.password);

    const updated = this.presensiService.update(id, dto as Partial<Presensi>);
    return {
      status: 'success',
      message: 'Pengguna berhasil diperbarui',
      data: updated,
    };
  }
}