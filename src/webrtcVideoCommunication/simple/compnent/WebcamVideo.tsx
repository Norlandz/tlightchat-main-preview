import React from 'react';
import styles from '../../../index.module.css';

export const WebcamVideo: React.FC<{ webcamVideoStream: MediaStream | null }> = ({ webcamVideoStream }) => {
                                                                                                                          
                                                                                                                                               

  const eltVideo_rref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (eltVideo_rref.current === null) return;
    eltVideo_rref.current.srcObject = webcamVideoStream;
  }, [webcamVideoStream]);

  return (
                                                 
                                    
    <video ref={eltVideo_rref} muted autoPlay playsInline controls className={styles.css_WebcamVideo} />
  );
};
