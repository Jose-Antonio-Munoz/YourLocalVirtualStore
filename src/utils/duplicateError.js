exports.duplicateError = (err) => {
  if (err.code != 11000) {
    console.error(err);
    return { code: 500, message: "internal server error" };
  }
  const key = Object.keys(err.keyValue)[0];
  const value = err.keyValue[key];
  return {
    code: 422,
    message: `error the next data is alredy in use '${key}:${value}'`,
  };
};
