# Poké Team

## How to run the app

To run this app you need Docker installed on your system.

- Make sure you don't have any other running containers on ports `5432`, `3000` and `6379`.
- `cd` into the project's folder, and run `docker-compose up`.
- Open [http://localhost:3000](http://localhost:3000) with your browser.

## Caching mechanism

Results to be shown on the _List Teams_ page are cached using Redis.
After the query is run through PostgreSQL, the results are stored in Redis for future reference.
Every time a new team is created, the Redis entry containing the previously cached results is deleted.

## Author's notes

- Database credentials are read from a `.env` file. Normally, I would have excluded such file from source control, but considering this is an evaluation project, which has to be run on your side as well, I decided to add said file to source control.
- `src\helpers\db\dbHelper.ts` contains functions for performing data persistence operations. Normally, I would've modeled this after the **Repository pattern** (and I tried to at first), but Next.js 13 doesn't allow classes with async methods in a "use server" file (and when trying to use one, it raises an error specifying that _"Only async functions are allowed to be exported in a "use server" file"_).
