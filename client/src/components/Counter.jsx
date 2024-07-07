import React from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import '/src/styles/Counter.css';

const Counter = ({ counterValue }) => {
   return (
      <div className='Counter'>
         <AnimatedCounter value={counterValue} color="white" fontSize="20px" />
      </div>
   );
};

export default Counter;