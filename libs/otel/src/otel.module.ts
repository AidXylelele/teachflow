import { Module } from '@nestjs/common';
import { OtelService } from './otel.service';

@Module({
  providers: [OtelService],
  exports: [OtelService],
})
export class OtelModule {}
