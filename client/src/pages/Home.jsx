import { React, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SnackbarProvider } from 'notistack'
import { useTranslation } from 'react-i18next';
import 'react-tabs/style/react-tabs.css';
import '/src/styles/Home.css';

import LoadLineChart from '../components/LoadLineChart';
import HomeTable from '../components/HomeTable';

const tg_haptic = window.Telegram.WebApp.HapticFeedback;

const Home = ({ socketRef }) => {
   const [dataPSU, setDataPSU] = useState(null);
   const [dataVCS, setDataVCS] = useState(null);

   const { t } = useTranslation();
   const socket = socketRef.current;

   const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

   useEffect(() => {
      if (socket) {
         socket.emit('get_hometable', { userId });

         socket.once('hometable', (data) => {
            setDataVCS(data.vcs || null);
            setDataPSU(data.psus || null);

            console.log(data);
         });
      }

      return () => {
         socket.off('hometable');
      };
   }, [socket]);

   return (
      <div className='wrapper'>
         <SnackbarProvider />
         <div className='Home'>
            <LoadLineChart socketRef={socketRef} />
            <Tabs>
               <TabList className='home-tabs'>
                  <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('video_cards')}</Tab>
                  <Tab onClick={() => tg_haptic.impactOccurred('soft')}>{t('psu')}</Tab>
               </TabList>

               <TabPanel>
                  {dataVCS ? <HomeTable data={dataVCS} /> : <p className='no-data-label'>{t('no_data')}</p>}
               </TabPanel>

               <TabPanel>
                  {dataPSU ? <HomeTable data={dataPSU} /> : <p className='no-data-label'>{t('no_data')}</p>}
               </TabPanel>
            </Tabs>
         </div>
      </div>
   );
};

export default Home;