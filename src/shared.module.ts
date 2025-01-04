import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
    }),
  ],
  exports: [JwtModule], 
})
export class SharedModule {}
