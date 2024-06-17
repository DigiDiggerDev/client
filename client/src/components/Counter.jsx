import React, { useState, useEffect } from 'react';
import { AnimatedCounter } from 'react-animated-counter';

const amount = 1000;
const delta = 132;

const Counter = () => {
   const [counterValue, setCounterValue] = useState(amount);

   useEffect(() => {
      const interval = setInterval(() => {
         setCounterValue(prevValue => prevValue + delta);
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <AnimatedCounter value={counterValue} color="black" fontSize="40px" />
   );
};

export default Counter;
