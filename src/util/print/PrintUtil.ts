import prettier from 'prettier';
import synchronizedPrettier from '@prettier/sync';
import { common, createEmphasize } from 'emphasize';

// TODO fix this
// REVIEW

export class PrintUtil {
  public static readonly prettierOption_html: prettier.Options = {
    parser: 'html',
    // filepath: 'foo.html',
    tabWidth: 2,
    printWidth: 160,
    // singleQuote: true,
  };

  private static emphasize = createEmphasize(common);

  // HTMLElement
  public static printHtmlHltAnsi(elt: Element) {
    // console.log(elt.outerHTML);
    // let content = await prettier.format(elt.outerHTML, PrintUtil.prettierOption_html);
    // if (elt.outerHTML == null) throw new TypeError();
    // no_knowlres prettier doc doesnt say what to throw......... // does throw that...
    if (elt.outerHTML == null) throw new TypeError();
    let content = synchronizedPrettier.format(elt.outerHTML, PrintUtil.prettierOption_html);
    content = PrintUtil.emphasize.highlight('html', content).value;
    // console.log(content);
    return content;
  }
}

// import jsdom from "jsdom";
// const { JSDOM } = jsdom; // dont use destructurtion on import ...
// // const elt = new DOMParser().parseFromString(`<div>bbb<code>123</code></div>`, 'text/html').documentElement;
// const dom = new JSDOM(`<!DOCTYPE html><div class="foo">bbb<code style="width: 100px">123</code><pre>debug this</pre></div>`);
// await PrintUtil.printDomWithAnsiHlt(dom.window.document.documentElement);
