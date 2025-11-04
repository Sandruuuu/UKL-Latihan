import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PresensiModule } from '../presensi/presensi.module';

@Module({
  imports: [PresensiModule],
  controllers: [UsersController],
})
export class UsersModule {}