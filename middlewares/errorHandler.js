exports.errorHandler = async function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name == "Bad Request") {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  if (err.name == "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      status: "fail",
      message: "Foreign key constraint violation!",
    });
  }

  if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({
      status: "fail",
      message: err.errors[0].message,
    });
  }

  if (err.name == "Unauthentication" || err.name == "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }

  if (err.name == "Unauthorized") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid email / password",
    });
  }

  if (err.name == "Forbidden") {
    return res.status(403).json({
      status: "fail",
      message: `You're not allowed to the feature you're trying to access`,
    });
  }

  if (err.name == "notFound") {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  res.status(status).json({
    status: "fail",
    message: message,
  });
};
