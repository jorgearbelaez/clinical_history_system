const sgMail = require("@sendgrid/mail");

// ENVIAR UN EMAIL DE CONFIRMACION DE CUENTA DEL REGISTRO
const emailRegister = async (data) => {
  const { email, token } = data;

  const htmlConfirmar = `
  <div style="font-family: 'Open Sans','Roboto','Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 16px; color: #757575; line-height: 150%; letter-spacing: normal;">
  <div style="background: #0284c7; padding: 50px 10px;">
  <div style="max-width: 600px; margin: auto;">
  <div style="background: white; padding: 15px 30px 25px 30px; border-radius: 5px;">
  <div style="text-align: center; margin: 20px 0 30px;"><span style="font-weight: bold; color: #0284c7; font-size: 30px; margin-left: 10px;">Heippi</span></div>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Hola ${email} confirma tu cuenta en nuestro sistema de gestion de historias clinicas,</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace.</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Por favor confirme su correo electr&oacute;nico (<a href="mailto:${email}" target="_blank" rel="noopener">${email}</a>) haciendo clic en el bot&oacute;n de abajo.</p>
  <p><a style="background: #0284c7; color: white; font-weight: 500; display: inline-block; padding: 10px 35px; margin: 6px 8px; text-decoration: none; border-radius: 2px;" href="${process.env.FRONTEND_URL}/confirm/${token}" target="_blank" rel="noopener">Confirmar</a></p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">En enlace expira inmediatamente cuando se abre.</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Si tu no creastes esta cuenta, puedes ignorar el mensaje.</p>
  </div>
  </div>
  </div>
  <div style="background: #0284c7; color: white; font-size: 12px; padding: 30px 10px 30px 10px;">
  <div style="max-width: 600px; margin: auto; text-align: center;"><hr style="border: 1px solid #f2f2f2;">
  <p style="font-style: italic; margin-bottom: 0;">Copyright &copy; 2023 Heippi, All rights reserved.</p>
  <p>Puedes visitar mi sitio web para mas informaci&oacute;n <a style="color: white;" href="https://github.com/jorgearbelaez" target="_blank" rel="noopener">heippi</a></p>
  <hr style="border: 1px solid #f2f2f2;"></div>
  <div class="yj6qo">&nbsp;</div>
  <div class="adL">&nbsp;</div>
  </div>
  <div class="adL">&nbsp;</div>
  </div>
  `;

  sgMail.setApiKey(process.env.API_KEY);

  const msg = {
    to: email,
    from: "jorge.a.arbelaez.c@gmail.com",
    subject: "Confirme su cuenta en Heippi",
    text: "Heippi",
    html: htmlConfirmar,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};
// ENVIAR UN EMAIL DE RECUPERACION DE PASSWORD
const emailForgotPassword = async (data) => {
  const { email, token } = data;

  const htmlRestablecer = `
  <div style="font-family: 'Open Sans','Roboto','Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 16px; color: #757575; line-height: 150%; letter-spacing: normal;">
  <div style="background: #0284c7; padding: 50px 10px;">
  <div style="max-width: 600px; margin: auto;">
  <div style="background: white; padding: 15px 30px 25px 30px; border-radius: 5px;">
  <div style="text-align: center; margin: 20px 0 30px;"><span style="font-weight: bold; color: #0284c7; font-size: 30px; margin-left: 10px;">Restablecer password en Heippi</span></div>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Hola ${email}&nbsp;</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Has solicitado restablecer tu password en Heippi</p>
  <p>Sigue el siguiente enlace para generar un nuevo password:&nbsp;</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;"><a style="background: #0284c7; color: white; font-weight: 500; display: inline-block; padding: 10px 35px; margin: 6px 8px; text-decoration: none; border-radius: 2px;" href="${process.env.FRONTEND_URL}/forgot-password/${token}" target="_blank" rel="noopener">Restablecer password</a></p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Este enlace expira inmediatamente cuando se abre.</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Si tu no solicitastes este email, puedes ignorar el mensaje.</p>
  </div>
  </div>
  </div>
  <div style="background: #0284c7; color: white; font-size: 12px; padding: 30px 10px 30px 10px;">
  <div style="max-width: 600px; margin: auto; text-align: center;"><hr style="border: 1px solid #f2f2f2;">
  <p style="font-style: italic; margin-bottom: 0;">Copyright &copy; 2022 UpTask, All rights reserved.</p>
  <p>Puedes visitar mi sitio web para mas informaci&oacute;n <a style="color: white;" href="http://heippi.com" target="_blank" rel="noopener">whitecode</a></p>
  <hr style="border: 1px solid #f2f2f2;"></div>
  <div class="yj6qo">&nbsp;</div>
  <div class="adL">&nbsp;</div>
  </div>
  <div class="adL" style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">&nbsp;</div>
  </div>
`;

  sgMail.setApiKey(process.env.API_KEY);

  const msg = {
    to: email,
    from: "jorge.a.arbelaez.c@gmail.com",
    subject: "Restablecer password - Heippi.",
    text: "Heippi",
    html: htmlRestablecer,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { emailRegister, emailForgotPassword };
