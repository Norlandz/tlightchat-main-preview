import React from 'react';
import styles from '../../../index.module.css';

export const WebcamVideo: React.FC<{ webcamVideoStream: MediaStream }> = ({ webcamVideoStream }) => {
                                                                                                                          
                                                                                                                                               

  const eltVideo_rref = React.useRef<HTMLVideoElement>(null);

                              
  React.useEffect(() => { eltVideo_rref.current!.srcObject = webcamVideoStream; }, []);                   
  return (
                                                 
                                    
    <video ref={eltVideo_rref} muted autoPlay playsInline controls className={styles.css_WebcamVideo} />
  );
};
