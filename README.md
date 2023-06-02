# Poké Team

## How to run the app

To run this app you need Docker installed on your system.

- Make sure you don't have any other running containers on ports `5432`, `3000` and `6379`.
- `cd` into the project's folder, and run `docker-compose up`.
- Open [http://localhost:3000](http://localhost:3000) with your browser.

## Caching mechanism

Results to be shown on the _List Teams_ page are cached using [Redis](https://redis.io).
After the query is run through PostgreSQL, the results are stored in Redis for future reference.
Every time a new team is created, the Redis entry containing the previously cached results is deleted.

## Author's notes

- Database credentials are read from a `.env` file. Normally, I would have excluded such file from source control, but considering this is an evaluation project, which has to be run on your side as well, I decided to add said file to source control.
- `src\helpers\db\dbHelper.ts` contains functions for performing data persistence operations. Normally, I would've modeled this after the **Repository pattern** (and I tried to at first), but Next.js 13 doesn't allow classes with async methods in a "use server" file (and when trying to use one, it raises an error specifying that _"Only async functions are allowed to be exported in a "use server" file"_).
- I didn't use an external library to implement the form to create a new team because for this specific task I considered it would have been a bit overkill. However, you can take a look at the [`employee-registration` repository](https://github.com/rudyzac/employee-registration) on my GitHub page, where I built a form using [React Hook Form](https://react-hook-form.com).
- In regards to the folder structure of the project, while colocating page folders with directories to accommodate other kinds of files (e.g. components, styles, etc) is definitely possible (because only the contents returned by `page.js` or `route.js` are publically addressable), I decided not to because personally I find it better to have routes inside `app` and everything else in same-level directories inside `src`.
