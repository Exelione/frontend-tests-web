# Frontend Questions

> Веб-приложение для проверки знаний по фронтенду — React, TypeScript, JavaScript, HTML, CSS.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/license-UNLICENSED-red)]()

---

## 📖 О проекте

**Frontend Questions** — квиз-платформа для проверки знаний по фронтенд-технологиям.

- **Пользователи** отвечают на вопросы с 4 вариантами ответа (1 правильный).
- **Сразу видят** правильный ответ, статистику и объяснение.
- **Авторизованные** не получают вопросы, на которые уже отвечали.
- **Админы** создают вопросы через отдельную панель.

---

## 🔗 Демо

| | |
|---|---|
| **Приложение** | [frontend-tests-web.relaxdev.ru](https://frontend-tests-web.relaxdev.ru) |
| **Swagger UI (API)** | [frontend-tests-api.relaxdev.ru/api](https://frontend-tests-api.relaxdev.ru/api) |
| **API Base URL** | `https://frontend-tests-api.relaxdev.ru` |

---

## 🏗️ Архитектура
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│ │ HTTPS │ │ Prisma │ │
│ Frontend (SPA) │ ──────> │ Backend (REST) │ ──────> │ PostgreSQL │
│ React + Vite │ │ NestJS + Prisma │ │ Supabase │
│ │ │ │ │ │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
RelaxDev RelaxDev Supabase
(Docker + SSL) (Docker + SSL) (Free tier)

---

## 🛠️ Стек

### Фронтенд
- **React 19** + **Vite**
- **TypeScript**
- **SCSS-модули** (без Tailwind)
- **React Router v7** — роутинг
- **TanStack Query v5** — работа с API
- **@marsidev/react-turnstile** — капча
- **FSD-архитектура** (Feature-Sliced Design)

### Бэкенд
- **NestJS 12** — фреймворк
- **TypeScript 5+** — язык (ESM)
- **Prisma 7.2** — ORM (driver adapter `PrismaPg`)
- **PostgreSQL** (Supabase) — база данных
- **@nestjs/jwt** — JWT без Passport
- **bcrypt** — хеширование паролей
- **class-validator** — валидация DTO
- **Cloudflare Turnstile** — капча
- **Swagger** — документация API

### Инфраструктура
- **Supabase** — managed PostgreSQL (Free tier)
- **RelaxDev** — деплой (Docker + Traefik)
- **GitHub** — версионирование

---

## ✨ Возможности

### Пользователь
- ✅ **Регистрация** с капчей Cloudflare Turnstile
- ✅ **Логин** через JWT
- ✅ **Прохождение квиза** — вопросы с 4 вариантами ответа
- ✅ **Мгновенная обратная связь** — правильный/неправильный ответ
- ✅ **Статистика** — сколько человек выбрали каждый вариант
- ✅ **Объяснение** правильного ответа
- ✅ **Выбор категории** (для авторизованных)
- ✅ **Персональная статистика** — прогресс по категориям, последние ответы

### Админ
- ✅ **Создание вопросов** через панель
- ✅ **Валидация** — ровно 4 ответа, ровно 1 правильный
- ✅ **Объяснения** к вопросам
- ✅ **Управление** категориями

