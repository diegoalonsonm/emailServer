declare module 'mjml' {
  export interface MJMLParseResults {
    html: string;
    errors: any[];
  }

  export interface MJMLOptions {
    validationLevel?: 'skip' | 'soft' | 'strict';
    minify?: boolean;
    beautify?: boolean;
    filePath?: string;
  }

  const mjml2html: (input: string, options?: MJMLOptions) => MJMLParseResults;
  export default mjml2html;
}