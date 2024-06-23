import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from 'react-animated-term';
import 'react-animated-term/dist/react-animated-term.css';

import '/src/styles/StartButton.css';

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

   const handleClick = () => {
      if (!isClicked) {
         setIsClicked(true);
         console.log('Нажата кнопка "Начать"');

         setTimeout(() => {
            setIsClicked(false);
            console.log('Кнопка "Начать" снова доступна');
         }, 6000);
      }
   };

   return (
      <div className='button-wrap'>
         <motion.button
            onClick={handleClick}
            className='start-button'
            animate={isClicked ? { y: -50 } : { y: 0 }}
            transition={{ duration: 1, type: 'spring', mass: 1, stiffness: 40 }}
            disabled={isClicked}
         >
            Начать
         </motion.button>
         <AnimatePresence>
            {isClicked && (
               <motion.div
                  className='terminal'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, scale: 0.99, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 1, type: 'spring', mass: 0.7, stiffness: 40 }}
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