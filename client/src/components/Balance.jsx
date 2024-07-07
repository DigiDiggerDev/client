import { React, useState, useEffect } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import '/src/styles/Balance.css'

const amount = 1000;
const delta = 132;

const Balance = () => {
   const [counterValue, setCounterValue] = useState(amount);

   return (
      <div className='Balance'>
         <AnimatedCounter value={counterValue} color="white" fontSize="40px" />
      </div>
   );
};

export default Balance;