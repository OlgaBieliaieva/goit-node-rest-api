import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const SGsendEmail = async (data) => {
  const email = { ...data, from: "o.shapoval.dev@gmail.com" };

  return await sgMail
    .send(email)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default SGsendEmail;

// const data = {
//   to: "jomanet165@mcatag.com",
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
