const usersModel = require("../models/user.model");
const { success, failed } = require("../helpers/response");
const deleteFile = require("../helpers/deleteFile");

module.exports = {
  list: async (req, res) => {
    try {
      const str = "";
      const search = req.query.search ? req.query.search : str;
      const users = await usersModel.selectAll(search);
      if (users.rows.length === 0) {
        return failed(
          res,
          500,
          `No user found with this name ${search}`,
          "Failed to get Data"
        );
      }

      const data = [];
      for (let i = 0; i < users.rows.length; i++) {
        const message = await usersModel.chat(
          req.query.login,
          users.rows[i].id
        );
        data.push({ ...users.rows[i], message: message.rows });
      }

      // const compare = (a, b) => {
      //   if (((a.message.length !== 0) == (b.message.length !== 0)) != true) {
      //     console.log("pp")
      //     if (a.message[0].date < b.message[0].date) {
      //       return 0;
      //     } else if (
      //       new Date(a.message[0].date) > new Date(b.message[0].date)
      //     ) {
      //       return 1;
      //     }
      //   } else {
      //     return -1;
      //   }
      // };

      success(res, 200, data, "Select List User Success");
    } catch (err) {
      failed(res, 500, err.message, "Select List User Failed");
    }
  },
  detail: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await usersModel.getDetail(id);

      if (!user.rowCount) {
        return failed(res, 200, "data not found", "failed to get data");
      }

      success(res, 200, user.rows[0], "success to get detail");
    } catch (err) {
      failed(res, 500, err.message, "failed to get detail");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await usersModel.getDetail(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, 500, `User with Id ${id} not found`, "Update User Failed");
        return;
      }

      await usersModel.updateById(id, req.body);

      success(res, 200, null, "Update User Success");
    } catch (err) {
      failed(res, 500, err.message, "Internal Server Error");
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersModel.getDetail(id);
      if (!user.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, 500, `User with Id ${id} not found`, "Update User Failed");
        return;
      }
      if (req.file) {
        if (user.rows[0].photo) {
          // menghapus photo lama
          deleteFile(`public/${user.rows[0].photo}`);
        }
        await usersModel.updatePhoto(id, req.file.filename);
      }

      success(res, 200, null, "Update User Success");
    } catch (err) {
      failed(res, 500, err.message, "Internal Server Error");
    }
  },
};
