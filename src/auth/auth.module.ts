import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PresensiService } from '../presensi/presensi.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'change_this_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PresensiService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}