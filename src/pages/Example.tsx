import PureComponent from "@/components/PureComponent";
import { Button } from "@/components/ui/button";
import React, { useCallback, useMemo, useState } from "react";

const Example = () => {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);

 

  // usecallback
  const expensiveFunction = useCallback(() => {
    let temp = 1;

    for (let index = 1; index < 1000; index++) {
      temp = temp + index;
    }

    setState1(temp);
  }, []);

  // optimized
  const memorizedState1Value = useMemo(() => {
    return state1 * 10;
  }, [state1]);

  const memorizedState2Value = useMemo(() => {
    return state2 * 10;
  }, [state2]);

  return (
    <div>
      <h1>STATE 1 * 10 = {memorizedState1Value}</h1>
      <h1>STATE 2 * 10 = {memorizedState2Value}</h1>
      <hr />

      <PureComponent
        count={memorizedState1Value}
        expensiveFunction={expensiveFunction}
      />
      {/* <Button onClick={expensiveFunction}>Expensive calculation</Button> */}
      <Button onClick={() => setState1((prev) => prev + 1)}>
        Increse state 1
      </Button>
      <Button onClick={() => setState2((prev) => prev + 1)}>
        Increse state 2
      </Button>
    </div>
  );
};

export default Example;
