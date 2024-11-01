import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import '/src/styles/BuyButton.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const BuyButton = ({ selectedItem, socketRef, setBalance }) => {
   const { t } = useTranslation();
   const socket = socketRef.current;

   const badPayment = useCallback(() => {
      tg_haptic.notificationOccurred('warning');

      enqueueSnackbar(`${t('notification_notbuy')}`, {
         anchorOrigin: { vertical: 'top', horizontal: 'center' },
         autoHideDuration: 1000,
         variant: 'warning',
         preventDuplicate: true
      });
   }, [t]);

   const goodPayment = useCallback((selectedItem, userId, cost) => {
      tg_haptic.impactOccurred('light');
      socket.emit('remove_wallet', { userId, amount: cost });

      socket.once('wallet_balance', (data) => {
         setBalance(data.wallet);
       });

      console.log('Куплен предмет с ID', selectedItem.id);
      enqueueSnackbar(`${t('notification_buy')} ${selectedItem.title}`, {
         anchorOrigin: { vertical: 'top', horizontal: 'center' },
         autoHideDuration: 1000
      });
   }, [socket, t]);

   const handleClick = () => {
      const userId = 1;
      const cost = 5;

      socket.emit('get_wallet', { userId });

      socket.once('wallet_balance', (data) => {
         console.log(data.wallet);
         if (data.wallet < cost) {
            badPayment();
         } else {
            goodPayment(selectedItem, userId, cost);
         }
      });
   };

   useEffect(() => {
      return () => {
         socket.off('wallet_balance');
      };
   }, [socket]);

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
