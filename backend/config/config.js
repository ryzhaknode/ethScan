import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: 'gmail', // або інший email провайдер
    auth: {
        user: 'ivanrigak@gmail.com',
        pass: 'Den1609!'
    }
});