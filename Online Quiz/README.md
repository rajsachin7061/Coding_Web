# Online Quiz

This project uses a MongoDB Atlas-backed API to store:
- User details
- Question bank data

MongoDB collections used:
- `users` collection for registered user detail and profile data
- `questions` collection for question bank data

## Project structure

- `frontend/` - React + Vite app
- `backend/` - Node API server + MongoDB models/routes

## MongoDB Atlas setup

1. Create a MongoDB Atlas cluster and database.
2. Copy env file:

```bash
cp backend/.env.example backend/.env
```

3. Update `backend/.env` with your Atlas connection string in `MONGODB_URI`.
4. Install dependencies:

```bash
npm install
```

5. Run backend server:

```bash
npm run start
```

6. Run frontend dev server (separate terminal):

```bash
npm run dev:frontend
```

## API endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/questions`
- `POST /api/questions`
- `DELETE /api/questions/:id`

## Notes

- IDs are MongoDB ObjectId strings.
- `email` is unique in users collection.
- Register/login now validate directly against MongoDB-backed APIs.
- Frontend syncs users and questions from API and keeps local storage only as fallback cache.

## GitHub deployment checklist

1. Keep `backend/.env` private (already ignored by `.gitignore`).
2. Commit `backend/.env.example` with placeholder values only.
3. Build frontend before deploy:

```bash
npm run build
```

4. Start production server:

```bash
npm run start
```
