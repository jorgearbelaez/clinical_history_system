const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT } = require("../../middlewares/tokenValidator");
const { isDoctorRole } = require("../../middlewares/roleValidator");
const { handlerCreateRecord } = require("./records.controller");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    isDoctorRole,
    check("identificacion", "Debe suministrar la identificación del paciente")
      .not()
      .isEmpty(),
    check("especialidad", "Indicar la especialidad medica brindada al paciente")
      .not()
      .isEmpty(),
    check("estadosalud", "Indicar el estado de salud del paciente")
      .not()
      .isEmpty(),
    check("observaciones", "Indicar las observaciones realizadas al paciente")
      .not()
      .isEmpty(),
    fieldsValidator,
  ],
  handlerCreateRecord
);

module.exports = router;
