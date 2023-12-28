// ;test-intro; // import { describe, expect, test, it } from '@jest/globals'; // this doesnt work...
// ;test-intro; // import { describe, expect, test, it } from '@testing-library/jest-dom';
// ;test-intro; // import userEvent from '@testing-library/user-event';
// ;test-intro; // import '@testing-library/jest-dom/extend-expect';
// ;test-intro; // import 'jest-dom/extend-expect';
// ;test-intro; // import { Greet } from './Greet';
// ;test-intro;
// ;test-intro; import '@testing-library/jest-dom';
// ;test-intro; import { render } from '@testing-library/react';
// ;test-intro;
// ;test-intro; describe('Greet', () => {
// ;test-intro;   test('find AA', () => {
// ;test-intro;     const { getByText } = render(<div>Banana and Apple</div>);
// ;test-intro;     const textElement = getByText(/Banana/); // screen.getByText(/Banana/);
// ;test-intro;     expect(textElement).toBeInTheDocument();
// ;test-intro;   });
// ;test-intro;
// ;test-intro;   test('find BB', () => {
// ;test-intro;     const { getByText } = render(<div>Banana and Apple</div>);
// ;test-intro;     const textElement = getByText(/Mango/);
// ;test-intro;     expect(textElement).toBeInTheDocument();
// ;test-intro;   });
// ;test-intro; });

// import { dummyExport_enableMapSet } from '../src/mainPreImport';
// dummyExport_enableMapSet();

/**
 * @jest-environment jsdom
 */
import { setImmediate } from 'timers'; // https://github.com/prisma/prisma/issues/8558
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, findAllByRole, findByText, prettyDOM, queryByAttribute, render, screen, waitFor } from '@testing-library/react';
// ; import { act } from 'react-dom/test-utils';
import App from '../../src/App';
import { InitRun, initRun } from '../../src/session/AppSession';
import { store } from '../../src/webrtcVideoCommunication/redux/ReduxStore';
import { videoConnectionLinkageDraftCurrSelected_ref } from '../../src/webrtcVideoCommunication/redux/slice_videoConnectionLinkageDraftCurrSelected';

import util from 'util';

import prettier from 'prettier';
import { PrintUtil } from '../../src/util/print/PrintUtil';
const { printHtmlHltAnsi } = PrintUtil;
import userEvent from '@testing-library/user-event';
import styles from '../src/scss/index.module.css';
import { WebrtcButtonName } from '../../src/webrtcVideoCommunication/service/WebrtcButtonNameType';

// jest.useFakeTimers();

//
// prettier-ignore
Object.defineProperty(window, 'MediaStream', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      active: false,
      id: 1,
      onaddtrack: jest.fn(), onremovetrack: jest.fn(), addTrack: jest.fn(), clone: jest.fn(), getAudioTracks: jest.fn(), getTrackById: jest.fn(), getTracks: jest.fn(), getVideoTracks: jest.fn(), removeTrack: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn(),
    })),
  });

// ;wte; const pauseStub = jest.spyOn(window.HTMLCanvasElement.prototype, 'captureStream').mockImplementation(() => new MediaStream());
// ;wte; const mock_captureStream = jest.spyOn(window.HTMLMediaElement.prototype, 'captureStream').mockImplementation(() => new MediaStream());
// ;wte; @[[jsdom is too limited... do ppl really use Jest to test React?.. dk feels not for these complex thing? -- self_design says just do test in real code]]
const spy_getLocalMediaStream = jest.spyOn(InitRun.prototype, 'getLocalMediaStream').mockImplementation(async () => new MediaStream());
// spy_getLocalMediaStream.mockRestore();

// javascript - Limit JSON stringification depth - Stack Overflow
// https://stackoverflow.com/questions/16466220/limit-json-stringification-depth
// javascript - JSON.stringify deep objects - Stack Overflow
// https://stackoverflow.com/questions/13861254/json-stringify-deep-objects
// function jsonOmit(key: string, value: any) {
//   if (key === '') {
//     return value;
//   } else {
//     return '[omitted]';
//   }
// }

describe('Simple overall test - introTryTest', () => {
  afterEach(() => {
    initRun.socketioClientSession_forWebrtcConnection.socket.close();
  });

  // test('find ZZ', async () => {@¦    // await act(async () => {@¦    const renderResult = render(@¦      <>@¦        <h2>Video Connection with Webrtc</h2>@¦        <div>1321321546789</div>@¦      </>@¦    );@¦    // console.log(renderResult);@¦    console.log(renderResult.container.outerHTML);@¦  });

  // npx jest --runTestsByPath ./test/App.test.tsx -t="print App, check online" --watch
  // node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runTestsByPath ./test/App.test.tsx -t="print App, check online"
  test('print App, check online', async () => {
    // #>>> render app
    // ; // const renderResult: RenderResult = await (async (): Promise<RenderResult> => {
    // ; await act(async () => {
    // ;   renderResult = render(<App />);
    // ; });
    // ; await new Promise((r) => setTimeout(r, 2000));
    // ; if (renderResult == null) throw new TypeError();
    // ; console.log(renderResult);
    // ; renderResult.rerender(<App />);

    // ;; 1. seems already wrapped in act()
    // ;; 1. seems its the call of an async func in useEffect ...
    // ;; []
    // ;; There are other things that are asynchronous because they depend on truly asynchronous APIs, such as [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), and there's no way for React to paper over that; so you can't just use `act` for those, but rather, you need to use `await` to wait for them to complete.
    // ;; <>
    // ;; https://stackoverflow.com/questions/76206619/why-do-i-need-waitfor-or-act-instead-of-just-using-await-in-react-testing
    // ;; was saying ... now //comfirm
    // ;; cuz those are setState & run useEffect
    // ;; then async inside is unable to know
    // ;; but the waitFor / findBy baseon time out still just dangerous ...
    // ;; dk better way (dk multi thread

    const renderResult = render(<App />);

    // #>>> print App immediately
    console.log(renderResult.container.outerHTML);
    expect(renderResult.queryByText(/this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer./)).not.toBe(null);

    // #>>> wait for async code is done App
    //? why do they wrap the wait inside act(), just to avoid the warning?..
    // await act(async () => await new Promise((r) => setTimeout(r, 2000)));
    await waitFor(
      () => {
        //? is this sufficient? or better wait for last element
        // well this is for async, not for the state
        // but that async also trigger other update... so thats why need wrap in act()? ... but how lib knows? (-- feels global promise still the way ...
        // also have que on the test lib & global var share ...
        renderResult.getByText(/add_webrtcConnectionAnchorRcomp/); // must throw to retry
      },
      {
        container: renderResult.container,
        timeout: 2000,
        interval: 100,
      }
    );
    // console.log(renderResult.container.outerHTML);
    // console.log(prettyDOM(renderResult.container));
    printHtmlHltAnsi(renderResult.container);
    expect(renderResult.queryByText(/this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer./)).toBe(null);

    //
    // console.log(JSON.stringify(store.getState().reducer_mppWebrtcConnectionAnchor, jsonOmit));
    console.log(util.inspect(store.getState().reducer_mppWebrtcConnectionAnchor, false, 1, true));

    //
    // console.log(JSON.stringify(videoConnectionLinkageDraftCurrSelected_ref, jsonOmit));
    console.log(util.inspect(videoConnectionLinkageDraftCurrSelected_ref, false, 1, true));

    //
    await waitFor(() => {
      // need wait another time -- cuz the socket is listening, not just async in useEffect...
      // renderResult.getByText(/signalserverWebsocketClientId/); // multiple with the same text ... // dk getText scope & boundary ..
      renderResult.getByText(/self \*</);
    });
    const eltTx = renderResult.queryByText(/self \*</); // ok not textnode but htmlelement
    console.log(eltTx?.outerHTML);
    console.log(eltTx?.nextSibling?.nodeValue);
    // expect(eltTx).toBeInTheDocument();
    expect(eltTx).not.toBe(null);

    //
    console.log(store.getState().reducer_lobbyUserList);

    //
    // screen.debug()
    renderResult.debug();
    // console.log(await prettier.format(renderResult.container.outerHTML, prettierOption_html));

    // initRun.socket.close(); // ok that hang cuz error thrown..
    // that say speed dk less wait and specify hum
  });

  test('click and send offer', async () => {
    console.log(
      'make sure: 1. signalserver is online 1. the vite_2 is online ; then you can continue this test.' +
        '\n  // actually, seem only need one vite_1 online (not both) -- cuz this Jest_test creates another vite_test to connect to one vite_1 (can see vite_1 show vite_test is online for a blink)'
    );

    const user = userEvent.setup();
    const renderResult = render(<App />);

    // #>>>
    const elt_lobbyUserList = await renderResult.findByText(/lobbyUserList/);
    // console.log(prettyDOM(elt_lobbyUserList));
    console.log(printHtmlHltAnsi(elt_lobbyUserList));

    // #>>>
    const arr_elt_SelectPeer = await findAllByRole(
      elt_lobbyUserList,
      'button',
      {
        name: /select_webrtcConnectionAnchorLocation_peer/,
      },
      {
        timeout: 2000,
        interval: 100,
      }
    );
    expect(arr_elt_SelectPeer).not.toHaveLength(0);
    // for (const elt_curr of arr_elt_SelectPeer) {
    const elt_SelectPeer = arr_elt_SelectPeer[0];

    // #>>>
    await user.click(elt_SelectPeer);
    // console.log(prettyDOM(elt_lobbyUserList));

    // reactjs - Find element by id in react-testing-library - Stack Overflow
    // https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
    // // idk should i just use another render of the component? dk the get id hum , imean the design
    // REVIEW may need wait
    // HTMLElement? type safe pb ...
    const elt_VideoConnectionLinkageDraftControlPanel = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_VideoConnectionLinkageDraftControlPanel}`);
    if (elt_VideoConnectionLinkageDraftControlPanel == null) throw new TypeError();
    // queryByAttribute('id', renderResult.container, styles.cssId_VideoConnectionLinkageDraftControlPanel);
    console.log(printHtmlHltAnsi(elt_VideoConnectionLinkageDraftControlPanel));

    const eltButton_sendConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.sendConnectionOffer));
    expect(eltButton_sendConnectionOffer).not.toBe(null);
    const eltButton_acceptConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.acceptConnectionOffer));
    expect(eltButton_acceptConnectionOffer).not.toBe(null);
    const eltButton_send_cancelConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_cancelConnectionOffer));
    expect(eltButton_send_cancelConnectionOffer).not.toBe(null);
    const eltButton_send_declineConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_declineConnectionOffer));
    expect(eltButton_send_declineConnectionOffer).not.toBe(null);
    const eltButton_send_closeConnection: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_closeConnection));
    expect(eltButton_send_closeConnection).not.toBe(null);

    expect(!eltButton_sendConnectionOffer.disabled).toBe(true);
    expect(!eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_cancelConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_closeConnection.disabled).toBe(false);

    // #>>>
    await user.click(eltButton_sendConnectionOffer);
    expect(!eltButton_sendConnectionOffer.disabled).toBe(false);
    expect(!eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_cancelConnectionOffer.disabled).toBe(true);
    expect(!eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_closeConnection.disabled).toBe(false);

    // more
  });
});

// 1. Enzyme & test implementation
// 1. Jest esm npx node  thing
// 1. f say b j ,, d
// 1. act wait thing?.. ( top lv ; org code ; no html prettier output ...
// say miss dk ..

// aga throw & later not exectued pb (dose afterAll still get executed?  )

// todo: import { debug } from 'jest-preview';
