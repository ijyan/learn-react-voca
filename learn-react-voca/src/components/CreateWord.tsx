import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { IDay } from '../types/Type';

function CreateWord() {
  const days: IDay[] = useFetch('http://localhost:5000/days');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      setIsLoading(true);
      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      fetch(`http://localhost:5000/words/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: Number(day),
          eng,
          kor,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('생성이 완료 되었습니다.');
          navigate(`/day/${day}`);
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label htmlFor="eng">
          ENG
          <input type="text" id="eng" placeholder="computer" ref={engRef} />
        </label>
      </div>
      <div className="input_area">
        <label htmlFor="kor">
          KOR
          <input type="text" placeholder="컴퓨터" id="kor" ref={korRef} />
        </label>
      </div>
      <div className="input_area">
        <label htmlFor="day">
          Day
          <select ref={dayRef}>
            {days.map((day) => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        style={{
          opacity: isLoading ? 0.4 : 1,
        }}
      >
        {isLoading ? 'Saving...' : '저장'}
      </button>
    </form>
  );
}

export default CreateWord;
