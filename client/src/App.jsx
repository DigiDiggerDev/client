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

const fetchAndCacheData = async (key, apiUrl, metaUrl, setState) => {
  tg.CloudStorage.getItem(key, (error, cachedValue) => {
    const cachedData = !error && cachedValue ? JSON.parse(cachedValue) : null;

    axios.get(metaUrl)
      .then(metaResponse => {
        const serverVersion = metaResponse.data.version;

        if (cachedData && cachedData.version === serverVersion) {
          console.log(`Данные для ${key} актуальны. Используем кеш.`);
          setState(cachedData.data);
        } else {
          console.log(`Данные для ${key} устарели. Удаляем старые данные и загружаем новые.`);

          // Удаляем устаревшие данные из CloudStorage
          tg.CloudStorage.removeItem(key, (removeError) => {
            if (removeError) {
              console.error(`Ошибка удаления устаревших данных ${key} из CloudStorage:`, removeError);
            } else {
              console.log(`Устаревшие данные для ${key} успешно удалены из CloudStorage.`);
            }
          });

          // Загружаем новые данные
          axios.get(apiUrl)
            .then(dataResponse => {
              const newData = dataResponse.data;
              setState(newData);

              const dataToCache = {
                version: serverVersion,
                data: newData,
              };

              tg.CloudStorage.setItem(key, JSON.stringify(dataToCache), (setError) => {
                if (setError) console.error(`Ошибка сохранения ${key} в CloudStorage:`, setError);
                else console.log(`Данные для ${key} обновлены в CloudStorage`);
              });
            })
            .catch(fetchError => console.error(`Ошибка загрузки ${key} с API:`, fetchError));
        }
      })
      .catch(metaError => {
        console.error(`Ошибка получения метаинформации для ${key}:`, metaError);
        if (cachedData) {
          console.log(`Используем устаревшие данные для ${key} из кеша.`);
          setState(cachedData.data);
        }
      });
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

  const address = 'https://jvkgkj-2a00-1370-817a-658c-c8df-286f-64c3-c2b0.ru.tuna.am'

  useEffect(() => {
    fetchAndCacheData(
      'video_cards',
      `${address}/api/cards/video`,
      `${address}/api/cards/video/meta`,
      setVcCards
    );

    fetchAndCacheData(
      'psu_cards',
      `${address}/api/cards/psu`,
      `${address}/api/cards/psu/meta`,
      setPsuCards
    );
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
        <div className='debug'>DEBUG: APIv: {tg.version}. H: {tg.viewportHeight}</div>
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