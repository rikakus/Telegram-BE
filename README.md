<h3 align="center">Telegram API</h3>
<p align="center">
  <a href="https://db-telegram-app.herokuapp.com/">View API Demo</a>
  ·
  <a href="https://github.com/rikakus/Telegram-BE/issues">Report Bug</a>
  <br />
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a Restful API repository for Telegram. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Getting Started

### Installation

- Clone this project with `git clone https://github.com/rikakus/Telegram-BE`
- Install package required with `npm install`
- Setting .env

```bash

PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
NODE_ENV=
JWT_SECRET=
```

### Executing program

- Run program with `npm run dev` for development and `npm run start` for production

## Endpoint List

### User

#### Auth

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `post`      | `/register` | user register |
| `post`      | `/login` | user login |

#### User

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/users` | get list user |
| `get`      | `/users/:id` | get detail user |
| `put`      | `/users/:id` | update data user |
| `put`      | `/users/:id/photo` | update data photo user |

#### Chat (socket)

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `socket.on`      | `ping` | check socket connection |
| `socket.on`      | `join-room` | join room user |
| `socket.on`      | `send-message` | send message |
| `socket.on`      | `delete-message` | delete message |
| `socket.on`      | `chat-history` | get history chat user |

<!-- RELATED PROJECT -->
## Related Project

- [Telegram FrontEnd](https://github.com/rikakus/Telegram-FE)
- [Telegram Demo](https://telegram-rikakus.vercel.app/)

## License

This project is licensed under the MIT License - see the LICENSE file for details
