import { Router } from "express"
import { transporter } from "../mail/transporter.js"
import { EmailSchema } from "../schemas/email.schema.js"
import { renderTemplates } from "../mail/templates.js"
import { config } from "../config.js"

const router = Router()

router.post('/send', async (req, res, next) => {
    try {
        const parsed = EmailSchema.parse(req.body)

        let htmlFinal = parsed.html
        if(parsed.template) {
            htmlFinal = await renderTemplates(parsed.template.name, parsed.template.data, parsed.template.mjml)
        }

        if(!htmlFinal && !parsed.text) {
            return res.status(400).json({ error: 'Provide "html" or "text" or "template"' })
        }

        const info = await transporter.sendMail({
            from: parsed.from ?? config.smtp.from,
            to: parsed.to,
            cc: parsed.cc,
            bcc: parsed.bcc,
            subject: parsed.subject,
            text: parsed.text,
            html: htmlFinal ?? undefined,
            attachments: parsed.attachments,
            replyTo: parsed.replyTo
        })

        res.json({
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response
        })

    } catch (err) {
    next(err)
  }
})

export default router