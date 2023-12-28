import React from 'react';
import styles from '../../../scss/index.module.css';

export const WebcamVideo: React.FC<{ webcamVideoStream: MediaStream | null }> = ({ webcamVideoStream }) => {
  // const eltVideo_Capture = document.querySelector('video[src="http://localhost:3000/payday.mp4"]') as HTMLVideoElement;
  // console.log('🚀 > file: WebcamVideo.tsx:9 > eltVideo_Capture.localMediaStream:', webcamVideoStream === eltVideo_Capture.localMediaStream);

  const eltVideo_rref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (eltVideo_rref.current === null) return;
    eltVideo_rref.current.srcObject = webcamVideoStream;
    // void (async () => {
    //   if (eltVideo_rref.current == null) throw new TypeError();
    //   eltVideo_rref.current.muted = true;
    //   await eltVideo_rref.current.play();
    //   // eltVideo_rref.current.muted = false; // seems chrome pb // not even here es pb, check getMediaStream() // actually double place need this...
    // })()
  }, [webcamVideoStream]);

  return (
    // <div style={{ border: '1px solid black'}}>
    // if autoplay, must muted (aga)
    <video ref={eltVideo_rref} muted autoPlay playsInline controls className={styles.css_WebcamVideo} />
    // <video ref={eltVideo_rref} playsInline controls className={styles.css_WebcamVideo} />
  );
};
