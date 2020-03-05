exports.handleError = (error, res) => {
  res.status(500).json({
    message: 'Internal Server Error'
  });
  console.log(error);
};

exports.handleJoiError = (error, res) => {
  return res.status(400).json({ message: error.details[0].message });
};
