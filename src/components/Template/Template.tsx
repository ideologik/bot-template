import React, { useState } from 'react'
import "./Template.css";
import ComponentWave from '../soundBar/SoundWaveComponent';

export const Template = () => {
  const [state, setstate] = useState('LOREM IPSUM DOLOR SIT AMET CONSECTETUR, ADIPISICING ELIT. CUPIDITATE TEMPORE APERIAM VOLUPTATES VITAE DOLORUM ELIGENDI. CONSEQUUNTUR QUOD EA VEL ASPERNATUR PORRO MODI AT EXPEDITA HARUM DESERUNT NISI, IMPEDIT, ALIQUID CUMQUE?')
  const [ProgresBar, setProgresBar] = useState(50)

  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);


  return (
    <div className='ContainerRobot'>
      <div className='Btn_mic_off' />
      <div className='separador' />
      <div className='chat-bot' >
        <p className='Text-area' >{state}</p>
      </div>
      <div className='chat-user' >
        <p className='Text-area' >{state}</p>
      </div>
      <div className='bootom-fade' />
      <div className='content-footer' >
        <div>
          <div className='btn-Bateria' />
          <div className='btn-volver' />
          <div className='btn-Avanzar' />
        </div>
        <div className='ProgressBar'>
          {
            numbers.map((e, index) => {
              if (ProgresBar / 10 * 2 <= index) {
                return (<img className='avance' src='/public/template/avance_off.png' />)
              } else {
                return (<img className='avance' src='/public/template/avance_on.png' />)
              }

            })
          }
        </div>
      </div>
      <div className='content-footer-Audio' >
        <ComponentWave />
      </div>
    </div>
  )
}
