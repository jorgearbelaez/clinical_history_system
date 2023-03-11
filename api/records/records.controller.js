const {
  getUserById,
  getUserByIdentification,
  createRecord,
  getAllRecords,
  getAllRecordsByUser,
  getRecordById,
} = require("./records.services");

const handlerCreateRecord = async (req, res) => {
  const { identificacion, especialidad, estadosalud, observaciones } = req.body;
  const { _id } = req.user;

  try {
    const user = await getUserByIdentification(identificacion);
    const doctor = await getUserById(_id);
    console.log(doctor);
    if (user.rol !== "PACIENTE") {
      const error = new Error("No eres un usuario del tipo PACIENTE");
      return res.status(404).json({ msg: error.message });
    }
    const record = {
      paciente: user._id,
      medico: doctor._id,
      especialidad,
      estadosalud,
      observaciones,
      hospital: doctor.creador,
    };
    const newRecord = await createRecord(record);
    user.records.push(newRecord._id);
    doctor.records.push(newRecord._id);
    doctor.creador.records.push(newRecord._id);

    await user.save();
    await doctor.save();
    await doctor.creador.save();

    return res.status(200).json({
      msg: "Registro creado correctamente",
      newRecord,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const handlerAllRecords = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  //enpoint para un ADMINISTRADOR
  try {
    const records = await getAllRecords(limit, page);

    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los records" });
  }
};
const handlerAllRecordsById = async (req, res) => {
  const { _id, rol } = req.user;

  try {
    const records = await getAllRecordsByUser(_id, rol);

    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los records" });
  }
};
const handlerRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await getRecordById(id);
    if (!record) {
      const error = new Error("Registro no existente");
      return res.status(404).json({ msg: error.message });
    }
    console.log(record.paciente);
    console.log(record.medico);
    console.log(record.hospital);
    console.log(req.user._id);

    if (
      record.paciente.toString() !== req.user._id.toString() &&
      record.medico.toString() !== req.user._id.toString() &&
      record.hospital.toString() !== req.user._id.toString()
    ) {
      const error = new Error("No tienes acceso a este registro");
      return res.status(404).json({ msg: error.message });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los records" });
  }
};
module.exports = {
  handlerCreateRecord,
  handlerAllRecords,
  handlerAllRecordsById,
  handlerRecordById,
};
