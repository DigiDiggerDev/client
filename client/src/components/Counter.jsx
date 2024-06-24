import { React, useState, useEffect } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import '/src/styles/Counter.css'

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
      <div className='Counter'>
         <AnimatedCounter value={counterValue} color="white" fontSize="40px" />
      </div>
   );
};

export default Counter;