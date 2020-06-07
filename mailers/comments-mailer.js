const nodeMailer = require('../config/nodemailer');
//this is another way of exporting a method
module.exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/newcomment.ejs');
    console.log("inside new comment mailer", comment);
    nodeMailer.transporter.sendMail({
        from: 'rgarg2_be17@thapar.edu',
        to: comment.user.email,
        subject: "New comment Published",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("error in sending the email", err);
            return;
        }
        console.log("inside new comment mailer", comment);
        console.log("'Message sent", info);
        return;
    });
}