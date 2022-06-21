const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  store: (data) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { sender, receiver, message } = data;
      db.query(
        `
    INSERT INTO chats (id, sender, receiver, message) VALUES ('${id}','${sender}','${receiver}','${message}')
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
  list: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT chats.id, chats.message,userSender.fullname AS sender, userReceiver.fullname AS receiver FROM chats LEFT JOIN users AS userSender ON chats.sender=userSender.id LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id WHERE (sender='${sender}' AND receiver='${receiver}') OR (sender='${receiver}' AND receiver='${sender}') ORDER BY date ASC
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
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM chats WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
