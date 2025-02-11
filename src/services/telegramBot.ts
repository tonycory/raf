import { Bot, Context } from 'grammy';
import axios from 'axios';

export class TelegramBotService {
  private bot: Bot;

  constructor(token: string) {
    this.bot = new Bot(token);
    this.setupHandlers();
  }

  private setupHandlers() {
    // Обработка текстовых сообщений
    this.bot.command('start', async (ctx) => {
      await ctx.reply('Привет! Я бот для анализа изображений и графиков. Отправь мне изображение для анализа.');
    });

    this.bot.command('help', async (ctx) => {
      await ctx.reply(
        'Я могу помочь с анализом:\n' +
        '- Графиков и диаграмм\n' +
        '- Текста на изображениях\n' +
        '- Объектов на изображениях\n\n' +
        'Просто отправь мне изображение!'
      );
    });

    this.bot.on('message:text', this.handleTextMessage.bind(this));
    this.bot.on('message:photo', this.handlePhotoMessage.bind(this));
    this.bot.on('message:document', this.handleDocumentMessage.bind(this));

    // Обработка ошибок
    this.bot.catch((err) => {
      console.error('Error in bot:', err);
    });
  }

  private async handleTextMessage(ctx: Context) {
    const text = ctx.message?.text;
    if (!text) return;

    if (!text.startsWith('/')) {
      await ctx.reply('Отправьте мне изображение для анализа, или используйте команды /help для получения справки.');
    }
  }

  private async handlePhotoMessage(ctx: Context) {
    try {
      await ctx.reply('Функция анализа изображений временно недоступна. Попробуйте позже.');
    } catch (error) {
      console.error('Error processing photo:', error);
      await ctx.reply('Произошла ошибка при обработке изображения. Пожалуйста, попробуйте еще раз.');
    }
  }

  private async handleDocumentMessage(ctx: Context) {
    await ctx.reply('В данный момент я могу обрабатывать только изображения, отправленные как фото.');
  }

  async start() {
    try {
      console.log('Starting bot...');
      await this.bot.start({
        drop_pending_updates: true,
        onStart: () => {
          console.log('Bot is running...');
        },
      });
    } catch (error) {
      console.error('Error starting bot:', error);
      throw error;
    }
  }

  async stop() {
    console.log('Stopping bot...');
    await this.bot.stop();
  }
} 