import { v4 as uuidv4 } from 'uuid';
import { WebrtcConnectionAnchorId, MediaStreamId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { WebrtcConnectionAnchor } from './WebrtcConnectionAnchor';


export class MppWebrtcConnectionAnchor extends Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor> {
  uuid = uuidv4();          
  constructor(mppWebrtcConnectionAnchor?: MppWebrtcConnectionAnchor) {
    super(mppWebrtcConnectionAnchor);
  }
}

export class MppMediaStream extends Map<MediaStreamId, MediaStream> {
  constructor(mppMediaStream?: MppMediaStream) {
    super(mppMediaStream);
  }
}
