import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PresensiService } from '../presensi/presensi.service';

class CreateAttendanceDto {
  user_id: number;
  date?: string;
  time?: string;
  status: string;
}

class AnalysisDto {
  start_date: string;
  end_date: string;
  group_by?: string;
}

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly presensiService: PresensiService,
  ) {}

  @Post()
  create(@Body() dto: CreateAttendanceDto) {
    if (!dto || typeof dto.user_id !== 'number' || !dto.status) {
      throw new BadRequestException('user_id (number) dan status diperlukan');
    }
    const user = this.presensiService.findOne(dto.user_id);
    if (!user) throw new BadRequestException('User tidak ditemukan');

    const created = this.attendanceService.create({
      user_id: dto.user_id,
      date: dto.date,
      time: dto.time,
      status: dto.status,
    });

    return { status: 'success', message: 'Kehadiran dicatat', data: created };
  }

  @Get()
  findAll() {
    return { status: 'success', data: this.attendanceService.findAll() };
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const rec = this.attendanceService.findById(id);
    if (!rec) throw new NotFoundException('Attendance not found');
    return { status: 'success', data: rec };
  }

  @Get('user/:id')
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return { status: 'success', data: this.attendanceService.findByUser(id) };
  }

  @Get('history/:id')
  findHistory(
    @Param('id', ParseIntPipe) id: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return { status: 'success', data: this.attendanceService.findHistory(id, startDate, endDate) };
  }

  @Get('summary/:id')
  getMonthlySummary(
    @Param('id', ParseIntPipe) id: number,
    @Query('month') month?: string, // optional, format MM-YYYY
  ) {
    const summary = this.attendanceService.findMonthlySummary(id, month);
    return { status: 'success', data: summary };
  }

  // New: analysis endpoint
  @Post('analysis')
  analyze(@Body() dto: AnalysisDto) {
    if (!dto || !dto.start_date || !dto.end_date) {
      throw new BadRequestException('start_date and end_date are required (YYYY-MM-DD)');
    }

    const groupBy = dto.group_by ?? 'role'; // default grouping field: 'role'
    const users = this.presensi_service_or_findAll();

    // call service analyzer
    const grouped = this.attendanceService.analyzeByGroup(dto.start_date, dto.end_date, groupBy, users);

    return {
      status: 'success',
      data: {
        analysis_period: {
          start_date: dto.start_date,
          end_date: dto.end_date,
        },
        grouped_analysis: grouped,
      },
    };
  }

  // helper to get users (kept as method to keep controller concise)
  private presensi_service_or_findAll() {
    return this.presensiService.findAll();
  }
}