import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IDay } from '../types/Type';
import useFetch from '../hooks/useFetch';

function CreateDay() {
  const days: IDay[] = useFetch('http://localhost:5000/days');
  const navigate = useNavigate();
  const addDay = (e: React.FormEvent) => {
    axios
      .post(`http://localhost:5000/days/`, {
        day: days.length + 1,
      })
      .then((res) => {
        if (res.statusText === 'Created') {
          alert('생성이 완료 되었습니다.');
          navigate(`/`);
        }
      })
      .catch((error) => console.log(error));
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
