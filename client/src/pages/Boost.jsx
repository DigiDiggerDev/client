import { React } from 'react';

import '/src/styles/Boost.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const Boost = ({ balance, setBalance, socketRef }) => {
   const collected = 0.01;

   const handleClick = () => {
      tg_haptic.impactOccurred('medium');
      setBalance(balance + collected);

      const socket = socketRef.current;

      const userId = 1;
      
      socket.emit('add_wallet', { userId, amount: collected });
   };

   return (
      <div className='Boost'>
         <button className='boost-button' onClick={handleClick}>Boost</button>
      </div>
   );
};

export default Boost;