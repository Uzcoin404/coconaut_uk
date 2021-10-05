import * as React from "react";
import CountUp from "react-countup";
import styled from "styled-components";

interface FactProps {
  name: String;
  value: number;
  unit: String;
}

const Main = styled.li`
  margin: 0 1rem 1rem 0;
  min-width: 6rem;
`;

const Value = styled(CountUp)`
  color: ${(props) => props.theme.accent};
  font-size: 4rem;
`;

const Unit = styled.span`
  color: ${(props) => props.theme.accent};
`;

// https://stackoverflow.com/questions/27082377/get-number-of-decimal-places-with-javascript
const countDecimals = (value: number) => {
  let text = value.toString();
  // verify if number 0.000005 is represented as "5e-6"
  if (text.indexOf("e-") > -1) {
    let [, trail] = text.split("e-");
    let deg = parseInt(trail, 10);
    return deg;
  }
  // count decimals for number in representation like "0.123456"
  if (Math.floor(value) !== value)
    return value.toString().split(".")[1].length || 0;

  return 0;
};

const Fact = (props: FactProps) => {
  return (
    <Main>
      <p>{props.name}</p>
      <Value
        decimals={countDecimals(props.value)}
        end={props.value}
        duration={2}
      />
      <Unit>{props.unit}</Unit>
    </Main>
  );
};
export default Fact;
