const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const { id } = req.params;
  let mytoken;
  if (id) {
    mytoken = id;
  } else {
    const { token } = req.body;
    mytoken = token;
  }
  const secret = process.env.SECTRET_KEY;
  const user = jwt.verify(mytoken, secret);
  req.userId = user.id;
  next();
};

module.exports = verifyToken;
