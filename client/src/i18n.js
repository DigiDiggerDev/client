import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: {
         en: {
            translation: {
               rotate: "Turn the device",
               market: "Market",
               home: "Home",
               boost: "Boost",
               video_cards: "Video cards",
               psu: "PSU",

               balance: "Your balance: ",

               buy_button: "Buy",
               
               table_name: "Name",
               table_capacity: "Capacity",
               table_amount: "Amount",
               table_total_capacity: "Total capacity",

               current_load: "Current load",
               max_load: "Max load",

               button_start_text: "Start",
               button_launch_text: "Launching...",
               button_farming_text: "Farming...",
               button_collect_text: "Collect",
               button_loading_text: "Loading...",

               notification_buy: "Purchased",
               notification_notbuy: "Insufficient funds",
            }
         },
         ru: {
            translation: {
               rotate: "Поверните устройство",
               market: "Маркет",
               home: "Дом",
               boost: "Буст",
               video_cards: "Видеокарты",
               psu: "Блоки питания",

               balance: "Ваш баланс: ",

               buy_button: "Купить",

               table_name: "Название",
               table_capacity: "Добыча",
               table_amount: "Кол-во",
               table_total_capacity: "Общая добыча",

               current_load: "Нагрузка",
               max_load: "Макс. нагрузка",

               button_start_text: "Начать",
               button_launch_text: "Запуск...",
               button_farming_text: "Идёт добыча...",
               button_collect_text: "Собрать",
               button_loading_text: "Загрузка...",

               notification_buy: "Куплен предмет",
               notification_notbuy: "Недостаточно средств",
            }
         },
      },
      fallbackLng: 'en',
      interpolation: {
         escapeValue: false
      }
   });

export default i18n;