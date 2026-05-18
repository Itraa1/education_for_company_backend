# ⚡ БЫСТРЫЙ СТАРТ: Модель Course для Strapi

## 📍 Текущее состояние

Все файлы для модели Course **уже созданы**! 

```
✅ src/api/test/content-types/course-schema.json  - Определение структуры
✅ src/api/test/controllers/course.ts             - Контроллер
✅ src/api/test/routes/course.ts                  - Роутер
✅ src/api/test/services/course.ts                - Сервис
✅ setup-course.js                                 - Автоматизация
```

## 🚀 ВЫПОЛНИТЕ ТРИ ШАГА:

### Шаг 1: Установите файлы модели

**В терминале (из корня проекта):**

```bash
npm run setup-course
```

Или альтернативно:

```bash
node setup-course.js
```

**Что произойдет:**
- Создастся директория `src/api/course/`
- Скопируются все файлы в правильную структуру
- Модель будет готова к использованию

### Шаг 2: Запустите Strapi

```bash
npm run dev
```

Strapi автоматически:
- Обновит БД
- Создаст таблицу `courses`
- Добавит Collection Type в админ панель

### Шаг 3: Проверьте в админ панели

1. Откройте: **http://localhost:1337/admin**
2. В левом меню найдите **"Courses"**
3. Кликните **"Create new entry"**
4. Заполните форму и сохраните

## 📊 Готовые API эндпоинты

После выполнения шагов используйте:

```bash
# Получить все курсы
curl http://localhost:1337/api/courses

# Создать новый курс
curl -X POST http://localhost:1337/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "JavaScript Basics",
      "description": "<p>Learn JS</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 600,
      "instructor": "John Doe"
    }
  }'

# Получить один курс
curl http://localhost:1337/api/courses/1

# Обновить курс
curl -X PUT http://localhost:1337/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"data": {"title": "Updated Title"}}'

# Удалить курс
curl -X DELETE http://localhost:1337/api/courses/1
```

## 📋 Поля курса

| Поле | Тип | Описание |
|------|-----|---------|
| title | String | Название курса |
| slug | UID | Автоматический URL ID |
| description | Rich Text | Описание с HTML |
| category | Enum | programming, design, business, marketing, management, soft-skills, other |
| level | Enum | beginner, intermediate, advanced |
| duration | Integer | Длительность в минутах |
| instructor | String | Инструктор (ФИ/email) |

## ⚠️ Если что-то не сработало

### Ошибка: "Permission denied" при запуске npm скрипта

```bash
# На Windows используйте:
node setup-course.js

# На macOS/Linux используйте:
chmod +x setup-course.js
./setup-course.js
```

### Ошибка: "Модель не видна в админ панели"

1. Перезапустите dev сервер:
   ```bash
   # Ctrl+C чтобы остановить
   npm run dev
   ```

2. Проверьте структуру папок:
   ```bash
   ls -la src/api/course/
   ```

3. Очистите кэш:
   ```bash
   rm -rf .strapi node_modules/.cache
   npm run dev
   ```

### Ошибка: "Database error"

1. Проверьте `.env` файл:
   - `DATABASE_CLIENT` установлен правильно
   - Учетные данные БД верны

2. Проверьте подключение к БД:
   ```bash
   # Для SQLite (default)
   ls -la .tmp/data.db

   # Для MySQL
   mysql -h localhost -u strapi -p strapi -e "SHOW TABLES;"
   ```

## ✨ После готовности Course модели

Рекомендуемые следующие действия:

1. **Создать связанные модели:**
   - `Lesson` - Уроки в курсе
   - `Module` - Модули курса
   - `Enrollment` - Регистрация студентов

2. **Настроить безопасность:**
   - Roles & Permissions
   - API Token управление
   - CORS конфигурация

3. **Добавить функциональность:**
   - Загрузку видео
   - Систему оценок
   - Уведомления студентам

## 📚 Полная документация

详подробная информация в файле: **COURSE_MODEL_SETUP.md**

---

**Статус: 🟡 В процессе**
- ✅ Файлы созданы
- ⏳ Ожидание запуска `npm run setup-course`
