const User = require("../../api/users/users.model");
const { generarJWT } = require("../../helpers/generateJWT");

const handlerLogin = async (req, res) => {
  const { identificacion, password } = req.body;

  const user = await User.findOne({ identificacion });
  if (!user) {
    return res.status(400).json({
      msg: "Usuario no registrado",
    });
  }
  if (user.confirmado === false) {
    return res.status(400).json({
      msg: "Debes confirmar tu cuenta",
    });
  }

  if (await user.comprobarPassword(password)) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      token: generarJWT(user._id),
    });
  } else {
    return res.status(403).json({
      msg: "Credenciales Incorrectas",
    });
  }
};
module.exports = {
  handlerLogin,
};
