import { configure, prettyDOM } from '@testing-library/react';
import { PrintUtil } from '../../src/util/print/PrintUtil';

export function exec_reactTestingLibrary_config() {
  configure({
    getElementError: (message, container) => {
      let error: Error;
      if (container.outerHTML == null) {
        error = new Error([message, prettyDOM(container)].filter(Boolean).join('\n\n'));
      } else {
        error = new Error([message, PrintUtil.printHtmlHltAnsi(container)].filter(Boolean).join('\n\n'));
      }

                                                        
      error.name = 'TestingLibraryElementError';
                            
      return error;
    },
  });
}
