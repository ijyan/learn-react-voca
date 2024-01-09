import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IDay } from '../types/Type';
import useFetch from '../hooks/useFetch';

function CreateDay() {
  const days: IDay[] = useFetch('http://localhost:5000/days');
  const navigate = useNavigate();
  const addDay = (e: React.FormEvent) => {
    fetch(`http://localhost:5000/days/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('생성이 완료 되었습니다.');
        navigate(`/`);
      }
    });
  };

  return (
    <>
      <h3>현재 일수: {days.length}일</h3>
      <button type="button" onClick={addDay}>
        Day 추가
      </button>
    </>
  );
}

export default CreateDay;
