const ExcelJS = require("exceljs");
const {
  getUserById,
  getUserByIdentification,
  createRecord,
  getAllRecords,
  getAllRecordsByUser,
  getRecordById,
  downloadRecords,
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
    // solo un usuario relacionado con el record tendra acceso a el mismo

    if (
      record.paciente._id.toString() !== req.user._id.toString() &&
      record.medico._id.toString() !== req.user._id.toString() &&
      record.hospital._id.toString() !== req.user._id.toString()
    ) {
      const error = new Error("No tienes acceso a este registro");
      return res.status(404).json({ msg: error.message });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los records" });
  }
};
const handlerExcelRecords = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await downloadRecords(id);
    if (!records) {
      const error = new Error("Registro no existente");
      return res.status(404).json({ msg: error.message });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Records");

    worksheet.columns = [
      { header: "#", key: "numero", width: 5 },
      { header: "Especialidad", key: "especialidad", width: 20 },
      { header: "Observaciones", key: "observaciones", width: 80 },
      { header: "Estadosalud", key: "estadosalud", width: 80 },
    ];

    let counter = 1;

    records.forEach((record) => {
      record.numero = counter;
      worksheet.addRow(record);
      counter += 1;
    });
    worksheet.getRow(1).eachCell((celda) => {
      celda.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    );

    res.setHeader("Content-Disposition", `attachment; filename=records.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  handlerCreateRecord,
  handlerAllRecords,
  handlerAllRecordsById,
  handlerRecordById,
  handlerExcelRecords,
};
