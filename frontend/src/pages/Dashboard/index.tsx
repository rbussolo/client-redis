import { ButtonIcon, DashboardBody, DashboardContainer, DashboardFooter, DashboardHeader, DashboardRow, DashboardText, InputGroup } from "./styles";

import { Logout, GetKeys, SetKey, DelKey, DeleteAllKeys } from '../../../wailsjs/go/main/App';

import { ArrowsClockwise, SignOut, ArrowFatLinesRight, Pencil, Trash } from '@phosphor-icons/react';
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";

interface KeyValue {
  key: string;
  value: string;
}

export function Dashboard(){
  const navigate = useNavigate();

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [keyValues, setKeyValues] = useState<KeyValue[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  function handleLogout() {
    Logout();

    navigate("/");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    SetKey(key, value).then(() => {
      loadAllKey();
    }).catch(() => {
      setIsLoading(false);
    });

    setKey("");
    setValue("");
  }

  function loadAllKey() {
    GetKeys().then((result) => {
      setKeyValues(result ? result : []);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  function handleReloadKeys() {
    setIsLoading(true);

    loadAllKey();
  }

  function handleEdit(key: string, value: string) {
    setKey(key);
    setValue(value);
  }

  function handleRemove(key: string) {
    setIsLoading(true);

    DelKey(key).then(() => {
      loadAllKey();
    }).catch(() => {
      setIsLoading(false);
    });
  }

  function handleRemoveKeys() {
    setIsLoading(true);

    DeleteAllKeys().then(() => {
      loadAllKey();
    }).catch(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadAllKey();
  }, []);

  return(
    <>
      <DashboardContainer>
        <DashboardHeader>
          <ButtonIcon 
            type="button"
            buttoncolor="blue"
            onClick={handleReloadKeys}
          >
            <ArrowsClockwise size={30} weight="fill" />
          </ButtonIcon>

          <ButtonIcon
            type="button"
            buttoncolor="red"
            onClick={handleRemoveKeys}
          >
            <Trash size={30} weight="fill" />
          </ButtonIcon>

          <ButtonIcon
            type="button"
            buttoncolor="red"
            onClick={handleLogout}
            style={{'margin-left': 'auto'}}
          >
            <SignOut size={30} weight="fill" />
          </ButtonIcon>
        </DashboardHeader>

        <DashboardBody>
          { keyValues.map(keyValue => {
            return (
              <DashboardRow key={keyValue.key}>
                <DashboardText style={{width: 200}}>
                  {keyValue.key}
                </DashboardText>

                <DashboardText style={{flex: 1}}>
                  {keyValue.value}
                </DashboardText>

                <ButtonIcon
                  type="button"
                  buttoncolor="green"
                  onClick={() => handleEdit(keyValue.key, keyValue.value)}
                >
                  <Pencil size={20} weight="fill" />
                </ButtonIcon>

                <ButtonIcon
                  type="button"
                  buttoncolor="red"
                  onClick={() => handleRemove(keyValue.key)}
                >
                  <Trash size={20} weight="fill" />
                </ButtonIcon>
              </DashboardRow>
            )
          }) }
        </DashboardBody>
        
        <DashboardFooter onSubmit={handleSubmit}>
          <InputGroup>
            <label>Chave:</label>
            <input 
              type="text" 
              maxLength={20}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </InputGroup>
          
          <InputGroup style={{flex: 1}}>
            <label>Valor:</label>
            <input 
              type="text" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputGroup>

          <ButtonIcon
            type="submit"
            buttoncolor="green"
          >
            <ArrowFatLinesRight size={30} weight="fill" />
          </ButtonIcon>
        </DashboardFooter>
      </DashboardContainer>

      <Loading showLoading={isLoading} />
    </>
  )
}