const db = require("../config/db");

const authModel = {
  input: (data) => {
    return new Promise((resolve, reject) => {
      const { id, email, password, fullname } = data;
      db.query(
        `INSERT INTO users (id, email, password, fullname) 
                      VALUES ('${id}', '${email}', '${password}','${fullname}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
    login: (email) => {
        return new Promise((resolve, reject) => {
          db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
      },
};
module.exports = authModel;
