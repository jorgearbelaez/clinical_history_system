const isHospitalRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere validar el rol sin validar el token primero",
    });
  }

  const { rol } = req.user;

  if (rol !== "HOSPITAL") {
    return res.status(401).json({
      msg: `Tienes que ser un usuario tipo HOSPITAL para poder realizar esta acción`,
    });
  }

  return next();
};
const isDoctorRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere validar el rol sin validar el token primero",
    });
  }

  const { rol } = req.user;

  if (rol !== "MEDICO") {
    return res.status(401).json({
      msg: `Tienes que ser un usuario tipo MEDICO para poder realizar esta acción`,
    });
  }

  return next();
};
module.exports = { isHospitalRole, isDoctorRole };
