import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';



@Module({
  imports:[ServeStaticModule.forRoot({rootPath:`${path}/static`, serveRoot:'static'})],
  providers: [FilesService],
  exports: [FilesService],
})

export class FilesModule {}
