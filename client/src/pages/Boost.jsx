import { React } from 'react';

import '/src/styles/Boost.css';

const Boost = ({ balance, setBalance }) => {
   const handleClick = () => {
      setBalance(balance + 0.01);
   }

   return (
      <div className='Boost'>
         <button className='boost-button' onClick={handleClick}>Boost</button>
      </div>
   );
};

export default Boost;