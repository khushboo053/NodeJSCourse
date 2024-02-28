// QV7Y7JAJAGCPPYK88EKEKZLV;
require('dotenv').config()
const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

// sgMail.send({
//   to: "samridhiahuja418@gmail.com",
//   from: "khushboomakhija005@gmail.com",
//   subject: "This is my first creation",
//   text: "I hope this one actually get to u.",
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "khushboomakhija005@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the world of your gmail life, ${name}. Let me know how u get along with someone special.`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "khushboomakhija005@gmail.com",
    subject: "Say Thanks to us for deleting!!",
    text: `Say Good Bye to your Past Gmail Life. Yep! ${name} U did it, Oops! We did it!`,
  }); 
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
