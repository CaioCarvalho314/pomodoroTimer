import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown({ activeCycle, setCycles, activeCycleId }: any) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesQtd = Math.floor(currentSeconds / 60);
  const secondsQtd = currentSeconds % 60;

  const minutes = String(minutesQtd).padStart(2, "0");
  const seconds = String(secondsQtd).padStart(2, "0");

  useEffect(() => {
    document.title = `${minutes}:${seconds}`;
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state: any) =>
            state.map((cycle: any) => {
              if (cycle.id === activeCycleId)
                return { ...cycle, finishedDate: new Date() };
              else return cycle;
            })
          );
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
  }, [activeCycle, minutes, seconds, totalSeconds]);

  return (
    <>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
    </>
  );
}
