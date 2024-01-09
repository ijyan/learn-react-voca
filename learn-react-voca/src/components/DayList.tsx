import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { IDay } from '../types/Type';

function DayList() {
  const days: IDay[] = useFetch('http://localhost:5000/days');

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}

export default DayList;
