import React, { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const generateRandomLoad = (load, maxLoad) => {
   const minPercent = 0.8;
   const maxPercent = 1.2;
   const minLoad = load * minPercent;
   const maxRandomLoad = Math.min(load * maxPercent, maxLoad);
   return Math.random() * (maxRandomLoad - minLoad) + minLoad;
};

const LoadLineChart = ({ socketRef }) => {
   const { t } = useTranslation();

   const socket = socketRef.current;

   const userId = 1;

   const [load, setLoad] = useState(0);
   const [maxLoad, setMaxLoad] = useState(0);

   const [data, setData] = useState([]);

   useEffect(() => {
      if (socket) {
         socket.emit('get_load_chart', { userId });

         socket.once('load_chart', (data) => {
            console.log(data);

            setLoad(data.load);
            setMaxLoad(data.max_load);
         });
      }

      const initialData = [
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad },
         { currentLoad: load, maxLoad: maxLoad }
      ];

      setData(initialData);

      return () => {
         socket.off('load_chart');
      };
   }, [socket]);

   useEffect(() => {
      if (load > maxLoad) {
         setData((prevData) =>
            prevData.map(() => ({
               currentLoad: maxLoad,
               maxLoad: maxLoad,
            }))
         );

         enqueueSnackbar(`${t('notification_energy')}`, {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 4000,
            variant: 'error'
         });
      } else {
         setData((prevData) =>
            prevData.map(() => ({
               currentLoad: generateRandomLoad(load, maxLoad),
               maxLoad: maxLoad,
            }))
         );
      }
   }, [load, maxLoad]);

   useEffect(() => {
      if (load <= maxLoad) {
         const interval = setInterval(() => {
            const newData = data.map((point, index) => {
               if (index === data.length - 1) {
                  return {
                     ...point,
                     currentLoad: generateRandomLoad(load, maxLoad),
                     maxLoad: maxLoad,
                  };
               } else {
                  return {
                     ...data[index + 1],
                  };
               }
            });
   
            setData(newData);
         }, 2000);
   
         return () => clearInterval(interval);
      }
   }, [data]);

   return (
      <ResponsiveContainer width="100%" height={150}>
         <LineChart data={data}>
            <Legend />
            <YAxis tickCount={3} />
            <Line dot={false} type="monotone" name={`${t('current_load')} - ${load}W`} dataKey="currentLoad" stroke="#8884d8" strokeWidth={3} />
            <Line dot={false} type="monotone" name={`${t('max_load')} - ${maxLoad}W`} dataKey="maxLoad" stroke="#82ca9d" strokeWidth={3} />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default LoadLineChart;