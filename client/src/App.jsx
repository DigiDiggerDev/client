import { React, useState, useEffect, useRef } from 'react'
import axios from 'axios'
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
tg.lockOrientation();

const fetchAndCacheData = async (key, apiUrl, setState) => {
  tg.CloudStorage.getItem(key, (error, value) => {
    if (!error && value) {
      console.log(`Данные для ${key} получены из CloudStorage`);
      setState(JSON.parse(value)); 
    } else {
      axios.get(apiUrl)
        .then(response => {
          const data = response.data;
          setState(data);

          tg.CloudStorage.setItem(key, JSON.stringify(data), (error, success) => {
            if (error) console.error(`Ошибка сохранения ${key} в CloudStorage:`, error);
            else console.log(`Данные для ${key} сохранены в CloudStorage`);
          });
        })
        .catch(error => console.error(`Ошибка загрузки ${key} с API:`, error));
    }
  });
};

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

  const [vcCards, setVcCards] = useState([]);
  const [psuCards, setPsuCards] = useState([]);

  const socketRef = useRef(null);

  const address = 'https://gnw9dk-2a00-1370-817a-658c-c8df-286f-64c3-c2b0.ru.tuna.am'

  useEffect(() => {
    fetchAndCacheData("videoCards", `${address}/api/cards/video`, setVcCards);
    fetchAndCacheData("psuCards", `${address}/api/cards/psu`, setPsuCards);
  }, []);
  
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(address, {
        transports: ['websocket']
      });
  
      const socket = socketRef.current;
      // const userId = 1;
      const userId = tg.initDataUnsafe.user.id;
  
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
    
  }, []);

  // исправить
  const handleCollect = (collected) => {
    tg_haptic.notificationOccurred('success');
    setBalance(balance + collected);

    const socket = socketRef.current;

    const userId = tg.initDataUnsafe.user.id;

    socket.emit('add_wallet', { userId, amount: collected });
  };

  return (
    <div className='App'>
      <div className='app-block'>
        <p>{t('rotate')}</p>
        <img src="src/images/rotate.png" alt="" />
      </div>
      <div className='app-wrapper'>
        <div className='debug'>DEBUG: API version: {tg.version}. Height: {tg.viewportHeight}</div>
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
                <Market items={vcCards} socketRef={socketRef} setBalance={setBalance} />
              </TabPanel>

              <TabPanel>
                <Market items={psuCards} socketRef={socketRef} setBalance={setBalance} />
              </TabPanel>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Home socketRef={socketRef} />
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