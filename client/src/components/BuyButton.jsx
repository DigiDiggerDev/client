import React from 'react';
import { motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';

import '/src/styles/BuyButton.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const BuyButton = ({ selectedItem }) => {
   const handleClick = () => {
      tg_haptic.impactOccurred('light');

      console.log('Куплен предмет с ID', selectedItem.id);
      enqueueSnackbar(`Куплен предмет ${selectedItem.title}`, {
         anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
         },
         autoHideDuration: 1000
      });

      
   };

   return (
      <motion.button 
         className='BuyButton' 
         onClick={handleClick}
         whileTap={{ scale: 0.9 }}
      >
         Купить
      </motion.button>
   );
};

export default BuyButton;