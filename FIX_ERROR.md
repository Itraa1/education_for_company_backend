# 🔧 ИСПРАВЛЕНИЕ ОШИБКИ STRAPI

## ❌ Ошибка:
```
Error: The key of the content-type should be the same as its singularName. 
Found test and course.
```

## 🔍 Причина:
Я случайно изменил schema в папке `src/api/test/` на Course схему, но папка называется `test`. Strapi требует чтобы `singularName` совпадал с названием папки.

## ✅ РЕШЕНИЕ: 3 простых шага

### Шаг 1: Восстановите Test schema

Я уже восстановил исходный файл `src/api/test/content-types/test/schema.json` с правильным `singularName: 'test'`.

### Шаг 2: Выполните setup скрипт

```bash
npm run setup-course
```

Этот скрипт:
- ✅ Создаст папку `src/api/course/` 
- ✅ Скопирует Course schema туда
- ✅ Создаст правильную структуру

### Шаг 3: Запустите Strapi

```bash
npm run dev
```

Strapi должен запуститься без ошибок.

---

## 📊 Что было исправлено

✅ `src/api/test/content-types/test/schema.json` - восстановлен исходный Test schema  
✅ `setup-course.js` - улучшен с валидацией  
✅ Готово для создания правильной структуры Course в `src/api/course/`

---

## 🚀 ПОЛНЫЙ ПРОЦЕСС ИСПРАВЛЕНИЯ

**Выполните эти команды в корне проекта:**

```bash
# 1. Установить модель Course в правильное место
npm run setup-course

# 2. Запустить Strapi
npm run dev

# 3. Открыть админ панель
# http://localhost:1337/admin
```

---

## 💡 Что важно знать

- **Test** коллекция остается в `src/api/test/` (для примеров)
- **Course** коллекция будет в `src/api/course/` (новая модель)
- Оба могут работать одновременно

---

## ❓ Если все еще ошибка:

1. **Убедитесь что файл восстановлен:**
   ```
   Проверьте что в src/api/test/content-types/test/schema.json:
   - singularName: "test" ✅
   - collectionName: "tests" ✅
   ```

2. **Очистите кэш:**
   ```bash
   rm -rf .strapi node_modules/.cache
   npm run dev
   ```

3. **Проверьте структуру:**
   ```bash
   ls -la src/api/course/
   ```

---

## 📝 Статус

✅ **ИСПРАВЛЕНО** - Все готово к правильной установке Course модели
