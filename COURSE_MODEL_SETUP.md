# 🎓 Course Model Setup Guide

## 📋 Статус

Файлы для модели Course уже созданы в `src/api/test/`:

```
src/api/test/
├── content-types/
│   └── course-schema.json  ✓ Создан
├── controllers/
│   └── course.ts           ✓ Создан
├── routes/
│   └── course.ts           ✓ Создан
└── services/
    └── course.ts           ✓ Создан
```

## 🚀 Как завершить настройку

### Вариант 1: Автоматическая установка (РЕКОМЕНДУЕТСЯ)

Используйте Node.js скрипт:

```bash
npm run setup-course
```

Или напрямую:

```bash
node setup-course.js
```

**Что делает скрипт:**
- ✓ Создает директорию `src/api/course/` с правильной структурой
- ✓ Копирует файлы из `src/api/test/` в новую структуру
- ✓ Подготавливает модель к использованию в Strapi

### Вариант 2: Ручная установка

Если автоматический скрипт не сработает, выполните вручную:

1. **Создайте директории в VS Code:**
   ```
   Right-click на src/api → New Folder
   - course
   - course/content-types
   - course/content-types/course
   - course/controllers
   - course/routes
   - course/services
   ```

2. **Скопируйте файлы:**
   - `src/api/test/content-types/course-schema.json` → `src/api/course/content-types/course/schema.json`
   - `src/api/test/controllers/course.ts` → `src/api/course/controllers/course.ts`
   - `src/api/test/routes/course.ts` → `src/api/course/routes/course.ts`
   - `src/api/test/services/course.ts` → `src/api/course/services/course.ts`

### Вариант 3: Python скрипт

Если у вас установлен Python:

```bash
python setup_course_model.py
```

## ✅ Проверка после установки

1. **Запустите разработку:**
   ```bash
   npm run dev
   ```

2. **Откройте админ панель:**
   ```
   http://localhost:1337/admin
   ```

3. **Проверьте меню слева:**
   - Должна появиться новая коллекция **"Courses"**
   - Можно создать новый курс

## 📊 Структура модели Course

После успешной установки вы сможете работать с курсами через API:

### Поля курса:

| Поле | Тип | Обязательное | Описание |
|------|-----|-------------|---------|
| **title** | String | ✅ | Название курса (3-255 символов) |
| **slug** | UID | ✅ | URL-friendly ID (автогенерируется из title) |
| **description** | Rich Text | ✅ | Описание с форматированием HTML/Markdown |
| **category** | Enum | ✅ | Категория: programming, design, business, marketing, management, soft-skills, other |
| **level** | Enum | ✅ | Уровень: beginner, intermediate, advanced |
| **duration** | Integer | ✅ | Длительность в минутах |
| **instructor** | String | ✅ | Инструктор (ФИ или email) |

### API Endpoints:

```
GET    /api/courses             # Получить все курсы
GET    /api/courses/:id         # Получить курс по ID
POST   /api/courses             # Создать новый курс
PUT    /api/courses/:id         # Обновить курс
DELETE /api/courses/:id         # Удалить курс
POST   /api/courses/:id/publish # Опубликовать курс
```

## 📝 Пример запроса

### Создание курса:

```bash
curl -X POST http://localhost:1337/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Introduction to JavaScript",
      "description": "<p>Learn JavaScript basics and fundamentals</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 600,
      "instructor": "John Developer"
    }
  }'
```

### Получение курсов:

```bash
curl http://localhost:1337/api/courses
```

## 🔧 Если возникли проблемы

1. **Проверьте структуру:**
   ```bash
   dir src\api\course
   ```

2. **Очистите кэш Strapi:**
   ```bash
   rm -rf .strapi node_modules/.cache
   npm run dev
   ```

3. **Убедитесь, что БД работает:**
   - Проверьте `.env` переменные
   - Убедитесь что MySQL/PostgreSQL запущена

## 📚 Дальнейшие действия

После создания модели Course, рекомендуется:

1. ✅ Создать модели:
   - `Lesson` (уроки курса)
   - `Module` (модули курса)
   - `Enrollment` (регистрация студента на курс)
   - `User` (студенты и инструкторы)

2. ✅ Настроить:
   - Permissions & Roles
   - File Upload конфигурация
   - CORS для фронтенда
   - API Documentation (Swagger)

3. ✅ Добавить:
   - Валидация данных
   - Пользовательские эндпоинты
   - Логирование
   - Error handling
