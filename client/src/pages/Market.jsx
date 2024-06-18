import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import '/src/styles/Market.css';

import ClickAwayListener from '@mui/material/ClickAwayListener';

const items = [
   { id: 1, title: 'Название видеокарты 1', description: 'Описание видеокарты 1', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 2, title: 'Название видеокарты 2', description: 'Описание видеокарты 2', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 3, title: 'Название видеокарты 3', description: 'Описание видеокарты 3', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 4, title: 'Название видеокарты 1', description: 'Описание видеокарты 1', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 5, title: 'Название видеокарты 2', description: 'Описание видеокарты 2', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 6, title: 'Название видеокарты 3', description: 'Описание видеокарты 3', image: '/static/images/cards/contemplative-reptile.jpg' },
];

const Market = () => {
   const [selectedItem, setSelectedItem] = useState(null);

   const buyItem = (itemId) => {
      console.log('Куплен предмет с ID', itemId);
   };

   return (
      <div className='wrapper'>
         <div className='market'>
            {items.map((item) => (
               <motion.div className='card' layoutId={item.id} onClick={() => setSelectedItem(item)} key={item.id}>
                  <motion.h2>{item.title}</motion.h2>
               </motion.div>
            ))}

            <AnimatePresence>
               {selectedItem && (
                  <ClickAwayListener onClickAway={() => setSelectedItem(null)}>
                     <motion.div
                        className='selected-card'
                        layoutId={selectedItem.id}
                        style={{
                           position: 'fixed',
                           top: '10%',
                           left: '10%',
                           width: '50%',
                           height: '50%',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center'
                        }}
                     >
                        <motion.button className='close-button' onClick={() => setSelectedItem(null)} />
                        <motion.h2>{selectedItem.title}</motion.h2>
                        <motion.h5>{selectedItem.description}</motion.h5>
                        <motion.button className='buy-button' onClick={() => buyItem(selectedItem.id)}>Купить</motion.button>
                     </motion.div>
                  </ClickAwayListener>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Market;