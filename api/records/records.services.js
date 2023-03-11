const Record = require("./records.model");
const User = require("../users/users.model");

const getUserById = async (id) => {
  const user = await User.findById(id).populate("creador", "records");

  return user;
};
const getUserByIdentification = async (identificacion) => {
  const user = await User.findOne({ identificacion });

  return user;
};
const createRecord = async (body) => {
  const newRecord = await new Record(body);
  await newRecord.save();

  return newRecord;
};
const getAllRecords = async (limit, page) => {
  const query = {};

  const [total, records] = await Promise.all([
    Record.countDocuments(query),
    Record.find(query)
      .populate("hospital", "nombre direccion")
      .populate("medico", "nombre direccion email telefono")
      .populate("paciente", "nombre direccion email fechanacimiento telefono")
      .limit(Number(limit))
      .skip(limit * (page - 1)),
  ]);
  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    resultados: records,
  };
};
const getAllRecordsByUser = async (id, rol) => {
  let records;
  switch (rol) {
    case "PACIENTE":
      records = await User.find(id)
        .select("records nombre telefono email")
        .populate({
          path: "records",
          select: "-observaciones -estadosalud",
          populate: {
            path: "medico",
            select: "nombre telefono email",
            populate: { path: "creador", select: "nombre telefono email" },
          },
        });
      return {
        results: records,
      };
      break;
    case "MEDICO":
      records = records = await User.find(id)
        .select("records nombre telefono email")
        .populate({
          path: "records",
          select: "-observaciones -estadosalud",
          populate: {
            path: "paciente",
            select: "nombre telefono email",
          },
        })
        .populate("creador", "nombre email telefono");
      return {
        results: records,
      };
      break;
    case "HOSPITAL":
      records = await Record.find({ hospital: id })
        .select("-observaciones -estadosalud")
        .populate("medico", "nombre email telefono")
        .populate("paciente", "nombre email telefono")
        .populate("hospital", "nombre email telefono servicios");
      return {
        results: records,
      };
      break;
    default:
      res.json({ msg: "no se encontraron records" });
  }
};
const getRecordById = async (id, rol, userId) => {
  const record = await Record.findById({ _id: id });

  return record;
};

module.exports = {
  getUserById,
  getUserByIdentification,
  createRecord,
  getAllRecords,
  getAllRecordsByUser,
  getRecordById,
};
