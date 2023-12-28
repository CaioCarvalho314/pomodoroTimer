import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo tem que ter no mínimo 1 minuto")
    .max(60, "O ciclo tem que ter no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");
  const disableButton = !task || !minutesAmount;

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesQtd = Math.floor(currentSeconds / 60);
  const secondsQtd = currentSeconds % 60;

  const minutes = String(minutesQtd).padStart(2, "0");
  const seconds = String(secondsQtd).padStart(2, "0");

  function handleInterruptCycle() {
    setActiveCycleId(null);
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId)
          return { ...cycle, interruptedDate: new Date() };
        else return cycle;
      })
    );
  }

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
          setCycles((state) =>
            state.map((cycle) => {
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
    <HomeContainer>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
      {activeCycle ? (
        <StopCountdownButton
          onClick={() => handleInterruptCycle()}
          type="button"
        >
          <HandPalm size={24} />
          Interromper
        </StopCountdownButton>
      ) : (
        <StartCountdownButton disabled={disableButton} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      )}
    </HomeContainer>
  );
}
