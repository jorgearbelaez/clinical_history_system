const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    identificacion: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: String,
      required: true,
      enum: ["HOSPITAL", "PACIENTE", "MEDICO"],
    },
    direccion: {
      type: String,
    },
    fechanacimiento: {
      type: String,
      trim: true,
    },
    servicios: {
      type: [String],
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    primerasesion: {
      type: Boolean,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hashear los password con el hook de pre de mongoose
UserSchema.pre("save", async function (next) {
  // si esta modificado el password que pase al siguiente Middleware
  if (!this.isModified("password")) next();

  const sal = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, sal);
});

UserSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

module.exports = mongoose.model("User", UserSchema);
