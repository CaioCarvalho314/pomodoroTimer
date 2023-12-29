import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo tem que ter no mínimo 1 minuto")
    .max(60, "O ciclo tem que ter no máximo 60 minutos"),
});
export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles([...cycles, newCycle]);
    setActiveCycleId(id);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm register={register} activeCycle={activeCycle} />
        <Countdown
          activeCycleId={activeCycleId}
          setCycles={setCycles}
          activeCycle={activeCycle}
        />

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
      </form>
    </HomeContainer>
  );
}
