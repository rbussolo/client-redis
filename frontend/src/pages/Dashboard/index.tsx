import { ButtonIcon, DashboardBody, DashboardContainer, DashboardFooter, DashboardHeader, DashboardRow, DashboardText, DashboardTextIcon, InputGroup } from "./styles";

import { Logout, GetKeys, SetKey, DelKey, DeleteAllKeys } from '../../../wailsjs/go/main/App';

import { ArrowsClockwise, SignOut, ArrowFatLinesRight, Trash } from '@phosphor-icons/react';
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { DashboardGrid } from "./dashboard-grid";

interface KeyValue {
  key: string;
  value: string;
  expireAt: string;
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

  function isJson(value: string): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  function handleEdit(key: string, value: string) {
    // Check if it's a json
    if (isJson(value)) {
      navigate(`/edit/${key}`);
    } else {
      setKey(key);
      setValue(value);
    }
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
          <DashboardGrid keyValues={keyValues} onEdit={handleEdit} onRemove={handleRemove} />
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