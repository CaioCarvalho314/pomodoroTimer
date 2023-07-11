import { ButtonContainer } from "./styles";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success";
}

export function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
