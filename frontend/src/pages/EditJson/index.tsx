import { useNavigate, useParams } from "react-router-dom";

import { JsonEditor } from 'json-edit-react'

import { Body, ButtonIcon, Container, Header, HeaderButtons } from "./styles";
import { ArrowBendUpLeft, Check } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { GetKey, SetKey } from "../../../wailsjs/go/main/App";
import { Loading } from "../../components/Loading";

interface KeyValue {
  key: string;
  value: string;
  expireAt: string;
}

export function EditJson() {
  const [keyValue, setKeyValue] = useState<KeyValue | null>(null);
  const [jsonData, setJsonData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const { key } = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate("/dashboard");
  }

  function handleConfirm() {
    if (!key) return;

    const value = JSON.stringify(jsonData);

    setIsLoading(true);

    SetKey(key, value).then(() => {
      navigate("/dashboard");
    }).catch(() => {
      setIsLoading(false);
    });
  }

  function loadKeyValue(key: string) {
    setIsLoading(true);

    GetKey(key).then((result) => {
      setKeyValue(result ? result : null);
      setJsonData(result.value ? JSON.parse(result.value) : {})
    }).finally(() => {
      setIsLoading(false)
    });
  }

  useEffect(() => {
    if (key) {
      loadKeyValue(key);
    }
  }, []);

  return (
    <>
      <Container>
        <Header>
          <span>
            {keyValue?.key}
          </span>
          
          <HeaderButtons>
            <ButtonIcon
              type="button"
              buttoncolor="green"
              onClick={handleConfirm}
            >
              <Check size={30} />
            </ButtonIcon>

            
            <ButtonIcon
              type="button"
              buttoncolor="red"
              onClick={handleBack}
            >
              <ArrowBendUpLeft size={30} weight="fill" />
            </ButtonIcon>
          </HeaderButtons>
        </Header>

        <Body>
          <JsonEditor 
            data={jsonData} 
            setData={setJsonData}
            minWidth="100%"
            maxWidth="100%"
          />
        </Body>
      </Container>
    
      <Loading showLoading={isLoading} />
    </>
  )
}