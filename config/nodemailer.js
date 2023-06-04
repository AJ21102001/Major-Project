const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 587,
   secure: true,
   auth: {
        user: 'ankitjha779@gmail.com',
        pass: 'udvjvjnbxzqitkgk'
   } 
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in Renndering Mail", err);
                return;
            }
            mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate,
}