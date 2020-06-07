const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'rgarg8386@gmail.com',
        pass: 'rahulgarg2243@'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        (err, template) => {
            if (err) {
                console.log("error in rendring template");
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}
exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}