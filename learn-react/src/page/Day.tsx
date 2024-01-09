import React from 'react';
import { useParams } from 'react-router-dom';
import Word from '../components/Word';
import useFetch from '../hooks/useFetch';
import { IWord } from '../types/Type';

function Day() {
  const day = useParams<{ id: string }>().id;
  const words: IWord[] = useFetch(`http://localhost:5000/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Day;
