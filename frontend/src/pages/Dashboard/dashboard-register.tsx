import { ClipboardText, Pencil, Trash } from "@phosphor-icons/react";
import { ButtonIcon, DashboardRow, DashboardText, DashboardTextIcon } from "./styles";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

interface KeyValue {
  key: string;
  value: string;
  expireAt: string;
}

interface DashboardRegisterProps {
  keyValue: KeyValue;
  onEdit: (key: string, value: string) => void;
  onRemove: (key: string) => void;
}

export function DashboardRegister({ keyValue, onEdit, onRemove }: DashboardRegisterProps) {
  const expireAt = keyValue.expireAt.length ? formatDistance(new Date(keyValue.expireAt), new Date(), {
    includeSeconds: true,
    locale: ptBR
  }) : "Infinito";
  
  function handleCopyKey(key: string) {
    navigator.clipboard.writeText(key);
  }

  function handleCopyValue(value: string) {
    navigator.clipboard.writeText(value);
  }

  return (
    <DashboardRow>
      <DashboardText style={{ width: 200 }}>
        {keyValue.key}
        <DashboardTextIcon
          type="button"
          onClick={() => handleCopyKey(keyValue.key)}
        >
          <ClipboardText size={15} weight="fill" />
        </DashboardTextIcon>
      </DashboardText>

      <DashboardText style={{ flex: 1 }}>
        {keyValue.value}
      </DashboardText>

      <DashboardText style={{ width: 150 }}>
        {expireAt}
      </DashboardText>

      <ButtonIcon
        type="button"
        buttoncolor="blue"
        onClick={() => handleCopyValue(keyValue.value)}
      >
        <ClipboardText size={20} weight="fill" />
      </ButtonIcon>

      <ButtonIcon
        type="button"
        buttoncolor="green"
        onClick={() => onEdit(keyValue.key, keyValue.value)}
      >
        <Pencil size={20} weight="fill" />
      </ButtonIcon>

      <ButtonIcon
        type="button"
        buttoncolor="red"
        onClick={() => onRemove(keyValue.key)}
      >
        <Trash size={20} weight="fill" />
      </ButtonIcon>
    </DashboardRow>
  );
}