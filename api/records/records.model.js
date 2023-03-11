const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    especialidad: {
      type: String,
      required: true,
    },

    observaciones: {
      type: String,
    },
    estadosalud: {
      type: String,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", RecordSchema);
