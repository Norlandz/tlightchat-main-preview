import { v4 as uuidv4 } from 'uuid';
import { WebrtcConnectionAnchorId, MediaStreamId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { WebrtcConnectionAnchor } from './WebrtcConnectionAnchor';

                                                                                                         
                               
                                                                         
                                        
      
    
  
                                                                        
                                                   
                             
      
    

function copyMap<K, V>(srcMap: Map<K, V>, destMap: Map<K, V>) {
  destMap.clear();

  for (const item of srcMap) {
    destMap.set(item[0], item[1]);
  }
}

export class MppWebrtcConnectionAnchor implements Iterable<[WebrtcConnectionAnchorId, WebrtcConnectionAnchor]> {
  public readonly uuid = uuidv4();          
                                                                                              
    
                                                                           
                                          
                                                                                             
                 
                                                                                   
          
        

  private readonly mpp_underlying = new Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying);                     
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }
  public entries = this.mpp_underlying.entries.bind(this.mpp_underlying);
                                                                            
                
                                                        
      
                                                                                                                                                         

  public static init(mppWebrtcConnectionAnchor: MppWebrtcConnectionAnchor) {
    const MM = new MppWebrtcConnectionAnchor();
    copyMap(mppWebrtcConnectionAnchor.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}

export class MppMediaStream implements Iterable<[MediaStreamId, MediaStream]> {
  private readonly mpp_underlying = new Map<MediaStreamId, MediaStream>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying);
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }

  public static init(mppMediaStream: MppMediaStream) {
    const MM = new MppMediaStream();
    copyMap(mppMediaStream.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}
