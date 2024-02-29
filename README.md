# users_micro_service

## Description

a microserivce to be used in microserivce architecture for authorization, authentication & user actions.

## Scripts

```json

  "start": "node server.js | pino-pretty",
  "dev": "nodemon server.js | pino-pretty",
  "migrate:up": "npx sequelize-cli db:migrate",
  "migrate:down": "npx sequelize-cli db:migrate:undo:all",
  "seed:up": "npx sequelize-cli db:seed:all",
  "seed:down": "npx sequelize-cli db:seed:undo:all",
  "db:roll": "npm run migrate:up && npm run seed:up",
  "db:rebuild": "npm run migrate:down && npm run migrate:up && npm run seed:up"

```

## Technolgies

| Name               | Version   | Type        |
| ------------------ | --------- | ----------- |
| @fastify/autoload  | `^5.8.0`  | prduction   |
| @fastify/cors      | `^8.4.0`  | prduction   |
| @fastify/formbody  | `^7.4.0`  | prduction   |
| @fastify/jwt       | `^7.2.2`  | prduction   |
| @fastify/multipart | `^8.0.0`  | prduction   |
| @fastify/redis     | `^6.1.1`  | prduction   |
| @fastify/static    | `^6.11.2` | prduction   |
| crypto             | `^1.0.1`  | prduction   |
| dotenv             | `^16.3.1` | prduction   |
| fastify            | `^4.24.3` | prduction   |
| fastify-multer     | `^2.0.3`  | prduction   |
| moment             | `^2.29.4` | prduction   |
| mysql2             | `^3.6.2`  | prduction   |
| sequelize          | `^6.33.0` | prduction   |
| sharp              | `^0.33.2` | prduction   |
| socket.io          | `^4.7.4`  | prduction   |
| nodemon"           | `3.0.1`   | development |
| sequelize-cli"     | `6.6.1`   | development |

## Routes

- Every Router has a Controller to Manage the Request Functions

### Activation `"/api/active"`

| Name  | Method | Description                                           |
| ----- | ------ | ----------------------------------------------------- |
| `"/"` | `PUT`  | activation for Users (excluding normal type of users) |

### Authentication `"/api/auth"`

| Name          | Method | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `"/login"`    | `POST` | Logging Users (All Types to the System)            |
| `"/register"` | `POST` | Registering Users to the System (Normal type Only) |

### Authorization `"/api/verfiy"`

| Name  | Method | Description                                             |
| ----- | ------ | ------------------------------------------------------- |
| `"/"` | `GET`  | using The authenticate Plugin to authorize users tokens |

### Meta `"/api/meta"`

| Name           | Method | Description                                  |
| -------------- | ------ | -------------------------------------------- |
| `"/"`          | `GET`  | Fetching Home page                           |
| `"/countries"` | `GET`  | Fetching Countries Available for the System  |
| `"/types"`     | `GET`  | Fetching Role Types Available for the System |

### OTP `"/api/otp"`

| Name         | Method | Description                                         |
| ------------ | ------ | --------------------------------------------------- |
| `"/request"` | `POST` | using otp Genrator to genrate & save otp in redis   |
| `"/verfiy"`  | `POST` | Verfiying Incoming OTP from the saved ones in redis |

### OTP `"/api/password"`

| Name        | Method | Description                                                                               |
| ----------- | ------ | ----------------------------------------------------------------------------------------- |
| `"/update"` | `PUT`  | responsible to update Passwords for users                                                 |
| `"/reset"`  | `PUT`  | Lies on the OTP Verfiy which responed with Encrypted ID to be usee here for reset Process |

### Profile `"/api/profile"`

| Name         | Method | Description                         |
| ------------ | ------ | ----------------------------------- |
| `"/update"`  | `PUT`  | responsible to update Users Info    |
| `"/country"` | `PUT`  | responsible to update Users Country |
| `"/avatar"`  | `PUT`  | responsible to update Users Avatar  |

## Plugins

### Socket - Manual Created

- Using `Socket.io` to Create Socket Connection to Be used with Other Services for Authorization & Passing Info Through it
- Must Have Token To Enter The Socket Through Path ---> `"/socket"`

### is-authenticated - Manual Created

- usage Here to authenticate user Token Throuugh `JWT`
- checking user is Admin ---> Needed in System Updates & Opeartion Actions
- checking is Active to Confirm this user is Active

## Utilites

### Crypt

- using Crypto to Encrypt & Decrypt ---> Most usae in OTP Verfying - Impress me with More Usage

### Media

- Handling Multer Storage & uising SHarp to Convert & Optimize Media to save it in File Sysytem OR we Can send it to media Serveer Like `S3 Bucket` in `AWS`

### OTP

- Handling OTP Genrating with Simple But Powerful Loop -Tested on 10000 otps in minute - unquie code Every time
- shorter or longer the Code as You Wish inside the loop `for (i = 0; i < 6; i++)` it's set to `6`

### Password

- Hashing Passwords using `Crypto` with `SALT`, `HAMC` & `PASS_SECRET`
- comparing the password with Received Hash using same Methods
- Testing The Password with simple `regex` & password length - you can add more as you like here - it's seprated model for you

## Database

- It's simple here we Only Have 3 tables (Models/Migrations)

### User - Timestamp & Soft Delete - Excluding Password From `DefaultScope`

| Name         | Type      | NULL | deafult value                              |
| ------------ | --------- | ---- | ------------------------------------------ |
| `id`         | `INTEGER` | NO   | auto increment                             |
| `role_id`    | `INTEGER` | NO   | `5` user role                              |
| `first_name` | `STRING`  | NO   | none                                       |
| `last_name`  | `STRING`  | NO   | none                                       |
| `username`   | `STRING`  | NO   | none                                       |
| `phone`      | `STRING`  | NO   | none                                       |
| `email`      | `STRING`  | YES  | none                                       |
| `country_id` | `INTEGER` | NO   | none - Can be set as you wish              |
| `is_active`  | `BOOLEAN` | NO   | `true`                                     |
| `avatar`     | `STRING`  | NO   | `"/public/assets/avatars/placeholder.png"` |
| `password`   | `STRING`  | NO   | none                                       |
| `log_limits` | `INTEGER` | NO   | `3` recommended max `10`                   |

### Role - No Timestamp - Seeder Avilable

| Name   | Type      | NULL | deafult value  |
| ------ | --------- | ---- | -------------- |
| `id`   | `INTEGER` | NO   | auto increment |
| `name` | `STRING`  | NO   | none           |

### Country - No Timestamp - Seeder Avilable

| Name                   | Type      | NULL | deafult value  |
| ---------------------- | --------- | ---- | -------------- |
| `id`                   | `INTEGER` | NO   | auto increment |
| `name`                 | `STRING`  | NO   | none           |
| `dial_code`            | `STRING`  | NO   | none           |
| `country_code`         | `STRING`  | NO   | none           |
| `allowed_phone_length` | `INTEGER` | NO   | none           |

## Environment Variables

```bash

NODE_ENV="development"

# Hosting & meta
HOST="127.0.0.1"
PORT="5000"
APP_TIMEZONE="Africa/Cairo"

# Redis Server Credentials
REDIS_HOST="127.0.0.1"
REDIS_PORT="6379"

# JWT SECRET - Recommended Genrate By openssl
JWT_SECRET=""

# Pass Encryption - Half openssl Token
PASS_SECRET=""
SALT=16
HAMC=sha256

# Alg & Key Here is used in Encryption Process
ALOGORITHM="aes-256-ctr"
SECRET_KEY=""

# Databse Variables
DB_TIMEZONE="+02:00"

# Development Enviroment Database Credentials
DEV_USERNAME="root"
DEV_PASSWORD="12345"
DEV_DATABASE="users_database_development"
DEV_DB_HOST="127.0.0.1"
DEV_DIALECT="mysql"

```

## Public Directory

- Temp - needed to handle Incoming Files
- avavtars - Handling Avatars saved

## Contriburtion

- I will Be Happy To Approve Extra Features or Updates In The architecture
- Upcomming Feature that i will be happy to see a suggestions on `OAuth` & `passwordless`
