import { Module } from '@nestjs/common';
import { ListenerModule } from './listener/listener.module';
import { HandlersModule } from './handlers/handlers.module';
import { SnsProviderService } from './sns-provider/sns-provider.service';
import { HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule, ListenerModule, HandlersModule],
  providers: [SnsProviderService],
  exports: [SnsProviderService],
})
export class SnsModule {}
