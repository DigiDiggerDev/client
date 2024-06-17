import React, { useState } from 'react';
import { motion } from 'framer-motion';

import '/src/styles/StartButton.css';

const StartButton = () => {
   return (
      <motion.button onClick={() => console.log('Нажата кнопка "Начать"')} className='start-button'>Начать</motion.button>
   );
};

export default StartButton;