const User = require("../api/users/users.model");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select(
        "-password -token  -createdAt -updatedAt -__v "
      );

      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: "Token no válido" });
    }
  }

  if (!token) {
    const error = new Error("Token requerido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

module.exports = {
  validateJWT,
};
