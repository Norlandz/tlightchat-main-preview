import prettier from 'prettier';
import synchronizedPrettier from '@prettier/sync';
import { common, createEmphasize } from 'emphasize';

                
         

export class PrintUtil {
  public static readonly prettierOption_html: prettier.Options = {
    parser: 'html',
                            
    tabWidth: 2,
    printWidth: 160,
                         
  };

  private static emphasize = createEmphasize(common);

                
  public static printHtmlHltAnsi(elt: Element) {
                                  
                                                                                         
                                                        
                                                                                       
    if (elt.outerHTML == null) throw new TypeError();
    let content = synchronizedPrettier.format(elt.outerHTML, PrintUtil.prettierOption_html);
    content = PrintUtil.emphasize.highlight('html', content).value;
                            
    return content;
  }
}

                             
                                                                    
                                                                                                                 
                                                                                                                                
                                                                            
