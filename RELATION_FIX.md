# ✅ Ошибка отношений - ИСПРАВЛЕНА

## 🐛 Проблема

```
Error: Error on attribute user in model course-completion(...): 
inversedBy attribute courseCompletions not found target plugin::users-permissions.user
```

## 🔍 Причина

В Strapi когда создаете отношение `manyToOne` от одной коллекции к другой, вы можете указать:
- `inversedBy` - имя поля, которое будет на другой стороне отношения

**Проблема:** Мы попытались использовать `inversedBy: "courseCompletions"` на плагине `plugin::users-permissions.user`, но этот встроенный плагин не имеет поля `courseCompletions`.

## ✨ Решение

### Было:
```json
"user": {
  "type": "relation",
  "relation": "manyToOne",
  "target": "plugin::users-permissions.user",
  "inversedBy": "courseCompletions",    ← ❌ ОШИБКА
  "required": true
}
```

### Стало:
```json
"user": {
  "type": "relation",
  "relation": "manyToOne",
  "target": "plugin::users-permissions.user",
  "required": true
}
```

## 📝 Объяснение

- **Встроенные плагины** (plugin::users-permissions.user) не поддерживают обратные отношения
- **Пользовательские коллекции** (api::course.course) поддерживают полные двусторонние отношения

Поэтому:
1. ❌ Убрал `inversedBy` из отношения к User (встроенный плагин)
2. ✅ Оставил `inversedBy` в отношении к Course (наша коллекция)
3. ✅ Добавил обратное поле `completions` в Course через `mappedBy`

## 🔗 Итоговая структура отношений

```
User (plugin) ──── (manyToOne) ──── CourseCompletion
                   No inverse
                   (because User is a plugin)

Course (custom) ──── (oneToMany) ──── CourseCompletion
        ↓                               ↓
   completions               course (inversedBy)
   (mappedBy)
```

## ✅ Теперь работает!

Просто запустите:
```bash
npm run dev
```

Strapi должен загрузиться без ошибок!
