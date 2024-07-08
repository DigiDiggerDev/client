import React from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import '/src/styles/Balance.css'

const wallet = 100;

const Balance = ({ balance }) => {
   return (
      <div className='Balance'>
         <div>Ваш баланс: </div>
         <AnimatedCounter value={balance} color="white" fontSize="40px" />
      </div>
   );
};

export default Balance;