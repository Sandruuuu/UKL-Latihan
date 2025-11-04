import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresensiModule } from './presensi/presensi.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [PresensiModule, AuthModule, UsersModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
