# emailServer

English | [Español](#uso-en-español)

A concise usage guide (no deep internal architecture details).

---

## Quick Purpose (English)

emailServer lets you send transactional emails from your Node.js environment via a simple interface / API.

(If any statement below differs from your actual implementation, adjust accordingly.)

---

## 1. Installation

Clone and install dependencies:

```bash
git clone https://github.com/diegoalonsonm/emailServer.git
cd emailServer
npm install      # or pnpm install / yarn install
```

(Optional) Copy the example environment file:

```bash
cp .env.example .env
```

---

## 2. Minimal Environment Variables

Only keep what you truly use; remove what doesn’t apply.

| Variable        | What it’s for                          | Example                            |
|-----------------|-----------------------------------------|------------------------------------|
| PORT            | HTTP server port (if HTTP exposed)      | 3000                               |
| SMTP_HOST       | SMTP host                               | smtp.yourprovider.com              |
| SMTP_PORT       | SMTP port                               | 587                                |
| SMTP_USER       | SMTP username                           | no-reply@example.com               |
| SMTP_PASS       | SMTP password / app password            | (secret)                           |
| DEFAULT_FROM    | Default From address                    | "Service <no-reply@example.com>"   |
| PROVIDER        | Provider key (e.g. smtp, sendgrid, ses) | smtp                               |
| SENDGRID_KEY    | (If using SendGrid)                     | SG.xxxxxxxx                        |
| SES_REGION      | (If using AWS SES)                      | us-east-1                          |

If you only support one transport (e.g. plain SMTP), just define those needed.

---

## 3. Starting the Server

Development (watch mode) – adjust to your script name:

```bash
npm run dev
```

Production build (if you transpile TypeScript):

```bash
npm run build
npm start
```

If you run directly with ts-node:

```bash
npx ts-node src/index.ts
```

---

## 4. Basic Usage (Two Common Patterns)

Choose whichever your project exposes: (A) direct in‑code service usage; (B) simple HTTP endpoint.

### A. Direct (Programmatic) Usage

Example (hypothetical) service import:

```ts
import { sendEmail } from "./src/email"; // adjust path

await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  html: "<h1>Hello</h1><p>Thanks for joining.</p>",
  text: "Hello - Thanks for joining.",
  // template: "welcome",  // if you use templates
  // data: { name: "User" } // variables for template
});
```

Typical return (example):

```json
{
  "id": "msg_1730992849_abcd",
  "status": "sent",
  "transport": "smtp"
}
```

### B. HTTP Endpoint Usage

If an endpoint like POST /email/send is exposed:

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Welcome!",
    "html": "<h1>Hello</h1><p>Thanks for joining.</p>",
    "text": "Hello - Thanks for joining."
  }'
```

If you support templates:

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "template": "welcome",
    "data": { "name": "Ada" }
  }'
```

Adjust route names if different.

---

## 5. Templates (If Implemented)

Put template files (e.g. Handlebars, MJML, etc.) in a folder like:

```
/templates
  welcome.html.hbs
  password-reset.html.hbs
```

Usage (programmatic):

```ts
await sendEmail({
  to: "user@example.com",
  template: "welcome",
  data: { name: "Ada" }
});
```

Where the template might contain:

```hbs
<h1>Hi {{name}}</h1>
<p>Welcome to our service.</p>
```

If you do not support templating, ignore this section.

---

## 6. Error Handling (Examples)

You might receive:

```json
{
  "error": "MISSING_FIELD",
  "message": "'to' is required"
}
```

Or transport problems:

```json
{
  "error": "TRANSPORT_FAILURE",
  "message": "SMTP connection timeout"
}
```

Keep responses simple and consistent.

---

## 7. Testing (Quick Pointers)

- Use a local capture tool (e.g. MailHog / Ethereal) to verify rendering.
- Mock the transport in unit tests to avoid real sends.

Example with a fake transport:

```ts
jest.mock("./src/transports/smtp", () => ({
  send: jest.fn().mockResolvedValue({ id: "fake123", status: "sent" })
}));
```

---

## 8. Docker (Optional Quick Start)

```bash
docker build -t email-server .
docker run --env-file .env -p 3000:3000 email-server
```

---

## 9. Minimal FAQ

Q: How do I change the From address?
A: Set DEFAULT_FROM or pass a from field in each call (if supported).

Q: How do I send plain text only?
A: Omit html and supply text. The service should degrade gracefully.

Q: Can I send bulk?
A: Loop over sendEmail or implement a batch endpoint if supported (not shown here).

---

## 10. Updating This Guide

Replace any placeholders if:
- Your endpoint paths differ.
- You use a different config variable naming.
- You rely on a queue or webhook (omit if not needed).

---

## 11. License

Add your chosen license (MIT, Apache-2.0, etc.) in a LICENSE file.

---

# Uso en Español

Guía breve de uso (sin detalles profundos de infraestructura).

## 1. Instalación

```bash
git clone https://github.com/diegoalonsonm/emailServer.git
cd emailServer
npm install
cp .env.example .env
```

## 2. Variables de Entorno Mínimas

| Variable     | Uso                                   | Ejemplo                        |
|--------------|----------------------------------------|--------------------------------|
| PORT         | Puerto HTTP (si expones API)          | 3000                           |
| SMTP_HOST    | Host SMTP                              | smtp.proveedor.com             |
| SMTP_PORT    | Puerto SMTP                            | 587                            |
| SMTP_USER    | Usuario SMTP                           | no-reply@example.com           |
| SMTP_PASS    | Password SMTP                          | (secreto)                      |
| DEFAULT_FROM | Remitente por defecto                  | "Servicio <no-reply@example.com>" |
| PROVIDER     | smtp / sendgrid / ses                  | smtp                           |
| SENDGRID_KEY | (Si usas SendGrid)                     | SG.xxxx                        |
| SES_REGION   | (Si usas AWS SES)                      | us-east-1                      |

Elimina las que no uses.

## 3. Arranque

Dev:

```bash
npm run dev
```

Producción:

```bash
npm run build
npm start
```

O directo:

```bash
npx ts-node src/index.ts
```

## 4. Uso Básico

### A. Programático

```ts
import { sendEmail } from "./src/email";

await sendEmail({
  to: "usuario@example.com",
  subject: "Bienvenido",
  html: "<h1>Hola</h1><p>Gracias por unirte.</p>",
  text: "Hola - Gracias por unirte."
});
```

### B. Endpoint HTTP

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "usuario@example.com",
    "subject": "Bienvenido",
    "html": "<h1>Hola</h1><p>Gracias por unirte.</p>",
    "text": "Hola - Gracias por unirte."
  }'
```

Con plantilla:

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "usuario@example.com",
    "template": "welcome",
    "data": { "name": "Ada" }
  }'
```

## 5. Plantillas (Si aplica)

Carpeta típica:

```
/templates
  welcome.html.hbs
```

Uso:

```ts
await sendEmail({
  to: "usuario@example.com",
  template: "welcome",
  data: { name: "Ada" }
});
```

## 6. Errores (Ejemplos)

```json
{
  "error": "MISSING_FIELD",
  "message": "Falta 'to'"
}
```

```json
{
  "error": "TRANSPORT_FAILURE",
  "message": "Timeout SMTP"
}
```

## 7. Pruebas

- Usa MailHog / Ethereal para pruebas.
- Mock del transporte en unit tests.

## 8. Docker (Opcional)

```bash
docker build -t email-server .
docker run --env-file .env -p 3000:3000 email-server
```

## 9. Preguntas Frecuentes

- Cambiar remitente: variable DEFAULT_FROM o campo from.
- Solo texto: envía text sin html.
- Envío masivo: itera o implementa endpoint batch (no incluido).

## 10. Actualizar la Guía

Ajusta nombres de rutas, variables y ejemplos para que reflejen exactamente tu código real.

## 11. Licencia

Añade tu archivo LICENSE.

---

Si compartes el archivo real de código o la lista de endpoints, puedo ajustar esto con precisión exacta.