import { v4 as uuidv4 } from 'uuid';
class MediaStreamMock implements MediaStream {
  constructor() {
                                         
  }

  addTrack(track: MediaStreamTrack): void {}

  clone(): MediaStream {
    return new MediaStreamMock();
  }

  getAudioTracks(): MediaStreamTrack[] {
    return [];
  }

  getTrackById(trackId: string): MediaStreamTrack | null {
    return null;
  }

  getTracks(): MediaStreamTrack[] {
    return [];
  }

  getVideoTracks(): MediaStreamTrack[] {
    return [];
  }

  removeTrack(track: MediaStreamTrack): void {}

  getConstraints(): MediaTrackConstraints {
    return {};
  }

  getEnded(): boolean {
    return false;
  }

  getMuted(): boolean {
    return false;
  }

  getStreamById(streamId: string): MediaStream | null {
    return null;
  }

  active: boolean = false;
  id: string = uuidv4();

  onactive: EventListener | null = null;
  onaddtrack: EventListener | null = null;
  oninactive: EventListener | null = null;
  onremovetrack: EventListener | null = null;
  onended: EventListener | null = null;
  onmute: EventListener | null = null;
  onunmute: EventListener | null = null;

                                                
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {}
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {}
  dispatchEvent(event: Event): boolean {
    return false;
  }
}

                                               
jest.mock('your-path-to-MediaStream', () => {
  return {
    default: MediaStreamMock
  };
});