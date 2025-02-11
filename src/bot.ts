import { TelegramBotService } from './services/telegramBot';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN не найден в переменных окружения');
  process.exit(1);
}

console.log('Using bot token:', BOT_TOKEN);

const bot = new TelegramBotService(BOT_TOKEN);

// Обработка остановки процесса
process.on('SIGINT', async () => {
  console.log('Получен сигнал остановки...');
  await bot.stop();
  process.exit(0);
});

// Запускаем бота
bot.start().catch((error) => {
  console.error('Ошибка при запуске бота:', error);
  process.exit(1);
}); 