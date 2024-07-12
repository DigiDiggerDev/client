import React from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import { useTranslation } from 'react-i18next';
import '/src/styles/Balance.css'

const wallet = 100;

const Balance = ({ balance }) => {
   const { t } = useTranslation();

   return (
      <div className='Balance'>
         <div>{t('balance')}</div>
         <AnimatedCounter value={balance} color="white" fontSize="40px" />
      </div>
   );
};

export default Balance;