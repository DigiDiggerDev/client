import { React, useState, useEffect, useRef } from 'react'
// import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import 'react-animated-term/dist/react-animated-term.css'
import './styles/App.css'

import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { io } from "socket.io-client";

import Market from './pages/Market';
import Home from './pages/Home';
import StartButton from './components/StartButton';
import Balance from './components/Balance';
import Boost from './pages/Boost';

const tg = window.Telegram.WebApp;
const tg_haptic = window.Telegram.WebApp.HapticFeedback;
tg.isVerticalSwipesEnabled = false;

tg.backgroundColor = '#000000';
tg.headerColor = '#000000';
tg.isVerticalSwipesEnabled = false;
tg.expand();
tg.ready();

const video_cards = [
  { id: 1, title: 'Название видеокарты 1', description: 'Описание видеокарты 1', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 2, title: 'Название видеокарты 2', description: 'Описание видеокарты 2', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 3, title: 'Название видеокарты 3', description: 'Описание видеокарты 3', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 4, title: 'Название видеокарты 4', description: 'Описание видеокарты 4', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 5, title: 'Название видеокарты 5', description: 'Описание видеокарты 5', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 6, title: 'Название видеокарты 6', description: 'Описание видеокарты 6', image: '/static/images/cards/contemplative-reptile.jpg' },
];

const psu = [
  { id: 1, title: 'Название блока питания 1', description: 'Описание блока питания 1', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 2, title: 'Название блока питания 2', description: 'Описание блока питания 2', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 3, title: 'Название блока питания 3', description: 'Описание блока питания 3', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 4, title: 'Название блока питания 4', description: 'Описание блока питания 4', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 5, title: 'Название блока питания 5', description: 'Описание блока питания 5', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 6, title: 'Название блока питания 6', description: 'Описание блока питания 6', image: '/static/images/cards/contemplative-reptile.jpg' },
];

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const userLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
      if (userLang === 'ru') {
        i18n.changeLanguage('ru');
      } else {
        i18n.changeLanguage('en');
      }
    }
  }, []);

  const [counterValue, setCounterValue] = useState(0);
  const [balance, setBalance] = useState(0);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('https://e1zmhd-176-59-170-9.ru.tuna.am', {
        transports: ['websocket']
      });
  
      const socket = socketRef.current;
      const userId = 1;
  
      if (socket) {
        socket.emit('get_wallet', { userId });
  
        socket.on('wallet_balance', (data) => {
          setBalance(data.wallet);
        });
  
        socket.on('error', (error) => {
          console.error('Socket error:', error);
        });
      }
      else {
        console.error('Socket not initialized');
      }
  
      return () => {
        if (socket.connected) {
          socketRef.current.disconnect();
        }
      };
    }
    // const socket = io('http://127.0.0.1:8000');
    
  }, []);

  const handleCollect = (collected) => {
    tg_haptic.notificationOccurred('success');
    setBalance(balance + collected);

    const socket = socketRef.current;

    const userId = 1;

    socket.emit('add_wallet', { userId, amount: collected });
  };

  return (
    <div className='App'>
      <div className='app-block'>
        <p>{t('rotate')}</p>
        <img src="src/images/rotate.png" alt="" />
      </div>
      <div className='app-wrapper'>
        <div className='debug'>DEBUG. API version: {tg.version}. Height: {tg.viewportHeight}</div>
        <Balance balance={balance} />

        <Tabs>
          <TabList className='global-tabs'>
            <Tab className={'global-tab global-tab-market react-tabs__tab'} onClick={() => tg_haptic.impactOccurred('soft')}>{t('market')}</Tab>
            <Tab className={'global-tab global-tab-home react-tabs__tab'} onClick={() => tg_haptic.impactOccurred('soft')}>{t('home')}</Tab>
            <Tab className={'global-tab global-tab-boost react-tabs__tab'} onClick={() => tg_haptic.impactOccurred('soft')}>{t('boost')}</Tab>
          </TabList>

          <TabPanel>
            <Tabs>
              <TabList className='market-tabs'>
                <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('video_cards')}</Tab>
                <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('psu')}</Tab>
              </TabList>

              <TabPanel>
                <Market items={video_cards} socketRef={socketRef} setBalance={setBalance} />
              </TabPanel>

              <TabPanel>
                <Market items={psu} socketRef={socketRef} />
              </TabPanel>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Home />
          </TabPanel>

          <TabPanel>
            <Boost balance={balance} setBalance={setBalance} socketRef={socketRef} />
          </TabPanel>
        </Tabs>

        <StartButton counterValue={counterValue} setCounterValue={setCounterValue} onCollect={handleCollect} socketRef={socketRef} />
      </div>
    </div>
  )
}

export default App