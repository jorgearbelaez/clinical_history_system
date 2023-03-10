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
    if (user.rol === "MEDICO" && user.primerasesion === true) {
      res.json({
        msg: "debes establecer un nuevo password, redirigiendo...",
        _id: user._id,
        email: user.email,
        rol: user.rol,
        token: generarJWT(user._id),
        // redireccionamos hacia la vista donde cambiaremos el password por medio del endpoint http://localhost:4000/api/users/change-password //
      });
    } else {
      res.json({
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        token: generarJWT(user._id),
      });
    }
  } else {
    return res.status(403).json({
      msg: "Credenciales Incorrectas",
    });
  }
};
module.exports = {
  handlerLogin,
};
