import { React, useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-animated-term/dist/react-animated-term.css'
import './styles/App.css'

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

import Market from './pages/Market';
import Home from './pages/Home';
import StartButton from './components/StartButton';
import Balance from './components/Balance';
import Boost from './pages/Boost';

const tg = window.Telegram.WebApp;
const tg_haptic = window.Telegram.WebApp.HapticFeedback;

tg.backgroundColor = '#000000';
tg.headerColor = '#000000';
tg.isVerticalSwipesEnabled = false;
tg.expand();

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
      const userLang = window.Telegram.WebApp.initDataUnsafe.user.language_code;
      if (userLang === 'ru') {
        i18n.changeLanguage('ru');
      } else {
        i18n.changeLanguage('en');
      }
    }
  }, []);

  const [counterValue, setCounterValue] = useState(0);
  const [balance, setBalance] = useState(1000);

  const handleCollect = (collected) => {
    tg_haptic.notificationOccurred('success');
    setBalance(balance + collected);
  };

  return (
    <div className='App'>
      <div className='app-block'>
        <p>{t('rotate')}</p>
        <img src="src/images/rotate.png" alt="" />
      </div>
      <div className='app-wrapper'>
        <Balance balance={balance} />

        <Tabs>
          <TabList className='global-tabs'>
            <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('market')}</Tab>
            <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('home')}</Tab>
            <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('boost')}</Tab>
          </TabList>

          <TabPanel>
            <Tabs>
              <TabList className='market-tabs'>
                <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('video_cards')}</Tab>
                <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('psu')}</Tab>
              </TabList>

              <TabPanel>
                <Market items={video_cards} />
              </TabPanel>

              <TabPanel>
                <Market items={psu} />
              </TabPanel>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Home />
          </TabPanel>

          <TabPanel>
            <Boost balance={balance} setBalance={setBalance} />
          </TabPanel>
        </Tabs>

        <StartButton counterValue={counterValue} setCounterValue={setCounterValue} onCollect={handleCollect} />
      </div>
    </div>
  )
}

export default App