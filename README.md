# DGTA Academic Management — REST API

NestJS REST API for an academic management platform built for DGTA-system educational institutions in México. Developed as my engineering thesis at Instituto Tecnológico Superior de El Mante: **"Sistema Web para la Optimización de la Gestión Académica en Instituciones Educativas del Sistema DGTA"**.

The companion frontend lives in [`web-dgeta`](https://github.com/JiovannyVega/web-dgeta), and a GraphQL version of the API in [`dgeta-graph-api`](https://github.com/JiovannyVega/dgeta-graph-api).

## What it does

Centralizes the day-to-day academic operations of a school:

- **Students, teachers & family members** — profiles, personal information, role-based access
- **Groups, subjects & specialties** — group-subject assignments per grade
- **Attendance** — per-class attendance tracking
- **Questionnaires** — question banks, student submissions, and result reporting
- **Messaging** — internal communication between students and teachers
- **Geographic catalogs** — states and municipalities for enrollment data

## Architecture

Modular monolith with 20 feature modules under `src/modules/`, each following the NestJS controller → service → entity pattern with DTO validation.

| Concern | Implementation |
| --- | --- |
| Framework | NestJS 11 (Express platform) |
| ORM | MikroORM with MySQL driver |
| Auth | JWT via Passport (`passport-jwt`), bcrypt password hashing |
| Validation | `class-validator` + `class-transformer` DTOs |
| Config | `@nestjs/config` with `.env` |

## Getting started

```bash
pnpm install
cp .env.example .env   # configure MySQL connection + JWT secret
pnpm run start:dev
```

## Tech stack

NestJS · TypeScript · MikroORM · MySQL · Passport JWT · class-validator

---

Built with Scrum across the thesis development cycle. Part of a three-repo system: REST API (this repo) · [GraphQL API](https://github.com/JiovannyVega/dgeta-graph-api) · [React frontend](https://github.com/JiovannyVega/web-dgeta).
