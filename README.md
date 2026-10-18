# nomonovfarhod.uz

Сайт-портфолио Фархода Номонова, IT-учителя. Одна страница на React 18 + Vite,
стили на Tailwind CSS, переводы ru / en / uz (react-intl). Хостинг — Netlify.
Форма «Написать мне» отправляет сообщение в Telegram через Netlify Function
`netlify/functions/send-message.js`.

## Запуск

```bash
npm install
npm run dev       # дев-сервер Vite (форма здесь не работает — нет функций)
npm run build     # сборка в dist/
npm run preview   # просмотр собранного dist/
```

## Проверка формы локально

Форме нужна Netlify Function, поэтому запускайте через Netlify CLI:

```bash
npm install -g netlify-cli
cp .env.example .env   # и впишите значения
netlify dev
```

## Переменные окружения

Задаются в `.env` локально и в настройках сайта на Netlify
(Site configuration → Environment variables):

- `BOT_TOKEN` — токен Telegram-бота
- `CHAT_ID` — id чата, куда приходят сообщения

Фронтенду переменные не нужны.
