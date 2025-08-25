import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/ko'; // 한국어 가져오기

dayjs.extend(isLeapYear);
dayjs.locale('ko'); // 언어 등록


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
    <App />
    </CookiesProvider>
  </StrictMode>,
)
