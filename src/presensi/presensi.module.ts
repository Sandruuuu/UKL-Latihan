import { Module } from '@nestjs/common';
import { PresensiController } from './presensi.controller';
import { PresensiService } from './presensi.service';

@Module({
  controllers: [PresensiController],
  providers: [PresensiService],
  exports: [PresensiService], // penting
})
export class PresensiModule {}
