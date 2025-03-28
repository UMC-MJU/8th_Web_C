import { useState } from 'react';
import './App.css'

function heavyComputation(): number {
  let result = 0;
  for (let i = 0; i < 10000000; i++){
    result += i;
  }
  return result;
}

function App(){
  //let count = 0;
  //useState 사용
  const [count, setCount] = useState(heavyComputation); //한번만 연산이 필요하면 참조값으로 사용해야 함

  const handleIncrease = (): void => {
    //count++;
    // 비동기 방식의 문제
    //setCount(count + 1);
    //setCount(count + 1);
    //setCount(count + 1);
    setCount((prev) => prev + 1);

    console.log(count);
  }

  const handleDecrease = (): void => {
    setCount(prev => prev - 1)
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
      <button onClick={handleDecrease}>감소</button>
    </>
  );
}

export default App
