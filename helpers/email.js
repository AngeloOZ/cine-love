const nodemailer = require("nodemailer");
const { messageBodySelectMovie, messageBody } = require("./bodyEmail");

const createTrans = () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'yellow.ajsoft@gmail.com',
            pass: 'mrljdzkfdkspznlp'
        },
        // debug: true,
        // logger: true,
        tls: {rejectUnauthorized: false}
    });
    transporter.verify().then(() => {
        console.log("correo funcionando");
    }).catch(console.error);
    return transporter;
}


const sendEmail = async (user) => {
    try {
        const transporter = createTrans();
        let info = await transporter.sendMail({
            from: '"CineLove ❤️" <yellow.ajsoft@gmail.com>', // sender address
            to: `${user.correo}`, // list of receivers
            subject: "Invitacón al cine 🍿🎬", // Subject line
            html: messageBody(user), // html body
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error(error);
    }
}

const sendEmailSelectMovie = async (emails, data) => {
    try {
        const transporter = createTrans();
        let info = await transporter.sendMail({
            from: '"CineLove ❤️" <yellow.ajsoft@gmail.com>', // sender address
            to: emails, // list of receivers
            subject: "Confirmación de compra🍿🎬", // Subject line
            html: messageBodySelectMovie(data), // html body
        });
    
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error(error);
    }
}

exports.sendEmail = (user) => sendEmail(user);
exports.sendEmailSelectMovie = (emails, data) => sendEmailSelectMovie(emails, data);