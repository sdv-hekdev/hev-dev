# sdv-project-pro

## Sup de Vinci 2021/2022

### **.env**

```
PORT=
DB_CLIENT=
DB_USER=
DB_DATABASE=
JWT_SECRET=
WEB_APP_BASE_URL=
NEXT_PUBLIC_API_BASE_URL=

STRIPE_API_KEY_TEST=
STRIPE_API_KEY_LIVE=
```

### ** Install project**

```
npm install
```

or

```
npm i
```

### ** Create migration**

```
npx knex migration:latest
```

### ** Create fake data**

```
npx knex seed:run
```

### ** Run project**

```
npm run dev
npm run serve
```
