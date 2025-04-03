import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './calendar.module.css';  // CSS 모듈 import

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const disableWeekends = ({ date }) => date.getDay() === 0 || date.getDay() === 6;

  const tileClassName = ({ date }) => {
    // 특정 날짜 스타일 적용 (여기서는 15일에 강조 스타일을 주었음)
    if (date.getDate() === 15) {
      return styles.selected;
    }
    return undefined;
  };

  return (
    <div className={styles.calendar}>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}  // 특정 날짜에 클래스 적용
        tileDisabled={disableWeekends}  // 주말 비활성화
      />
      <p>선택한 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default MyCalendar;
