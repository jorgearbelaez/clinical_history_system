const User = require("./users.model");
const { generateToken } = require("../../helpers/generateToken");

const createUser = async (user) => {
  const userNew = new User(user);

  // generamos token de confirmacion de cuenta
  userNew.token = generateToken();
  await userNew.save();

  return userNew;
};
const createDoctor = async (doctor, id) => {
  console.log(id);
  const userNew = new User(doctor);
  //asignamos el rol de tipo Médico
  userNew.rol = "MEDICO";
  userNew.primerasesion = true;
  userNew.creador = id;
  // generamos token de confirmacion de cuenta
  userNew.token = generateToken();
  await userNew.save();

  return userNew;
};
const existsToken = async (token) => {
  const user = await User.findOne({ token });

  return user;
};
const findUser = async (email) => {
  const user = await User.findOne({ email });

  return user;
};
const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

const getAllUsers = async (limit, page) => {
  const query = {};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .limit(Number(limit))
      .skip(limit * (page - 1)),
  ]);
  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    resultados: users,
  };
};

module.exports = {
  createUser,
  createDoctor,
  existsToken,
  findUser,
  getUserById,
  getAllUsers,
};
