import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "./sound.css"

interface AudioVisualizerProps {
  audioSrc: string;
  barCount: number;
  barColors: string[];
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;


const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioSrc, barCount }) => {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  useEffect(() => {
    const audioElement = new Audio(audioSrc);
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = getNextPowerOfTwo(barCount * 2);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualization = () => {
      analyser.getByteFrequencyData(dataArray);
      const barHeights = Array.from(dataArray).map(value => (value / 255) * 100);
      setBarHeights(barHeights);
      requestAnimationFrame(updateVisualization);
    };

    audioElement.play();
    updateVisualization();

    return () => {
      audioElement.pause();
      audioElement.src = '';
      audioSource.disconnect();
      analyser.disconnect();
    };
  }, [audioSrc, barCount]);

  const getNextPowerOfTwo = (value: number) => {
    let power = 1;
    while (power < value) {
      power *= 2;
    }
    return power;
  };

  return (
    <Container>
      {/* {barHeights.map((height, index) => (
        <Bar key={index} color={barColors[index % barColors.length]} height={height} />
      ))} */}

      {
        barHeights.map((height, index) => {
          if (height) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '.4rem', margin: '0 1rem' }}>
                {numbers.map((e, index) => {
                  if (height / 10 <= index) {
                    return (<img key={index} className='avance' src='/public/template/px_audio-off.png' />)
                  } else {
                    return (<img key={index} className='avance' src='/public/template/px_audio-on1.png' />)
                  }
                })}
              </div>)
          } else {
            return (<></>)
          }
        })
      }
    </Container>
  );
};

export default AudioVisualizer;
