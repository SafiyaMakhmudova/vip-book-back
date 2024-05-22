import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api'; // Use named import

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly token: string = '7074936045:AAHibiHO9BMMPUhobyytVQyQXuXQnDtYlnY';
  private chatId: string ;

  onModuleInit() {
    this.bot = new TelegramBot(this.token, { polling: true });

    // Listen for any kind of message. There are different kinds of messages.
    this.bot.on('message', (msg) => {
      this.chatId = msg.chat?.id
        // Respond to the message with the chat ID
        console.log("chat",this.chatId);
        
      this.bot.sendMessage(this.chatId, `Assalomu alaykum hurmatli ${msg.chat.first_name}`);
      console.log("open", this.chatId);
      
    });
  }

  getChatId(): string {
    console.log("get", this.chatId);
    
    if (!this.chatId) {
      throw new Error('Chat ID is not set. Send a message to the bot to get the chat ID.');
    }
    return this.chatId;
  }

  sendMessage(message: string) {
    console.log("sned", this.chatId);

    const chatId = this.getChatId();
    this.bot.sendMessage(chatId, message);
  }
}
