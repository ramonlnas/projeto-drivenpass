
# 🔒 Driven Pass

Driven Pass is a password manager to store a master password to access other platforms that need passwords and also for Wifis.

## Stacks

**Back-end:** TypeScript, Prisma, PostgreSQL, Layered Architecture


## Functionality

- Encrypts the user's password when logging in to the database.
- Uses the npm cryptr library to encrypt credential and Wifis passwords in the database and returns them decrypted when the user uses the GET /credentials route.
- Layered architecture.
- Json Web Token (JWT) to generate user session.
- Database modeling.


## Installation

Instal driven-pass with npm

```bash
  npm install
  Access the .env.example to access how to set the environment variable
  To run the project use: npm run dev
```
    
## API Documentation

#### Sign-up

```http
  POST /signup
```

| Type       | Description                           |
| :--------- | :---------------------------------- |
| `string` | **Mandatory**: Email and password (minimum characters 10) |

#### Sign-in

```http
 POST /signin
```

| Type       | Description                                   |
| :--------- | :------------------------------------------ |
| `string` | **Mandatory**: Email and password (will generate a token to access next routes) |


#### Credentials

```http
 POST /credentials
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: title, url, username, password |


```http
 GET /credentials
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: It will return all the credentials that user has |

```http
 GET /credentials/{id}
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: Will return the specific credential |

```http
 DELETE /credentials/{id}
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: Will delete the specific credential |


#### Wifi

```http
 POST /wifi
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**:  title, network, password|


```http
 GET /wifi
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: It will return all the wifis that user has |

```http
 GET /wifi/{id}
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: Will return the specific wifi |

```http
 DELETE /wifi/{id}
```

| Headers   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Mandatory**: Will delete the specific wifi |



