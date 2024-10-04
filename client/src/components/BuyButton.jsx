import React from 'react';
import { motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import '/src/styles/BuyButton.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const BuyButton = ({ selectedItem, socketRef }) => {
   const { t } = useTranslation();

   const badPayment = () => {
      tg_haptic.notificationOccurred('warning');

      enqueueSnackbar(`${t('notification_notbuy')}`, {
         anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
         },
         autoHideDuration: 1000,
         variant: 'warning'
      });
   };

   const goodPayment = ({ selectedItem, userId, cost }) => {
      tg_haptic.impactOccurred('light');

      socket.emit('remove_wallet', { userId, amount: cost });

      console.log('Куплен предмет с ID', selectedItem.id);
      enqueueSnackbar(`${t('notification_buy')} ${selectedItem.title}`, {
         anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
         },
         autoHideDuration: 1000
      });
   };

   const handleClick = () => {
      var balance = 0;

      const userId = 1;
      const cost = 5;
      
      const socket = socketRef.current;

      socket.emit('get_wallet', { userId });

      socket.on('wallet_balance', (data) => {
         balance = data.wallet;
      });

      if (balance < cost) {
         badPayment();
      }
      else {
         goodPayment( selectedItem, userId, cost );
      }
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