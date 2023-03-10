const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT } = require("../../middlewares/tokenValidator");
const {
  isHospitalRole,
  isDoctorRole,
} = require("../../middlewares/isHospitalRole");
const { handlerCreateRecord } = require("./records.controller");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");

const router = Router();

router.post(
  "/",
  [validateJWT, isDoctorRole, fieldsValidator],
  handlerCreateRecord
);

module.exports = router;
