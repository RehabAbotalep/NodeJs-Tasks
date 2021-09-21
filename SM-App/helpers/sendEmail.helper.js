require('dotenv').config()
const nodemailer = require('nodemailer')

const smtpConfig = {
    service: 'gmail',
    auth:{
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
    }
}


const send = (reciver, text ) =>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
        let mailOptions = {
            from:"SM-App",
            to: reciver,
            subject: "SM-App",
            text: text
        }
        transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e);
    }
}

module.exports = send