import { DashboardRegister } from "./dashboard-register";
import { DashboardRow, DashboardText } from "./styles";

interface KeyValue {
  key: string;
  value: string;
  expireAt: string;
}

interface DashboardGridProps {
  keyValues: KeyValue[];
  onEdit: (key: string, value: string) => void;
  onRemove: (key: string) => void;
}

export function DashboardGrid({ keyValues, onEdit, onRemove }: DashboardGridProps) {
  return (
    <>
      <DashboardRow>
        <DashboardText type="header" style={{ width: 200 }}>
          Chave
        </DashboardText>

        <DashboardText type="header" style={{ flex: 1 }}>
          Valor
        </DashboardText>

        <DashboardText type="header" style={{ width: 150 }}>
          Duração
        </DashboardText>

        <DashboardText type="header" style={{ width: 'calc(9rem + 2px)' }}>
          Ações
        </DashboardText>
      </DashboardRow>

      {
        keyValues.map((keyValue) => (
          <DashboardRegister key={keyValue.key} keyValue={keyValue} onEdit={onEdit} onRemove={onRemove} />
        ))
      }
    </>
  )
}