import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from 'react-animated-term';
import 'react-animated-term/dist/react-animated-term.css';

import '/src/styles/StartButton.css';
import Counter from './Counter';

const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const termLines = [
   {
      text: 'cd home/dev/Mining/KRB',
      cmd: true,
      delay: 5
   },
   {
      text: './xmbit.bin',
      cmd: true,
      delay: 5
   },
   {
      text: '✔ Loaded job',
      cmd: false,
      repeat: true,
      repeatCount: 5,
      frames: spinner.map(function (spinner) {
         return {
            text: spinner + ' Loading job',
            delay: 20
         }
      })
   },
   {
      text: 'Work in progress...',
      cmd: false
   }
]

const StartButton = () => {
   const [isClicked, setIsClicked] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const [isAvailable, setIsAvailable] = useState(true);
   const [clickTime, setClickTime] = useState(null);
   const [buttonText, setButtonText] = useState('Начать');
   const [counterValue, setCounterValue] = useState(0);
   const delta = 0.17;

   const handleClick = () => {
      if (!isClicked && isAvailable) {
         setIsClicked(true);
         setIsAvailable(false);

         console.log('Нажата кнопка "Начать"');

         const now = new Date();
         setClickTime(now);

         setButtonText('Запуск...');

         setTimeout(() => {
            setIsClicked(false);
            setButtonText('Идёт добыча...');
         }, 6000);
      }
      else if (!isClicked && isFinished) {
         const now = new Date();

         console.log(counterValue)

         setIsFinished(false);
         setButtonText('Начать');
         setIsAvailable(true);
         setClickTime(now);
         setCounterValue(0);
      }
   };

   useEffect(() => {
      if (!isAvailable && clickTime) {
         const interval = setInterval(() => {
            const now = new Date();
            if (now - clickTime >= 12000) {
               setIsFinished(true);
               setButtonText(`Собрать ${counterValue.toFixed(2)}`);
               clearInterval(interval);
            }
            else if (now - clickTime >= 6200) {
               setCounterValue(prevValue => prevValue + delta);
            }
         }, 1000);

         return () => clearInterval(interval);
      }
   }, [clickTime, isAvailable, counterValue]);

   const getButtonColor = () => {
      if (isAvailable) {
         return '#D48665';
      }
      else if (isFinished) {
         return '#6cbf6b';
      }
      else {
         return '#493f3b';
      }
   };

   return (
      <div className='button-wrap'>
         <motion.button
            onClick={handleClick}
            className='start-button'
            animate={{
               backgroundColor: getButtonColor(),
               y: isClicked ? -50 : 0
            }}
            transition={{ type: 'spring', mass: 1, stiffness: 40 }}
            disabled={isClicked}
         >
            {buttonText}
            {buttonText === 'Идёт добыча...' && <Counter counterValue={counterValue} setCounterValue={setCounterValue} delta={delta} /> || buttonText === 'Собрать'}
         </motion.button>
         <AnimatePresence>
            {isClicked && (
               <motion.div
                  className='terminal'
                  initial={{ opacity: 0, height: 0, scale: 0.65 }}
                  animate={{ opacity: 1, scale: 0.99, height: 'auto' }}
                  exit={{ opacity: 0, scale: 0.65, height: 70 }}
                  transition={{ type: 'spring', mass: 0.7, stiffness: 40 }}
               >
                  <Terminal
                     height={140}
                     lines={termLines}
                     interval={30}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default StartButton;