export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.name === "MulterError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
}
