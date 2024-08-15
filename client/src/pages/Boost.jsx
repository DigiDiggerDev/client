import { React } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import '/src/styles/Boost.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const Boost = ({ balance, setBalance }) => {
   const collected = 0.01;

   const socket = io('http://127.0.0.1:8000');

   const handleClick = () => {
      tg_haptic.impactOccurred('medium');
      setBalance(balance + collected);

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