import { useEffect, useState } from "react";

export default function Parent() {
const [visible, setVisible] = useState(false);

  return (
    <>
          <h1>UseEffectCounterPage</h1>
          <button onClick={(): void => setVisible(!visible)}>
              {visible ? '숨기기' : '보이기'}
          </button>
          {visible && <Child />}
    </>
  )
}

function Child() {
    useEffect((): void => {
        let i = 0;
        const countInterval = setInterval((): void => {
            console.log(i);
            i++;
        }, 1000);

        return (): void => {
            console.log('clean up function');
            clearInterval(countInterval);
        };
    }, []);
    return (
        <div className="mt-20 text-4xl">Child</div>
    )
}