const attachSocketIo = (io) => (req, res, next) => {
  req.io = io;
  next();
};

export {attachSocketIo}