import { HomeContainer } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <span>Vou trabalhar em</span>
      <input placeholder="Dê um nome para o seu projeto"></input>
      <span>durante</span>
      <input placeholder="00"></input>
      <span>minutos</span>
    </HomeContainer>
  );
}
