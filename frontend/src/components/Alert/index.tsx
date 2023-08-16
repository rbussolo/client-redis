import { AlertBody, AlertContainer, AlertContent, AlertTitle, ConfirmButton } from "./styles";

interface AlertProps {
  type: 'error' | 'success' | 'warning';
  message: string;
  showAlert?: boolean;
  onClose: () => void;
}

export function Alert({ type, message, onClose, showAlert = false }: AlertProps) {
  if(!showAlert) {
    return null;
  }

  const title = type === 'error' ? 'Ocorreu um ERRO' : type === 'success' ? 'SUCESSO' : 'AVISO';

  return (
    <AlertContainer>
      <AlertContent>
        <AlertTitle>
          <h1>{title}</h1>
        </AlertTitle>

        <AlertBody>
          <p>{message}</p>
        </AlertBody>

        <ConfirmButton 
          type="button"
          onClick={onClose}
        >
          Fechar
        </ConfirmButton>
      </AlertContent>
    </AlertContainer>
  )
}