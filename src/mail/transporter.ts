import nodemailer from 'nodemailer'
import { config } from '../config'

export const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
    }
})

export const verifyTransport = async () => {
    await transporter.verify()
}