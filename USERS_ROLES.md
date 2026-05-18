# 👥 Роли пользователей в Strapi

## 📋 Текущая конфигурация

**Плагин:** `@strapi/plugin-users-permissions@5.36.0`

Этот плагин предоставляет встроенную систему управления пользователями и ролями.

---

## 🎯 Стандартные роли (по умолчанию)

### 1. **Authenticated** 🔐
- **Назначение:** Зарегистрированные пользователи
- **Права:** Могут создавать/читать контент в зависимости от прав
- **Примеры:** Студенты, преподаватели

### 2. **Public** 🌐
- **Назначение:** Неавторизованные пользователи
- **Права:** Только чтение публичного контента
- **Примеры:** Посетители сайта, гости

---

## 🔑 Рекомендуемые роли для платформы обучения

Для вашей платформы Education For Company рекомендую создать:

### 1. **Student** (Студент)
- Может просматривать курсы
- Может регистрироваться на курсы
- Может просматривать свои оценки
- **Разрешения:**
  - `courses:read` (просмотр)
  - `lessons:read` (просмотр уроков)
  - `enrollments:create` (регистрация)
  - `enrollments:read` (свои регистрации)

### 2. **Instructor** (Инструктор/Преподаватель)
- Может создавать курсы
- Может редактировать свои курсы
- Может просматривать студентов
- Может выставлять оценки
- **Разрешения:**
  - `courses:create`
  - `courses:update`
  - `courses:read`
  - `lessons:create`
  - `lessons:update`
  - `enrollments:read`

### 3. **Manager** (Менеджер контента)
- Может модерировать курсы
- Может управлять категориями
- Может удалять контент
- **Разрешения:**
  - Все как у Instructor
  - `courses:delete`
  - `lessons:delete`
  - `users:read`

### 4. **Admin** (Администратор)
- Полный доступ к системе
- Управление пользователями
- Управление ролями
- **Разрешения:**
  - Полные права на все операции

---

## 🔐 Система разрешений (Permissions)

Strapi использует систему разрешений на основе действий:

### Типы действий:
```
create    - Создание записей
read      - Чтение/Просмотр
update    - Обновление
delete    - Удаление
```

### Примеры разрешений:
```
api::course.course:create        - Создать курс
api::course.course:read          - Просмотреть курс
api::course.course:update        - Обновить курс
api::course.course:delete        - Удалить курс
api::lesson.lesson:create        - Создать урок
api::enrollment.enrollment:read  - Просмотреть регистрацию
```

---

## 🛠️ Как работают роли и разрешения

1. **Роль** = набор разрешений
2. **Пользователь** = имеет одну или несколько ролей
3. **Разрешение** = действие над конкретной коллекцией

### Пример:
```
Пользователь (Ivan)
  └── Роли
      ├── Student
      │   ├── courses:read
      │   ├── enrollments:create
      │   └── enrollments:read
      └── Instructor
          ├── courses:create
          ├── courses:update
          └── lessons:create
```

---

## 📊 Структура данных Users-Permissions

### Таблицы в БД:
```
users-permissions_role          - Роли
users-permissions_permission    - Разрешения
users-permissions_user          - Пользователи
users-permissions_users_role    - Связь пользователь-роль
```

### Структура User:
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "provider": "local",
  "password": "hashed_password",
  "resetPasswordToken": null,
  "confirmationToken": null,
  "confirmed": true,
  "blocked": false,
  "createdAt": "2026-05-17T...",
  "updatedAt": "2026-05-17T...",
  "roles": [
    {
      "id": 2,
      "name": "Authenticated",
      "description": "Default role given to authenticated user."
    }
  ]
}
```

---

## 🚀 API Endpoints для управления пользователями

### Аутентификация:
```
POST   /api/auth/local              - Регистрация
POST   /api/auth/local              - Вход
GET    /api/users/me                - Текущий пользователь
POST   /api/auth/logout             - Выход
```

### Управление пользователями (только админ):
```
GET    /api/users                   - Получить всех пользователей
GET    /api/users/:id               - Получить пользователя
POST   /api/users                   - Создать пользователя
PUT    /api/users/:id               - Обновить пользователя
DELETE /api/users/:id               - Удалить пользователя
```

### Управление ролями (только админ):
```
GET    /api/users-permissions/roles                  - Получить роли
POST   /api/users-permissions/roles                  - Создать роль
GET    /api/users-permissions/roles/:id              - Получить роль
PUT    /api/users-permissions/roles/:id              - Обновить роль
DELETE /api/users-permissions/roles/:id              - Удалить роль
GET    /api/users-permissions/roles/:id/permissions - Разрешения роли
```

---

## 📝 Примеры API запросов

### 1. Регистрация (Public)
```bash
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### 2. Вход (Public)
```bash
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### 3. Получить текущего пользователя
```bash
curl http://localhost:1337/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Создать пользователя с ролью (Admin только)
```bash
curl -X POST http://localhost:1337/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "username": "student1",
    "email": "student1@example.com",
    "password": "Password123!",
    "confirmed": true,
    "role": 2
  }'
```

---

## 🔐 JWT Token

После успешной авторизации получите JWT token:

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": {
      "id": 2,
      "name": "Authenticated"
    }
  }
}
```

Используйте token в заголовке:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## ⚙️ Конфигурация

### Файл конфигурации (если создавать):
```typescript
// config/plugins.ts
const config = ({ env }: Core.Config.Shared.ConfigParams) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'your-secret-key'),
      // Другие настройки...
    },
  },
});
```

**Примечание:** В вашем проекте используется конфигурация по умолчанию.

---

## 📚 Текущий статус в проекте

✅ **Установлен:** `@strapi/plugin-users-permissions@5.36.0`  
✅ **По умолчанию:** Роли "Authenticated" и "Public"  
⏳ **Требуется создать:** Custom роли для платформы обучения  

---

## 🎯 Рекомендуемые действия

1. **Создать роли в админ панели:**
   - Student
   - Instructor
   - Manager
   - Admin

2. **Установить разрешения для каждой роли**

3. **Создать пользователей с нужными ролями**

4. **Настроить middleware для проверки прав**

---

## 💡 Полезные ссылки

- [Strapi Users-Permissions Docs](https://docs.strapi.io/dev-docs/plugins/users-permissions)
- [JWT в Strapi](https://docs.strapi.io/dev-docs/plugins/users-permissions#jwt-configuration)
- [Управление ролями](https://docs.strapi.io/user-docs/users-roles-permissions)
