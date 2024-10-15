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
  const [isFinished, setIsFinished] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [buttonText, setButtonText] = useState(t('button_start_text'));

  const userId = 1;

  // useEffect(() => {
  //   if (socket) {
  //     console.log('Получение состояния кнопки')

  //     socket.emit('get_start_button', { userId });
  //     socket.on('mining_balance', (data) => {
  //       setCounterValue(data.mining_balance);

  //       if (data.status === 'in_process') {
  //         setIsAvailable(false);
  //         setButtonText(t('button_farming_text'));
  //         inFarming();
  //       } else if (data.status === 'finished') {
  //         setIsFinished(true);
  //         setIsAvailable(false);
  //       }
  //     });
  //   }
  // }, [socket]);

  // в процессе работы
  useEffect(() => {
    if (!isAvailable && isAnimation) {
      const interval = setInterval(() => {
        socket.on('mining_balance', (data) => {
          setCounterValue(data.mining_balance);
          if (data.status === 'finished') {
            setIsFinished(true);
            setButtonText(`${t('button_collect_text')} ${data.mining_balance.toFixed(2)}`);
            clearInterval(interval);
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAvailable, isAnimation, setCounterValue]);

  // для запуска или сбора 
  const handleClick = () => {
    if (isAvailable && !isAnimation) {
      socket.emit('mining', { userId });
      tg_haptic.impactOccurred('medium');

      setIsAnimation(true);
      setIsAvailable(false);
      setButtonText(t('button_launch_text'));

      setTimeout(() => {
        tg_haptic.impactOccurred('soft');
        setIsAnimation(false);
        setButtonText(t('button_farming_text'));
      }, 6000);
    } else if (isFinished) {
      onCollect(counterValue);
      setIsFinished(false);
      setButtonText(t('button_start_text'));
      setIsAvailable(true);
      setCounterValue(0);
    }
  };

  const getButtonColor = () => {
    if (isAvailable) return '#D48665';
    if (isFinished) return '#6cbf6b';
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
