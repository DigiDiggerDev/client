import React from 'react';
import { motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import '/src/styles/BuyButton.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const BuyButton = ({ selectedItem }) => {
   const { t } = useTranslation();

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
         {t('buy_button')}
      </motion.button>
   );
};

export default BuyButton;