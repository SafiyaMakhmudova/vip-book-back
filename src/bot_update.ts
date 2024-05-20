import { Context, Telegraf } from 'telegraf';
import { Ctx, Start, Update, On, Command } from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';

@Injectable()
@Update()
export class BotUpdate {
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply('Welcome! Send /pdf to get the PDF file.');
  }

  @Command('pdf')
  async sendPdf(@Ctx() ctx: Context) {
    const pdfPath = join(__dirname, '..', 'files', 'sample.pdf');
    await ctx.replyWithDocument({ source: createReadStream(pdfPath), filename: 'sample.pdf' });
  }
}
