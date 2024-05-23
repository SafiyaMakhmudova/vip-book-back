import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api'; // Use named import

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly token: string = process.env.BOT_TOKEN;
  private chatId: string = process.env.CHAT_ID ;

  onModuleInit() {
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', (msg) => {
      this.bot.sendMessage(this.chatId, `Assalomu alaykum hurmatli ${msg.chat.first_name}`);
      
    });
  }

  getChatId(): string {
    if (!this.chatId) {
      throw new Error('Chat ID is not set. Send a message to the bot to get the chat ID.');
    }
    return this.chatId;
  }

  sendMessage(message: string) {
    const chatId = this.getChatId();
    this.bot.sendMessage(chatId, message);
  }
}
