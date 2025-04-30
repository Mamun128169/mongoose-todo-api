const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    // decoded or verify the jwt token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(403).json({ Error: "Invalid Token, It may expires!" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

// module export
module.exports = checkUser;
