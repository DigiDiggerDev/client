import { React, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack'
import ClickAwayListener from '@mui/material/ClickAwayListener';

import '/src/styles/Market.css';
import BuyButton from '../components/BuyButton';

const Market = ({ items, socketRef }) => {
   const [selectedItem, setSelectedItem] = useState(null);

   useEffect(() => {
      console.log(selectedItem);
   }, [selectedItem]);

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
                        <motion.img className='selected-card-image' src={'src/images/image.png'} />
                        <motion.h2 className='selected-card-title'>{selectedItem.title}</motion.h2>
                        <motion.h5 className='selected-card-description'>{selectedItem.description}</motion.h5>
                        <BuyButton selectedItem={selectedItem} socketRef={socketRef}/>
                     </motion.div>
                  </ClickAwayListener>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Market;