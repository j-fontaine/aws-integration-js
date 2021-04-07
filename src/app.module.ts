import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsModule } from './aws/sns/sns.module';

@Module({
  imports: [
    SnsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', 'env.development'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
