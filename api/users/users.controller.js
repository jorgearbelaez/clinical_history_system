const {
  getAllUsers,
  createUser,
  existsToken,
  findUser,
  getUserById,
} = require("./users.service");

const { emailRegister, emailForgotPassword } = require("../../helpers/emails");
const { generateToken } = require("../../helpers/generateToken");

const handlerCreateUser = async (req, res) => {
  const user = req.body;

  try {
    const newUser = await createUser(user);

    // Enviar el email de confirmacion
    const { email, token } = newUser;
    emailRegister({
      email,
      token,
    });

    return res.status(200).json({
      msg: "Usuario creado correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const confirmToken = async (req, res) => {
  try {
    const { token } = req.params;

    const confirmUser = await existsToken(token);

    if (!confirmUser) {
      const error = new Error("Token no Válido");
      return res.status(403).json({ msg: error.message });
    }

    if (confirmUser.confirmado) {
      const error = new Error("El usuario ya esta confirmado");
      return res.status(403).json({ msg: error.message });
    }

    confirmUser.token = "";
    confirmUser.confirmado = true;
    await confirmUser.save();

    return res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUser(email);

    if (!user) {
      const error = new Error("Usuario no registrado");
      return res.status(404).json({ msg: error.message });
    }

    //generamos un nuevo token
    user.token = generateToken();
    await user.save();

    //enviar el email con instrucciones
    emailForgotPassword({
      email: user.email,
      token: user.token,
    });

    res.json({
      msg: `Hemos enviado un email a ${email} con las instrucciones para recuperar su contraseña`,
    });
  } catch (error) {
    console.log(error);
  }
};
const validateToken = async (req, res) => {
  const { token } = req.params;
  const tokenValid = await existsToken(token);

  if (!tokenValid) {
    const error = new Error("Token no válido");
    return res.status(403).json({
      msg: error.message,
    });
  }
  res.json({
    msg: "token válido",
  });
};
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await existsToken(token);

  if (user) {
    try {
      user.password = password;
      user.token = "";
      await user.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no Válido");
    return res.status(403).json({ msg: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { password, nuevoPassword } = req.body;

    const user = await getUserById(_id);

    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }
    if (!user.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }
    if (user.estado === false) {
      const error = new Error(
        "Tu cuenta esta desactivada, comunicate con el administrador"
      );
      return res.status(403).json({ msg: error.message });
    }

    if (password && nuevoPassword) {
      if (await user.comprobarPassword(password)) {
        user.password = nuevoPassword;
      } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
      }
    } else {
      const error = new Error("Ambos campos son requeridos");
      return res.status(403).json({ msg: error.message });
    }

    await user.save();
    res.json({
      msg: "Password cambiado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  const { _id } = req.user;

  const { nombre, telefono, direccion, email, fechanacimiento, servicios } =
    req.body;

  try {
    const user = await getUserById(_id);

    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }
    if (nombre) {
      user.nombre = nombre;
    }

    if (email && email !== req.user.email) {
      const existsEmail = await findUser(email);
      if (existsEmail) {
        const error = new Error("Ese email ya esta registrado");
        return res.status(404).json({ msg: error.message });
      }

      user.email = email;
    }
    if (telefono) {
      user.telefono = telefono;
    }

    if (direccion) {
      user.direccion = direccion;
    }

    if (user.rol === "HOSPITAL") {
      if (servicios && servicios.length > 0) {
        user.servicios = servicios.map((servicio) => servicio);
      }
    }
    if (user.rol === "PACIENTE") {
      if (fechanacimiento) {
        user.fechanacimiento = fechanacimiento;
      }
    }

    await user.save();

    res.json({
      msg: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const handlerAllUsers = async (req, res) => {
  const { limite = 5, pagina = 1 } = req.query;

  try {
    const users = await getAllUsers(limite, pagina);

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los usuarios" });
  }
};

module.exports = {
  handlerCreateUser,
  confirmToken,
  forgotPassword,
  validateToken,
  newPassword,
  changePassword,
  updateProfile,
  handlerAllUsers,
};
