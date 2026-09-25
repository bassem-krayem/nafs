# Nafs

A REST API for an online therapy platform, connecting people seeking
consultations with psychotherapists.

> **Status: work in progress.** The authentication and profile layers are
> implemented. Session booking and therapist availability are not built yet.
> This repository is an active scaffold, not a finished product.

## Why this exists

I started Nafs as a graduation project. The domain interested me because
scheduling against a therapist's availability is a genuinely harder problem
than CRUD, and because users are not interchangeable: a therapist and a
patient need different data, different validation, and different permissions
behind the same endpoints.

## Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js, Express |
| Database | PostgreSQL via Sequelize |
| Auth | JSON Web Tokens, bcryptjs |
| Validation | Joi |
| Views | EJS |
| Tests | Mocha, Chai, Supertest |
| Tooling | ESLint (Airbnb config), Prettier |

## What is implemented

- **Signup and login** with hashed passwords and JWT issuance
- **Role-aware profile completion.** One endpoint serves both roles: a
  middleware reads `req.user.role` and selects the matching Joi schema, so
  therapists and patients are validated differently without duplicating the
  route.
- **Centralised error handling.** An `AppError` class plus a `catchAsync`
  wrapper means controllers contain no try/catch blocks; rejected promises
  are forwarded to one error controller.
- **Three Sequelize models** — `User`, `Therapist`, `Patient` — with the two
  profile tables hanging off the shared user record.

## Not implemented yet

- Therapist availability windows
- Session booking and scheduling
- Password update (the route exists but the handler is a stub)
- Meaningful test coverage (one test at present)

## Running it

```bash
npm install
cp .env.example .env    # fill in your database and JWT values
npm run start:dev
```

Lint and test:

```bash
npm run lintall
npm test
```

## Structure

```
src/
  config/        database connection
  controllers/   auth, user, error handling
  middlewares/   Joi validation, role-based schema selection
  models/        User, Therapist, Patient
  routes/        user routes
  utils/         AppError, catchAsync
  validations/   Joi schemas
```

## Notes

Built and maintained by [Bassem Krayem](https://bassem-krayem.dev).
