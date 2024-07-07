import { React, useState, useEffect } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import '/src/styles/Counter.css'

const amount = 0;
const delta = 0.17;

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
         <AnimatedCounter value={counterValue} color="white" fontSize="20px" />
      </div>
   );
};

export default Counter;