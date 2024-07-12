import React, { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const load = 150;
const maxLoad = 200;

const generateRandomLoad = (load, maxLoad) => {
   const minPercent = 0.8;
   const maxPercent = 1.2;
   const minLoad = load * minPercent;
   const maxRandomLoad = Math.min(load * maxPercent, maxLoad);
   return Math.random() * (maxRandomLoad - minLoad) + minLoad;
};

const LoadLineChart = () => {
   const { t } = useTranslation();

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

   const [data, setData] = useState(initialData);

   useEffect(() => {
      const interval = setInterval(() => {
         const newData = data.map((point, index) => {
            if (index === data.length - 1) {
               return {
                  ...point,
                  currentLoad: generateRandomLoad(load, maxLoad),
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