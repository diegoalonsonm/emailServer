import mjml2html from 'mjml'

export const renderMjml = (hbsHtml: string): string => {
    const { html, errors } = mjml2html(hbsHtml, { validationLevel: 'strict'})

    if(errors?.length) console.warn('MJML warnings/errors: ', errors)

    return html
}