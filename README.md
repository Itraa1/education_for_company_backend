# 🎓 Education For Company Backend

Strapi CMS v5.36.0 для управления образовательным контентом внутри компании.

## 📋 Проект

**Назначение:** Backend API для платформы корпоративного обучения

**Стек:** 
- Node.js (≥20.0.0 ≤24.x.x)
- Strapi CMS v5.36.0
- TypeScript 5
- MySQL 8.0 / PostgreSQL / SQLite
- React 18 (admin panel)

**Статус:** 🟡 В разработке (Course модель в процессе)

---

## 🚀 Быстрый старт

### 1️⃣ Установка зависимостей

```bash
npm install
```

### 2️⃣ Конфигурация

Скопируйте `.env.example` в `.env` и отредактируйте:

```bash
cp .env.example .env
```

**Основные переменные:**
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
APP_KEYS=key1,key2
ADMIN_JWT_SECRET=your-secret
JWT_SECRET=your-jwt-secret
API_TOKEN_SALT=your-salt
TRANSFER_TOKEN_SALT=your-transfer-salt
ENCRYPTION_KEY=your-encryption-key
```

### 3️⃣ Запуск сервера

**Разработка (с hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm run start
```

Откройте: http://localhost:1337/admin

---

## 📦 Доступные команды

```bash
npm run dev              # Разработка с автоперезагрузкой
npm run develop          # Альтернатива dev
npm run build            # Сборка админ панели
npm run start            # Production запуск
npm run console          # Интерактивная консоль
npm run setup-course     # Создать модель Course
npm run setup-models     # Альтернатива setup-course
npm run upgrade          # Обновить Strapi
npm run upgrade:dry      # Проверка обновлений
npm run strapi [cmd]     # Прямые Strapi команды
```

---

## 🏗️ Структура проекта

```
education_for_company_backend/
├── src/
│   ├── api/                      # API endpoints
│   │   ├── course/               # 🆕 Course модель (в разработке)
│   │   │   ├── content-types/course/schema.json
│   │   │   ├── controllers/course.ts
│   │   │   ├── routes/course.ts
│   │   │   └── services/course.ts
│   │   └── test/                 # Пример модели
│   ├── admin/                    # Admin панель (не компилируется)
│   ├── extensions/               # Расширения
│   └── index.ts                  # Точка входа
├── config/
│   ├── api.ts                    # API конфигурация
│   ├── database.ts               # БД конфигурация
│   ├── server.ts                 # Сервер конфигурация
│   ├── admin.ts                  # Admin конфигурация
│   ├── plugins.ts                # Плагины
│   └── middlewares.ts            # Middleware
├── database/                     # Миграции, seeds
├── dist/                         # Скомпилированный код
├── public/                       # Статические файлы
├── types/                        # TypeScript типы
├── .env.example                  # Пример переменных окружения
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript конфигурация
├── QUICK_START.md                # ⚡ Быстрый старт Course модели
├── COURSE_MODEL_SETUP.md         # 📖 Полная документация Course
└── setup-course.js               # 🛠️ Скрипт установки Course
```

---

## 📚 Текущие Content Types

### 1. Test (Пример)
- **Коллекция:** tests
- **Поля:** name (string)
- **API:** `/api/tests`

### 2. Course (В разработке) 🆕
- **Коллекция:** courses
- **Поля:**
  - `title` (string, обязательно)
  - `slug` (uid, обязательно)
  - `description` (richtext, обязательно)
  - `category` (enum: programming, design, business, marketing, management, soft-skills, other)
  - `level` (enum: beginner, intermediate, advanced)
  - `duration` (integer в минутах)
  - `instructor` (string)
- **Статус:** ⏳ Требуется выполнить `npm run setup-course`
- **API:** `/api/courses` (после установки)

---

## 🔄 Процесс создания Course модели

### Текущий статус

```
✅ Файлы созданы:
   - schema.json (определение структуры)
   - course.ts (контроллер)
   - course.ts (роутер)
   - course.ts (сервис)

⏳ Осталось:
   1. npm run setup-course
   2. npm run dev
   3. Проверить в админ панели
```

### Как завершить установку

```bash
# Метод 1: NPM скрипт (рекомендуется)
npm run setup-course

# Метод 2: Node.js напрямую
node setup-course.js

# Метод 3: Python (если установлен)
python setup_course_model.py

# Метод 4: Ручное копирование
# Смотрите QUICK_START.md для инструкций
```

После этого запустите сервер:
```bash
npm run dev
```

---

## 🔗 API Endpoints

### Test Collection
```
GET    /api/tests             # Получить все
GET    /api/tests/:id         # Получить по ID
POST   /api/tests             # Создать
PUT    /api/tests/:id         # Обновить
DELETE /api/tests/:id         # Удалить
```

### Course Collection (после установки)
```
GET    /api/courses           # Получить все курсы
GET    /api/courses/:id       # Получить курс по ID
POST   /api/courses           # Создать новый курс
PUT    /api/courses/:id       # Обновить курс
DELETE /api/courses/:id       # Удалить курс
POST   /api/courses/:id/publish  # Опубликовать
```

---

## 🔐 Безопасность

### Плагины
- `users-permissions` - Управление пользователями и ролями
- `cloud` - Облачные интеграции и развертывание

### Требуемые переменные .env

```env
APP_KEYS             # Коммаразделенные ключи приложения
API_TOKEN_SALT       # Соль для API токенов
ADMIN_JWT_SECRET     # Секрет JWT для админа
TRANSFER_TOKEN_SALT  # Соль для transfer токенов
JWT_SECRET           # Секрет JWT для API
ENCRYPTION_KEY       # Ключ шифрования
```

### Рекомендации
- 🔒 Используйте надежные random ключи в production
- 🔐 Храните .env в безопасном месте (не коммитьте в Git)
- 🛡️ Настройте CORS для вашего фронтенда
- 👤 Создайте правильные роли и permissions

---

## 🗄️ База данных

### Поддерживаемые БД
- **MySQL 8.0+** (текущая конфигурация)
- **PostgreSQL 12+**
- **SQLite** (для локальной разработки)

### Переключение БД

Измените в `.env`:
```env
# MySQL (default)
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi

# PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi

# SQLite (local dev)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

---

## 📖 Документация

- **[Strapi Official Docs](https://docs.strapi.io/)**
- **[QUICK_START.md](./QUICK_START.md)** - ⚡ Быстрый старт (Course модель)
- **[COURSE_MODEL_SETUP.md](./COURSE_MODEL_SETUP.md)** - 📋 Полная инструкция
- **[.env.example](./.env.example)** - Пример конфигурации

---

## 🐛 Troubleshooting

### Модель не видна в админ панели
```bash
# Перезапустите сервер
npm run dev
```

### Ошибка БД при подключении
1. Проверьте учетные данные в `.env`
2. Убедитесь что БД запущена
3. Очистите кэш: `rm -rf .strapi node_modules/.cache`

### TypeScript ошибки
```bash
# Проверьте конфигурацию
npm run strapi -- develop --watch
```

### Очистка проекта
```bash
rm -rf dist/ .strapi node_modules/.cache
npm run dev
```

---

## 📝 Версии

- **Strapi:** 5.36.0
- **Node.js:** ≥20.0.0 ≤24.x.x
- **TypeScript:** ^5
- **React:** ^18.0.0

---

## 🎯 Планы развития

### Phase 1: Основные модели (в процессе)
- ✅ Course модель
- ⏳ Lesson модель
- ⏳ Module модель
- ⏳ Enrollment модель

### Phase 2: Продвинутые функции
- ⏳ File uploads
- ⏳ Видео streaming
- ⏳ Система оценок
- ⏳ Notifications

### Phase 3: Production
- ⏳ CI/CD pipeline
- ⏳ Monitoring & Logging
- ⏳ API Documentation (Swagger)
- ⏳ Performance optimization

---

## 💡 Часто задаваемые вопросы

**Q: Как создать новую модель?**
A: Используйте Strapi CLI или админ панель:
```bash
npm run strapi generate api <name> <collection-type>
```

**Q: Как добавить пользовательские поля?**
A: Отредактируйте `schema.json` для модели и перезагрузитесь.

**Q: Как развернуть в production?**
A: См. документацию Strapi для развертывания на вашей платформе.

---

## 📄 Лицензия

MIT

---

## 👥 Разработчик

Создано для образовательной платформы компании

