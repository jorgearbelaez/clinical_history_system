const User = require("../api/users/users.model");

const idExists = async (identificacion = "") => {
  const user = await User.findOne({ identificacion });
  if (user) {
    throw new Error(`la identificacion ${identificacion} ya esta registrada`);
  }
};
const emailExists = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`el email ${email} ya esta registrado`);
  }
};
module.exports = {
  idExists,
  emailExists,
};
