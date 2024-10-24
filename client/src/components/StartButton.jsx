import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from 'react-animated-term';
import 'react-animated-term/dist/react-animated-term.css';
import { useTranslation } from 'react-i18next';

import '/src/styles/StartButton.css';
import Counter from './Counter';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const termLines = [
  { text: 'cd home/dev/Farming/KSP', cmd: true, delay: 5 },
  { text: './exmbit.bin', cmd: true, delay: 5 },
  {
    text: '✔ Loaded job',
    cmd: false,
    repeat: true,
    repeatCount: 5,
    frames: spinner.map((spin) => ({
      text: `${spin} Loading job`,
      delay: 20,
    })),
  },
  { text: 'Work in progress...', cmd: false },
];

const StartButton = ({ counterValue, setCounterValue, onCollect, socketRef }) => {
  const { t } = useTranslation();
  const socket = socketRef.current;

  const [isAnimation, setIsAnimation] = useState(false);
  const [status, setStatus] = useState('not_started');
  const [buttonText, setButtonText] = useState(t('button_start_text'));

  const userId = 1;

  useEffect(() => {
    if (socket) {
      const interval = setInterval(() => {
        socket.emit('get_start_button', { userId });

        socket.on('start_button', (data) => {

          setStatus(data.status);
          setCounterValue(data.mining_balance);

          if (data.status === 'in_process') {
            console.log('Майнинг в процессе');
            setStatus('in_process');
            setButtonText(t('button_farming_text'));

          } else if (data.status === 'finished') {
            setStatus('finished');

            console.log('Майнинг завершен', counterValue);

            setButtonText(`${t('button_collect_text')} ${data.mining_balance.toFixed(2)}`);
          }
        });
      }, 1000);

     return () => clearInterval(interval);
    }

  }, [socket]);

  const handleClick = () => {
    if (status === 'not_started') {
      socket.emit('mining', { userId });
      tg_haptic.impactOccurred('medium');

      setIsAnimation(true);
      setButtonText(t('button_launch_text'));

      setTimeout(() => {
        tg_haptic.impactOccurred('soft');
        setIsAnimation(false);
        setButtonText(t('button_farming_text'));
      }, 6000);
    } else if (status === 'finished') {
      onCollect(counterValue);

      socket.emit('mining_collect', { userId });

      setButtonText(t('button_start_text'));
      setStatus('not_started');
      setCounterValue(0);
    }
  };

  const getButtonColor = () => {
    if (status === 'not_started') return '#D48665';
    else if (status === 'finished') return '#6cbf6b';
    return '#493f3b';
  };

  return (
    <div className='button-wrap'>
      <motion.button
        onClick={handleClick}
        className='start-button'
        animate={{ backgroundColor: getButtonColor(), y: isAnimation ? -50 : 0 }}
        transition={{ type: 'spring', mass: 1, stiffness: 40 }}
        disabled={isAnimation}
      >
        {buttonText}
        {buttonText === t('button_farming_text') && (
          <Counter counterValue={counterValue} setCounterValue={setCounterValue} />
        )}
      </motion.button>
      <AnimatePresence>
        {isAnimation && (
          <motion.div
            className='terminal'
            initial={{ opacity: 0, height: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 0.99, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.65, height: 70 }}
            transition={{ type: 'spring', mass: 0.7, stiffness: 40 }}
          >
            <Terminal height={140} lines={termLines} interval={30} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StartButton;
