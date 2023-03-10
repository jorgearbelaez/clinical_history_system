const { Router } = require("express");
const { check } = require("express-validator");
const { idExists, emailExists } = require("../../helpers/customValidators");
const { fieldsValidator } = require("../../middlewares/fieldsValidator");
const { validateJWT } = require("../../middlewares/tokenValidator");
const {
  handlerCreateUser,
  handlerAllUsers,
  confirmToken,
  forgotPassword,
  validateToken,
  newPassword,
  changePassword,
  updateProfile,
} = require("./users.controller");

const router = Router();

router.post(
  "/",
  [
    check("identificacion", "Su identificación es obligatorio").not().isEmpty(),
    check("identificacion").custom(idExists),
    check("email", "email no es valido").isEmail(),
    check("email").custom(emailExists),
    check("password", "El password es obligatorio").exists(),
    check(
      "password",
      "El password es obligatorio y debe ser de mínimo 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("telefono", "El numero de telefono es obligatorio").not().isEmpty(),
    fieldsValidator,
  ],
  handlerCreateUser
);

router.get("/confirm/:token", confirmToken);
router.post(
  "/forgot-password",
  [
    check("email", "Debes suministar un email válido").isEmail(),
    fieldsValidator,
  ],
  forgotPassword
);
router
  .route("/forgot-password/:token")
  .get(validateToken)
  .post(
    [
      check("password", "El password es obligatorio").exists(),
      check(
        "password",
        "El password es obligatorio y debe ser de mínimo 6 caracteres"
      ).isLength({
        min: 6,
      }),
      fieldsValidator,
    ],
    newPassword
  );

router.patch(
  "/change-password",
  [
    validateJWT,
    check("password", "El password es obligatorio").exists(),
    check("nuevoPassword", "El password es obligatorio").exists(),
    check(
      "nuevoPassword",
      "El nuevo password es obligatorio y debe ser de mínimo 6 caracteres"
    ).isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  changePassword
);

router.put("/update-profile", validateJWT, updateProfile);
router.get("/", validateJWT, handlerAllUsers);

module.exports = router;
