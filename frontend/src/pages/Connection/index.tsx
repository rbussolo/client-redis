import { ConfirmButton, ConnectionContainer, ConnectionContent, DivRow, InputGroup } from "./styles";

import logo from '../../assets/images/redis_icon.svg';
import { useEffect, useState } from "react";

import { Connect } from '../../../wailsjs/go/main/App';
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";

import { useNavigate } from "react-router-dom";

export function Connection() {
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    setIsLoading(true);

    Connect(user, address, port, password).then((result) => {
      localStorage.setItem("REDIS_CLIENT:user", user)
      localStorage.setItem("REDIS_CLIENT:address", address)
      localStorage.setItem("REDIS_CLIENT:port", port)
      localStorage.setItem("REDIS_CLIENT:password", password)

      navigate("/dashboard");
    }).catch((error) => {
      setMessage(error);
      setShowAlert(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }

  useEffect(() => {
    const localUser = localStorage.getItem("REDIS_CLIENT:user")
    const localAddress = localStorage.getItem("REDIS_CLIENT:address")
    const localPort = localStorage.getItem("REDIS_CLIENT:port")
    const localPassword = localStorage.getItem("REDIS_CLIENT:password")
    
    if (localUser) {
      setUser(localUser);
    }

    if (localAddress) {
      setAddress(localAddress);
    }

    if (localPort) {
      setPort(localPort);
    }

    if (localPassword) {
      setPassword(localPassword);
    }
  }, []);

  return (
    <>
      <ConnectionContainer>
        <img src={logo} width={100}/>

        <ConnectionContent onSubmit={handleSubmit}>
          <InputGroup>
            <label>Usuário:</label>
            <input 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text" 
            />
          </InputGroup>

          <DivRow>
            <InputGroup style={{flex: 1}}>
              <label>Endereço:</label>
              <input 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup>
              <label>Porta:</label>
              <input 
                value={port}
                onChange={(e) => setPort(e.target.value)}
                type="text" 
                maxLength={5}
              />
            </InputGroup>
          </DivRow>

          <InputGroup>
            <label>Senha:</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </InputGroup>

          <ConfirmButton type="submit">
            Conectar
          </ConfirmButton>
        </ConnectionContent>
      </ConnectionContainer>

      <Loading showLoading={isLoading} />
      <Alert showAlert={showAlert} message={message} type="error" onClose={handleCloseAlert} />
    </>
  )
}