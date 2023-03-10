const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");
const { handlerLogin } = require("./local.controller");

const router = Router();

router.post(
  "/",
  [
    check("identificacion", "Su identificación es obligatorio").not().isEmpty(),
    check("identificacion"),
    check("password", "Debe suministrar su password").not().isEmpty(),
    fieldsValidator,
  ],
  handlerLogin
);

module.exports = router;
