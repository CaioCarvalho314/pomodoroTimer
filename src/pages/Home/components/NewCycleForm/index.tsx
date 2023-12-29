import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm({ activeCycle, register }: any) {
  return (
    <>
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          disabled={!!activeCycle}
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para o seu projeto"
          {...register("task")}
        />

        <datalist id="task-suggestions">
          <option value="Opção 1" />
          <option value="Opção 2" />
          <option value="Opção 3" />
          <option value="Opção 4" />
        </datalist>
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          disabled={!!activeCycle}
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={1}
          min={1}
          max={60}
          {...register("minutesAmount", { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </FormContainer>
    </>
  );
}
