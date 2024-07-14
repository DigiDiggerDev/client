import { React } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useTranslation } from 'react-i18next';
import 'react-tabs/style/react-tabs.css';
import '/src/styles/Home.css';

import LoadLineChart from '../components/LoadLineChart';
import HomeTable from '../components/HomeTable';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const data_video_cards = [
   { name: 'GTX 1070 TI', capacity: 0.1, amount: 10 },
   { name: 'GTX 1071 TI', capacity: 0.1, amount: 20 },
   { name: 'GTX 1072 TI', capacity: 0.1, amount: 30 },
   { name: 'GTX 1073 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1074 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1075 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1076 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1077 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1078 TI', capacity: 0.1, amount: 100 },
];

const data_psu = [
   { name: 'Power Limit', capacity: 0.1, amount: 10 },
   { name: 'Power Limit', capacity: 0.1, amount: 10 },
   { name: 'Power Limit', capacity: 0.1, amount: 10 },
];

const Home = () => {
   const { t } = useTranslation();

   return (
      <div className='Home'>
         <LoadLineChart />
         <Tabs>
            <TabList className='home-tabs'>
               <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('video_cards')}</Tab>
               <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('psu')}</Tab>
            </TabList>

            <TabPanel>
               <HomeTable data={data_video_cards}/>
            </TabPanel>

            <TabPanel>
               <HomeTable data={data_psu}/>
            </TabPanel>
         </Tabs>
      </div>
   );
};

export default Home;