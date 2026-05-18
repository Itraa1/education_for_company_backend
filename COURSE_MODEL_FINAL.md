# 🎉 Course Model - Итоговая справка

**Дата:** 17 мая 2026  
**Статус:** Готово к установке ✅

---

## 📊 ЧТО БЫЛО СОЗДАНО

### 1. Схема данных (Schema)

**Файл:** `src/api/test/content-types/course-schema.json`

```json
{
  "collectionName": "courses",
  "attributes": {
    "title": { "type": "string", "required": true, "minLength": 3 },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "description": { "type": "richtext", "required": true },
    "category": { "type": "enumeration", "enum": [...] },
    "level": { "type": "enumeration", "enum": [...] },
    "duration": { "type": "integer", "required": true },
    "instructor": { "type": "string", "required": true }
  }
}
```

### 2. API Логика

**Файлы:**
- `src/api/test/controllers/course.ts` - HTTP handlers
- `src/api/test/routes/course.ts` - API routes
- `src/api/test/services/course.ts` - Business logic

### 3. Скрипты установки

**Созданные файлы:**
- ✅ `setup-course.js` - Node.js скрипт (основной)
- ✅ `setup_course_model.py` - Python скрипт (альтернатива)
- ✅ `setup-course-model.sh` - Bash скрипт (Linux/Mac)
- ✅ `setup-course-model.bat` - Batch скрипт (Windows)

### 4. Документация

- ✅ `README.md` - Главная документация проекта
- ✅ `QUICK_START.md` - Быстрый старт
- ✅ `COURSE_MODEL_SETUP.md` - Полная инструкция
- ✅ `COURSE_MODEL_FINAL.md` - Этот файл

### 5. Конфигурация

- ✅ `package.json` - обновлен с npm скриптами:
  - `npm run setup-course`
  - `npm run setup-models`

---

## 🚀 КАК ИСПОЛЬЗОВАТЬ

### Шаг 1: Установка модели

**ВЫПОЛНИТЕ ЭТО В КОМАНДНОЙ СТРОКЕ:**

```bash
cd e:\diploma\education_for_company_backend
npm run setup-course
```

**ИЛИ напрямую:**

```bash
node setup-course.js
```

**Результат:** Создастся новая папка `src/api/course/` с полной структурой.

### Шаг 2: Запуск сервера

```bash
npm run dev
```

**Ожидаемый вывод:**
```
⚠ To manage your project 🚀, go to http://localhost:1337/admin
⚠ To access the server ⚡, go to http://localhost:1337
✓ Server has started successfully
```

### Шаг 3: Проверка в админ панели

1. Откройте: **http://localhost:1337/admin**
2. Авторизуйтесь (если требуется)
3. В левом меню должна появиться **"Courses"**
4. Кликните и создайте тестовый курс

### Шаг 4: Тестирование API

```bash
# Получить все курсы
curl http://localhost:1337/api/courses

# Создать курс
curl -X POST http://localhost:1337/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "My First Course",
      "description": "<p>Course description</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 300,
      "instructor": "John Doe"
    }
  }'
```

---

## 📋 ПОЛЯ КУРСА

| Поле | Тип | Обязательно | Допустимые значения |
|------|-----|-----------|-------------------|
| **title** | string | ✅ | 3-255 символов |
| **slug** | uid | ✅ | auto (из title) |
| **description** | richtext | ✅ | HTML/Markdown |
| **category** | enum | ✅ | programming, design, business, marketing, management, soft-skills, other |
| **level** | enum | ✅ | beginner, intermediate, advanced |
| **duration** | integer | ✅ | > 0 (минуты) |
| **instructor** | string | ✅ | 1-255 символов |

---

## 📁 ФИНАЛЬНАЯ СТРУКТУРА

После выполнения `npm run setup-course`:

```
src/api/
├── course/
│   ├── content-types/
│   │   └── course/
│   │       └── schema.json           ← Определение модели
│   ├── controllers/
│   │   └── course.ts                  ← HTTP обработчики
│   ├── routes/
│   │   └── course.ts                  ← API маршруты
│   └── services/
│       └── course.ts                  ← Бизнес логика
└── test/
    └── [существующие файлы]
```

---

## 🔍 ПРОВЕРКА УСТАНОВКИ

### Команда для проверки структуры:

**Windows:**
```bash
dir src\api\course /s
```

**Linux/Mac:**
```bash
find src/api/course -type f
```

### Ожидаемый результат:
```
src/api/course/content-types/course/schema.json
src/api/course/controllers/course.ts
src/api/course/routes/course.ts
src/api/course/services/course.ts
```

---

## 🎯 API ENDPOINTS

После установки доступны:

```
GET    /api/courses                      # Получить все курсы (с пагинацией)
GET    /api/courses?filters[category][$eq]=programming  # Фильтр по категории
GET    /api/courses?sort=title:asc       # Сортировка
GET    /api/courses?populate=*           # Получить с relations
GET    /api/courses/1                    # Получить по ID
POST   /api/courses                      # Создать курс
PUT    /api/courses/1                    # Обновить курс
DELETE /api/courses/1                    # Удалить курс
POST   /api/courses/1/publish            # Опубликовать
```

---

## ⚙️ ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ

### Драфт и Публикация

Модель использует **Draft & Publish**:
- При создании курс в состоянии "draft"
- Нужно явно опубликовать чтобы он был видим
- Только опубликованные курсы видны в API по умолчанию

### Автоматические поля

Strapi автоматически добавляет:
- `id` - Уникальный идентификатор
- `createdAt` - Время создания
- `updatedAt` - Время обновления
- `publishedAt` - Время публикации

---

## 💡 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ

### Пример 1: Создать курс JavaScript

```bash
curl -X POST http://localhost:1337/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "JavaScript for Beginners",
      "description": "<h2>Learn JavaScript</h2><p>From basics to advanced</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 1200,
      "instructor": "Jane Smith"
    }
  }'
```

### Пример 2: Фильтр по категории

```bash
curl "http://localhost:1337/api/courses?filters[category][$eq]=programming"
```

### Пример 3: Получить с сортировкой

```bash
curl "http://localhost:1337/api/courses?sort=duration:desc&pagination[limit]=10"
```

---

## 🔧 ЕСЛИ ЧТО-ТО НЕ СРАБОТАЛО

### Проблема: "course модель не видна"

**Решение:**
1. Проверьте что выполнили `npm run setup-course`
2. Перезапустите dev сервер (Ctrl+C, затем `npm run dev`)
3. Очистите браузер кэш

### Проблема: Ошибка при создании курса

**Решение:**
1. Проверьте что все поля заполнены корректно
2. Проверьте логи в терминале
3. Убедитесь что категория и level соответствуют enum значениям

### Проблема: БД ошибка

**Решение:**
1. Проверьте .env файл
2. Убедитесь что БД запущена
3. Выполните: `npm run dev` снова

---

## ✅ ЧЕКЛИСТ ГОТОВНОСТИ

- [ ] Файлы созданы в `src/api/test/`
- [ ] Скрипт `setup-course.js` существует
- [ ] `package.json` содержит `npm run setup-course`
- [ ] Документация создана (README.md, QUICK_START.md, etc)
- [ ] **ВЫПОЛНЕН:** `npm run setup-course`
- [ ] **ЗАПУЩЕН:** `npm run dev`
- [ ] **ПРОВЕРЕНА:** админ панель на localhost:1337/admin
- [ ] **ПРОТЕСТИРОВАНА:** API с curl
- [ ] **ГОТОВО:** Модель использовать в фронтенде

---

## 📞 ПОДДЕРЖКА

Если возникли проблемы:

1. Проверьте документацию:
   - [QUICK_START.md](./QUICK_START.md)
   - [COURSE_MODEL_SETUP.md](./COURSE_MODEL_SETUP.md)

2. Проверьте логи Strapi в терминале

3. Документация Strapi: https://docs.strapi.io

---

## 🎊 ГОТОВО!

**Course модель готова к использованию!**

Все файлы созданы и документировано. Остается только:

```bash
npm run setup-course   # Установить модель
npm run dev            # Запустить сервер
```

После этого модель будет полностью функциональна и готова к использованию.

**Успехов! 🚀**
