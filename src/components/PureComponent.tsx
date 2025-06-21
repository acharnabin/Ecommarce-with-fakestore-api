import React, { memo, useEffect } from "react";
import { Button } from "./ui/button";

//
// fist render count -> 1 - prev
// second render count-> 2   next
const PureComponent = memo(
  ({
    count,
    expensiveFunction,
  }: {
    count: number;
    expensiveFunction: () => void;
  }) => {
    console.log(count, "Re rendered");
 
    return (
      <div
        style={{
          border: "8px solid red",
          padding: "10px 20px",
        }}
      >
        <h1 className="text-xl font-bold">PureComponent {count}</h1>

        <Button onClick={expensiveFunction}>Execute</Button>
      </div>
    );
  }
);

export default PureComponent;
