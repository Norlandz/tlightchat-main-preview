class RTCPeerConnectionMock implements RTCPeerConnection {
  canTrickleIceCandidates: boolean | null = null;
  connectionState: RTCPeerConnectionState;
  currentLocalDescription: RTCSessionDescription | null = null;
  currentRemoteDescription: RTCSessionDescription | null = null;
  iceConnectionState: RTCIceConnectionState;
  iceGatheringState: RTCIceGatheringState;
  localDescription: RTCSessionDescription | null = null;
  onconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  ondatachannel: ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null = null;
  onicecandidate: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null = null;
  onicecandidateerror: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  oniceconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  onicegatheringstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  onnegotiationneeded: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  onsignalingstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null = null;
  ontrack: ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null = null;
  pendingLocalDescription: RTCSessionDescription | null = null;
  pendingRemoteDescription: RTCSessionDescription | null = null;
  remoteDescription: RTCSessionDescription | null = null;
  sctp: RTCSctpTransport | null = null;
  signalingState: RTCSignalingState;

  constructor(configuration?: RTCConfiguration) {
    this.connectionState = 'new';
    this.iceConnectionState = 'new';
    this.iceGatheringState = 'new';
    this.signalingState = 'stable';
  }

  addIceCandidate(candidate?: RTCIceCandidateInit | RTCIceCandidate): Promise<void> {
    return Promise.resolve();
  }

  addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender {
    return {} as RTCRtpSender;
  }

  addTransceiver(trackOrKind: MediaStreamTrack | string, init?: RTCRtpTransceiverInit): RTCRtpTransceiver {
    return {} as RTCRtpTransceiver;
  }

  close(): void {}

  // @ts-ignore function overload thing...
  createAnswer(options?: RTCAnswerOptions): Promise<RTCSessionDescriptionInit> {
    return Promise.resolve({ type: 'answer', sdp: '' });
  }

  createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel {
    return {} as RTCDataChannel;
  }

  // @ts-ignore function overload thing...
  createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit> {
    return Promise.resolve({ type: 'offer', sdp: '' });
  }

  // addIceCandidate(candidate: RTCIceCandidateInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
  // createOffer(successCallback: RTCSessionDescriptionCallback, failureCallback: RTCPeerConnectionErrorCallback, options?: RTCOfferOptions): Promise<void>;
  // createAnswer(successCallback: RTCSessionDescriptionCallback, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
  // setLocalDescription(description: RTCLocalSessionDescriptionInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
  // setRemoteDescription(description: RTCSessionDescriptionInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;

  getConfiguration(): RTCConfiguration {
    return {} as RTCConfiguration;
  }

  getIdentityAssertion(): Promise<string> {
    return Promise.resolve('');
  }

  getReceivers(): RTCRtpReceiver[] {
    return [];
  }

  getSenders(): RTCRtpSender[] {
    return [];
  }

  getStats(selector?: MediaStreamTrack | null): Promise<RTCStatsReport> {
    return Promise.resolve({} as RTCStatsReport);
  }

  removeTrack(sender: RTCRtpSender): void {}

  setLocalDescription(description: RTCSessionDescriptionInit): Promise<void> {
    return Promise.resolve();
  }

  setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    return Promise.resolve();
  }

  setConfiguration(configuration: RTCConfiguration): void {}

  // setIdentityProvider(provider: string, options?: RTCIdentityProviderOptions): void {}

  getLocalStreams(): MediaStream[] {
    return [];
  }

  getRemoteStreams(): MediaStream[] {
    return [];
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {}

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {}

  dispatchEvent(event: Event): boolean {
    return true;
  }
}
