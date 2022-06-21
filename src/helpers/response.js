module.exports = {
  success: (res, code, data, message, pagination) => {
    if (pagination) {
      return res.status(code).json({
        data,
        message,
        pagination,
      });
    }
    res.status(code).json({
      data,
      message,
    });
  },
  failed: (res, code, error, message) => {
    res.status(code).json({
      error,
      data: null,
      message,
    });
  },
};
