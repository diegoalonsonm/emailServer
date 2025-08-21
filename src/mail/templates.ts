import fs from 'fs/promises'
import path from 'path'
import Handlebars, { template } from 'handlebars'
import { renderMjml } from './mjml.js'

const templatesPath = path.resolve(process.cwd(), 'templates')

export const renderTemplates = async (name: string, data: Record<string, any> = {}, useMjml?: boolean): Promise<string> => {
    const filePath = path.join(templatesPath, `${name}.hbs`)
    const hbs = await fs.readFile(filePath, 'utf-8')
    const compiled = Handlebars.compile(hbs)
    const html = compiled(data)

    return useMjml ? renderMjml(html) : html
}