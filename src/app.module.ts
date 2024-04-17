import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryMiniModule } from './category-mini/category-mini.module';
import { CategoryMaxModule } from './category-max/category-max.module';
import { AdminModule } from './admin/admin.module';
import { CategoryMax } from './category-max/models/category-max.model';
import { CategoryMini } from './category-mini/models/category-mini.model';
import { Admin } from './admin/models/admin.model';
import { UserModule } from './user/user.module';
import { BooksModule } from './books/books.module';
import { Books } from './books/models/book.model';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { User } from './user/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [CategoryMax, CategoryMini, Admin, Books, Comment, User],
      autoLoadModels: true,
      logging: true,
    }),

    CategoryMiniModule,
    CategoryMaxModule,
    AdminModule,
    UserModule,
    BooksModule,
    CommentModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
