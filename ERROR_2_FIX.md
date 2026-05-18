# ⚡ ОШИБКА 2 - ИСПРАВЛЕНИЕ

## ❌ Ошибка:
```
TypeError: Cannot read properties of undefined (reading 'kind')
at Object.isSingleType
```

## 🔍 Причина:
Course модель не была скопирована в правильное место (`src/api/course/`). Все файлы остались в папке `test`, и Strapi не может найти правильную структуру.

## ✅ РЕШЕНИЕ:

### Вариант 1: АВТОМАТИЧЕСКОЕ ИСПРАВЛЕНИЕ (Рекомендуется)

```bash
npm run fix-course
```

Затем:

```bash
npm run dev
```

**Что происходит:**
- ✓ Автоматически создаст правильную структуру `src/api/course/`
- ✓ Скопирует все файлы в правильные места
- ✓ Проверит что все в порядке
- ✓ Готово к запуску!

---

### Вариант 2: Ручное исправление (если автоматическое не сработало)

```bash
# 1. Запустите setup скрипт
npm run setup-course

# 2. Запустите Strapi
npm run dev
```

---

### Вариант 3: Если все еще ошибка

```bash
# 1. Полная очистка
rm -rf .strapi node_modules/.cache

# 2. Исправить структуру
npm run fix-course

# 3. Запустить
npm run dev
```

---

## 📊 ЧТО ДОЛЖНО ПОЛУЧИТЬСЯ:

После исправления в `src/api/` должны быть:

```
src/api/
├── course/                          ← НОВАЯ ПАПКА!
│   ├── content-types/
│   │   └── course/
│   │       └── schema.json
│   ├── controllers/
│   │   └── course.ts
│   ├── routes/
│   │   └── course.ts
│   └── services/
│       └── course.ts
└── test/                            ← СТАРАЯ (пример)
    ├── controllers/
    │   ├── test.ts
    │   └── course.ts (не используется)
    ├── routes/
    └── ...
```

**Важно:** `course.ts` файлы в папке `test` не удаляются - они не мешают.

---

## 🚀 ПОЛНЫЙ ПРОЦЕСС ИСПРАВЛЕНИЯ:

```bash
# Выполните эту одну команду:
npm run fix-course && npm run dev
```

**Готово!** Ошибка должна исчезнуть.

---

## ✅ Проверка:

После `npm run dev` вы должны увидеть:

```
⚠ To manage your project 🚀, go to http://localhost:1337/admin
✓ Server has started successfully
```

**БЕЗ ошибки про "reading 'kind'"**

---

## 💡 ДЛЯ СПРАВКИ:

- `npm run fix-course` - Автоисправление структуры
- `npm run setup-course` - Ручное создание структуры
- `npm run dev` - Запуск сервера

**Используйте `npm run fix-course` - это самый надежный способ!**
