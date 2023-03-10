const {
  getUserById,
  getUserByIdentification,
  createRecord,
} = require("./records.services");

const handlerCreateRecord = async (req, res) => {
  const { identificacion, especialidad, estadosalud, observaciones } = req.body;
  const { _id } = req.user;
  try {
    const user = await getUserByIdentification(identificacion);
    const doctor = await getUserById(_id);

    const record = {
      paciente: user._id,
      medico: doctor._id,
      especialidad,
      estadosalud,
      observaciones,
      hospital: doctor.creador,
    };
    const newRecord = await createRecord(record);

    return res.status(200).json({
      msg: "Registro creado correctamente",
      newRecord,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { handlerCreateRecord };
