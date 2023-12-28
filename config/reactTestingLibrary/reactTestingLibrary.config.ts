import { configure, prettyDOM } from '@testing-library/react';
import { PrintUtil } from '../../src/util/print/PrintUtil';

export function exec_reactTestingLibrary_config() {
  configure({
    // Stop huge error output from testing-library - Stack Overflow
    // https://stackoverflow.com/questions/64045789/stop-huge-error-output-from-testing-library
    // Stop HTML DOM output on test error · Issue #773 · testing-library/dom-testing-library
    // https://github.com/testing-library/dom-testing-library/issues/773
    getElementError: (message, container) => {
      let error: Error;
      if (container.outerHTML == null) {
        error = new Error([message, prettyDOM(container)].filter(Boolean).join('\n\n'));
      } else {
        error = new Error([message, PrintUtil.printHtmlHltAnsi(container)].filter(Boolean).join('\n\n'));
      }

      // const error = new Error(message ?? 'null msg');
      error.name = 'TestingLibraryElementError';
      // error.stack = null;
      return error;
    },
  });
}
