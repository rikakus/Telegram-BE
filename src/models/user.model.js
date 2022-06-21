const db = require("../config/db");

const usersModel = {
  selectAll: (search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE fullname LIKE '%${search}%'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getDetail: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  updateById: (id, data) =>
    new Promise((resolve, reject) => {
      const { fullname, phone, bio } = data;
      db.query(
        `UPDATE users SET fullname='${fullname}', phone='${phone}', bio='${bio}' WHERE id='${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updatePhoto: (id, photo) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo='${photo}' WHERE id='${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  chat: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT chats.id, chats.date, chats.message,userSender.fullname AS sender, userReceiver.fullname AS receiver FROM chats LEFT JOIN users AS userSender ON chats.sender=userSender.id LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id WHERE (sender='${sender}' AND receiver='${receiver}') OR (sender='${receiver}' AND receiver='${sender}') ORDER BY date DESC LIMIT 1 OFFSET 0
    `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};
module.exports = usersModel;
