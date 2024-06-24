import { React, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import ClickAwayListener from '@mui/material/ClickAwayListener';

import '/src/styles/Market.css';

const Market = ({ items }) => {
   const [selectedItem, setSelectedItem] = useState(null);
   const buyItem = (selectedItem) => {
      console.log('Куплен предмет с ID', selectedItem.id);
      enqueueSnackbar(`Куплен предмет ${selectedItem.title}`, {
         anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
         },
         autoHideDuration: 1000
      });
   };

   return (
      <div className='wrapper'>
         <SnackbarProvider />
         <div className='market'>
            {items.map((item) => (
               <motion.div className='card' layoutId={item.id} onClick={() => setSelectedItem(item)} key={item.id}>
                  <motion.img className='card-image' src={'src/images/image.png'} />
                  <motion.h2 className='card-title'>{item.title}</motion.h2>
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
                        <motion.img className='selected-card-image' src={'src/images/image.png'} />
                        <motion.h2 className='selected-card-title'>{selectedItem.title}</motion.h2>
                        <motion.h5 className='selected-card-description'>{selectedItem.description}</motion.h5>
                        <motion.button className='buy-button' onClick={() => buyItem(selectedItem)}>Купить</motion.button>
                     </motion.div>
                  </ClickAwayListener>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Market;