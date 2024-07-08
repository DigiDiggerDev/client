import { React } from 'react';

import '/src/styles/Boost.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const Boost = ({ balance, setBalance }) => {
   const handleClick = () => {
      tg_haptic.impactOccurred('medium');
      setBalance(balance + 0.01);
   }

   return (
      <div className='Boost'>
         <button className='boost-button' onClick={handleClick}>Boost</button>
      </div>
   );
};

export default Boost;