// MyCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './calendar.module.css'; // 사용만 하면 됨

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.calendarContainer}>
      <Calendar onChange={setDate} value={date} locale="ko-KR" />
    </div>
  );
}

export default MyCalendar;
