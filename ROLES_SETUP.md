# 🔐 Roles & Permissions Setup Guide

## 📋 Обзор

Этот гайд описывает как установить:
1. **Роль "Author"** (Автор) - может создавать курсы
2. **Роль "Admin"** (Администратор) - полный доступ
3. **Модель "CourseCompletion"** - отслеживание прохождения курсов

---

## 🚀 Быстрая установка

### Шаг 1: Установить модель отслеживания прохождения

```bash
npm run setup-completion
npm run dev
```

### Шаг 2: Создать роли

В админ панели:
1. Откройте: http://localhost:1337/admin
2. Settings → Users & Permissions → Roles
3. Создайте роли по инструкции ниже

### Шаг 3: Готово!

После создания ролей система будет полностью функциональна.

---

## 🔐 Роль "Author" (Автор)

### Основная информация
- **Название:** Author
- **Описание:** Can create and manage their own courses
- **Тип:** Regular role

### Разрешения для Author

```
Courses (api::course.course):
  ✓ create    - Создавать новые курсы
  ✓ read      - Просматривать все курсы
  ✓ update    - Обновлять свои курсы (middleware)

Course Completions (api::course-completion.course-completion):
  ✓ create    - Создавать записи о прохождении
  ✓ read      - Просматривать все прохождения

Users (plugin::users-permissions.user):
  ✓ read      - Просматривать профили пользователей
```

### Что может делать Author:
- ✅ Создавать новые курсы
- ✅ Редактировать свои курсы
- ✅ Просматривать список курсов
- ✅ Видеть кто прошел их курсы
- ❌ Удалять курсы
- ❌ Редактировать чужие курсы
- ❌ Управлять пользователями

---

## 🔧 Роль "Admin" (Администратор)

### Основная информация
- **Название:** Admin
- **Описание:** Full system administrator with all permissions
- **Тип:** Admin role

### Разрешения для Admin

```
Courses (api::course.course):
  ✓ create    - Создавать курсы
  ✓ read      - Читать все курсы
  ✓ update    - Обновлять любые курсы
  ✓ delete    - Удалять курсы

Course Completions (api::course-completion.course-completion):
  ✓ create    - Создавать записи
  ✓ read      - Читать записи
  ✓ update    - Обновлять записи
  ✓ delete    - Удалять записи

Users (plugin::users-permissions.user):
  ✓ create    - Создавать пользователей
  ✓ read      - Читать пользователей
  ✓ update    - Обновлять пользователей
  ✓ delete    - Удалять пользователей

Roles (plugin::users-permissions.role):
  ✓ create    - Создавать роли
  ✓ read      - Читать роли
  ✓ update    - Обновлять роли
  ✓ delete    - Удалять роли
```

### Что может делать Admin:
- ✅ Все что может Author
- ✅ Удалять любые курсы
- ✅ Редактировать любые курсы
- ✅ Управлять всеми пользователями
- ✅ Создавать/редактировать роли
- ✅ Просматривать все данные системы

---

## 📊 Модель "Course Completion" (Прохождение курса)

### Структура данных

```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "course": {
    "id": 1,
    "title": "JavaScript Basics",
    "slug": "javascript-basics"
  },
  "progress": 75,
  "completedAt": "2026-05-17T23:00:00Z",
  "notes": "Great course, learned a lot!",
  "createdAt": "2026-05-17T20:00:00Z",
  "updatedAt": "2026-05-17T23:00:00Z"
}
```

### Поля

| Поле | Тип | Описание |
|------|-----|---------|
| **user** | Relation | Пользователь, прошедший курс (обязательно) |
| **course** | Relation | Курс, который был пройден (обязательно) |
| **progress** | Integer | Прогресс 0-100% (по умолчанию 0) |
| **completedAt** | DateTime | Когда курс был завершен |
| **notes** | Text | Заметки пользователя о курсе |

### Связи

```
User (1) ─ hasMany ─ CourseCompletion (Many)
Course (1) ─ hasMany ─ CourseCompletion (Many)
```

---

## 🛠️ Как создать роли в админ панели

### Создание роли Author:

1. **Откройте админ панель:**
   ```
   http://localhost:1337/admin
   ```

2. **Перейдите в Settings:**
   ```
   Settings → Users & Permissions → Roles
   ```

3. **Нажмите "Create new role"**

4. **Заполните основную информацию:**
   - Name: `Author`
   - Description: `Can create and manage their own courses`

5. **Установите разрешения (Permissions):**

   **Courses section:**
   - [x] api::course.course - create
   - [x] api::course.course - read
   - [x] api::course.course - update

   **Course Completions section:**
   - [x] api::course-completion.course-completion - create
   - [x] api::course-completion.course-completion - read

   **Users section:**
   - [x] plugin::users-permissions.user - read

6. **Нажмите "Save"**

### Создание роли Admin:

Повторите те же шаги, но:
- Name: `Admin`
- Description: `Full system administrator with all permissions`
- **Установите ВСЕ разрешения** (или выберите в каждой секции все checkboxes)

---

## 🔗 API Endpoints

### Создание курса (только Author или Admin)

```bash
curl -X POST http://localhost:1337/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "data": {
      "title": "My New Course",
      "description": "<p>Course description</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 600,
      "instructor": "John Doe"
    }
  }'
```

**Ответ:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "My New Course",
      "slug": "my-new-course",
      ...
    }
  }
}
```

### Отслеживание прохождения курса

```bash
curl -X POST http://localhost:1337/api/course-completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "data": {
      "user": 1,
      "course": 1,
      "progress": 75,
      "completedAt": "2026-05-17T23:00:00Z",
      "notes": "Great course!"
    }
  }'
```

### Получить прохождения курса (фильтр по пользователю)

```bash
curl "http://localhost:1337/api/course-completions?filters[user][id][$eq]=1&populate=*" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Получить прохождения конкретного курса

```bash
curl "http://localhost:1337/api/course-completions?filters[course][id][$eq]=1&populate=user" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Обновить прогресс

```bash
curl -X PUT http://localhost:1337/api/course-completions/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "data": {
      "progress": 100,
      "completedAt": "2026-05-17T23:30:00Z"
    }
  }'
```

---

## 🔐 Безопасность и ограничения

### Важно!

1. **Author не может удалять курсы** - только Admin
2. **Author не может редактировать чужие курсы** - нужна проверка в middleware
3. **Только Owner может обновлять свои данные** - нужно добавить поле `author` в Course

### Рекомендуемые улучшения

1. **Добавить поле "author" в Course:**
   ```json
   {
     "author": {
       "type": "relation",
       "relation": "manyToOne",
       "target": "plugin::users-permissions.user"
     }
   }
   ```

2. **Добавить middleware для проверки прав:**
   ```javascript
   // Only allow Author to update their own courses
   if (user.role.name === 'Author' && course.author.id !== user.id) {
     throw new ForbiddenError();
   }
   ```

3. **Сделать Course автоматически назначаемым текущему пользователю:**
   ```javascript
   // Автоматически назначить автора при создании
   data.author = ctx.state.user.id;
   ```

---

## 📋 Чек-лист установки

- [ ] Запустить `npm run setup-completion`
- [ ] Запустить `npm run dev`
- [ ] Зайти в админ панель
- [ ] Создать роль "Author" с разрешениями
- [ ] Создать роль "Admin" с разрешениями
- [ ] Создать тестового пользователя с ролью Author
- [ ] Создать тестового пользователя с ролью Admin
- [ ] Протестировать создание курса с Author
- [ ] Протестировать отслеживание прохождения
- [ ] Проверить что только Author и Admin могут создавать

---

## 🧪 Тестирование

### Создать тестовых пользователей:

1. **Author пользователь:**
   - Username: author1
   - Email: author1@example.com
   - Роль: Author

2. **Admin пользователь:**
   - Username: admin1
   - Email: admin1@example.com
   - Роль: Admin

3. **Student пользователь:**
   - Username: student1
   - Email: student1@example.com
   - Роль: Authenticated (по умолчанию)

### Тесты:

```bash
# 1. Вход как Author
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"author1@example.com","password":"password"}'

# 2. Создать курс (должно сработать)
# Использовать token автора...

# 3. Вход как Student
# Попытаться создать курс (должна ошибка 403)
```

---

## 📚 Дополнительные ресурсы

- [Strapi Roles Documentation](https://docs.strapi.io/user-docs/users-roles-permissions/introduction)
- [Users-Permissions Plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions)
- [API Permissions](https://docs.strapi.io/dev-docs/guides/is-permitted)

---

## ✅ Готово!

После выполнения всех шагов у вас будет:
- ✅ Роль Author для создания курсов
- ✅ Роль Admin для управления системой
- ✅ Модель CourseCompletion для отслеживания
- ✅ Функциональная система управления доступом
