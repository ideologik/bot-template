import React, { useState } from 'react';
import AudioVisualizer from './soundWave';
import audio from '../../resouses/amen-break-no-copyright-remake-120bpm-25924.mp3'
const ComponentWave: React.FC = () => {
  const [touch, settouch] = useState(false)
  return (
    <div>
      <button onClick={() => settouch(!touch)} style={{ marginBottom: '.5rem' }}>
        {touch ? 'Pause' : 'Play'}
      </button>
      {
        touch ?
          <AudioVisualizer audioSrc={audio} barCount={16} barColors={['#FF0']} />
          : <></>
      }
    </div>
  );
};

export default ComponentWave;
