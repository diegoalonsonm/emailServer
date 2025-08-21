import 'dotenv/config'

export const config = {
    port: parseInt(process.env.PORT ?? '8080', 10),
    smtp: {
        host: process.env.SMTP_HOST ?? '',
        port: parseInt(process.env.SMTP_PORT ?? '587', 10),
        secure: (process.env.SMTP_SECURE ?? 'false') === 'true',
        user: process.env.SMTP_USER ?? '',
        pass: process.env.SMTP_PASS ?? '',
        from: process.env.SMTP_FROM ?? 'Email Sender Service <emailsender536>'
    }
}

if(!config.smtp.host || !config.smtp.user || !config.smtp.pass) {
    throw new Error('SMTP configuration is incomplete. Please check your .env file.')
}