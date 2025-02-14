import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: envs.databaseUrl || 'mongodb://localhost:27017/dragonball',
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
