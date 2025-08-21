import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config.js'
import emailRoutes from './routes/email.routes.js'
import { verifyTransport } from './mail/transporter.js'

const app = express()

app.use(cors())
app.use(express.json({limit:'1mb'}))
app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/', emailRoutes)

app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err)
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    })
})

verifyTransport().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on: ${config.port}`)
    })
}).catch((error) => {
    console.error('Failed to verify SMTP transport:', error)
    process.exit(1)
})