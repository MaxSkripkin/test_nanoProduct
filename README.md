# Тестовое задание Node.js Backend Developer

Необходимо реализовать сервис с API для записи человека на прием к врачу, и напоминанием за 2 часа до приема

В БД можно сделать следующие коллекции

### Users

```js
{
    id: 'uuid',
    phone: '+7 926 578 85 14',
    name: 'Вася',
    ...anything
}
```

### Doctors

```js
{
    id: 'uuid',
    name: 'Болодя',
    spec: 'Терапевт',
    // Свободные слоты для записи (можно сделать массив объектов, либо просто DateTime)
    slots: ['date_time', 'date_time'],
    ...anything
}
```
API метод для записи человека на прием, на вход отдаем

1. ID Пользователя
2. ID Доктора
3. Слот на который хотим записаться

```js
{
    user_id: 'askd90pajsdpojas',    
    doctor_id: 'a987astgydioaushd9a0sdhy',
    slot: 'date_time',
    ...anything
}
```

Требования

- На один слот может записаться только один человек
- При попытке записаться на невозможное время будет возвращаться ошибка

## Сервис оповещений

Также нужен сервис который будет оповещать пользователя:

- за 1 день до приема
- за 2 часа до приема

Сам сервис пусть просто логирует сообщения в .log файл:

```log
{{ current_date }} | Привет {{ user.name }}! Напоминаем что вы записаны к {{ doctor.spec }} завтра в {{ slot.time }}!
{{ current_date }} | Привет {{ user.name }}! Вам через 2 часа к {{ doctor.spec }} в {{ slot.time }}!
```

## Cтэк

- ExpressJS
- Typescript
- Mongodb
- Mongoose


В файле server.ts в константу MONGODB_URI вписать адрес вашей базы даных
