import { React } from 'react';
import axios from 'axios';

import '/src/styles/Boost.css';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const Boost = ({ balance, setBalance }) => {
   const collected = 0.01;

   const addUserWallet = async (userId, amount) => {
      try {
         const response = await axios.post(`https://ymp1tc-109-252-37-67.ru.tuna.am/users/wallet/${userId}?amount=${amount}`);
         console.log('Response:', response.data);
      } catch (error) {
         console.error('Error:', error);
      }
   };

   const handleClick = () => {
      tg_haptic.impactOccurred('medium');
      setBalance(balance + collected);

      const userId = 1;
      addUserWallet(userId, collected);
   }

   return (
      <div className='Boost'>
         <button className='boost-button' onClick={handleClick}>Boost</button>
      </div>
   );
};

export default Boost;