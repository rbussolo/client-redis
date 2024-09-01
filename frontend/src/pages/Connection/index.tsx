import { ConfirmButton, ConnectionContainer, ConnectionContent, DeleteButton, DivRow, EditButton, InputGroup } from "./styles";

import logo from '../../assets/images/redis_icon.svg';
import { useEffect, useState } from "react";

import { Connect } from '../../../wailsjs/go/main/App';
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";

import { useNavigate } from "react-router-dom";
import { Eraser, Pencil } from "@phosphor-icons/react";

interface Connection {
  user: string;
  address: string;
  port: string;
  password: string;
}

export function Connection() {
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [connection, setConnection] = useState<Connection | null>(null);
  const [connections, setConnections] = useState<Connection[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const defaultConnection = connection ? connection.address + ':' + connection.port + ' ' + connection.user : "";

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
    const localConnections = localStorage.getItem("REDIS_CLIENT:connections");
    
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
  
    if (localConnections) {
      setConnections(JSON.parse(localConnections));
    }
  }, []);

  function handleSelectConnection(value: string) {
    if (value === '' || !connections) {
      setConnection(null);

      return
    }

    for (let i = 0; i < connections.length; i++) {
      const newConnection = connections[i];
      const key = newConnection.address + ':' + newConnection.port + ' ' + newConnection.user;

      if (key === value) {
        setConnection(newConnection);
        setUser(newConnection.user);
        setAddress(newConnection.address);
        setPort(newConnection.port);
        setPassword(newConnection.password);
      }
    }
  }

  function handleDelete() {
    if (!connection) {
      setMessage("É necessário selecionar uma conexão para remove-la!");
      setShowAlert(true);

      return;
    }

    const newConnections: Connection[] = deleteConnection(connection, connections);

    localStorage.setItem("REDIS_CLIENT:connections", JSON.stringify(newConnections));

    setConnections(newConnections);
    setConnection(null);
  }

  function handleEdit() {
    let error_msg = "";

    if (!user) {
      error_msg = "É necessário informar o Usuário!";
    } else if (!address) {
      error_msg = "É necessário informar o Endereço!";
    } else if (!port) {
      error_msg = "É necessário informar a Porta!";
    }

    if (error_msg.length) {
      setMessage(error_msg);
      setShowAlert(true);

      return;
    }

    const newConnection: Connection = {
      address,
      password,
      port,
      user
    }

    const newConnections: Connection[] = createNewConnections(newConnection, connections);

    localStorage.setItem("REDIS_CLIENT:connections", JSON.stringify(newConnections));

    setConnections(newConnections);
    setConnection(newConnection);
  }

  function createNewConnections(newConnection: Connection, connections: Connection[] | null): Connection[] {
    if (!connections) return [newConnection];
    if (!connection) return [...connections, newConnection];

    const key = connection.address + ':' + connection.port + ' ' + connection.user;

    return connections.map(c => {
      const newKey = c.address + ':' + c.port + ' ' + c.user;

      if (newKey === key) {
        return newConnection;
      }

      return c;
    })
  }

  function deleteConnection(connection: Connection, connections: Connection[] | null): Connection[] {
    if (!connections) return [];

    const key = connection.address + ':' + connection.port + ' ' + connection.user;

    return connections.filter(c => {
      const newKey = c.address + ':' + c.port + ' ' + c.user;

      if (newKey === key) {
        return false;
      }

      return true;
    })
  }

  return (
    <>
      <ConnectionContainer>
        <img src={logo} width={100}/>

        <ConnectionContent onSubmit={handleSubmit}>
          <InputGroup>
            <label>Conexões:</label>

            <div>
              <select 
                name="connections"
                onChange={(e) => handleSelectConnection(e.target.value)}
                value={defaultConnection}
              >
                <option value="">Selecione</option>

                {connections && connections.map((connection) => {
                  const key = connection.address + ':' + connection.port + ' ' + connection.user;
                  const value = connection.address + ':' + connection.port + ' ' + connection.user;

                  return (
                    <option key={key} value={value}>{value}</option>
                  );
                })}
              </select>

              <EditButton 
                type="button"
                onClick={handleEdit}
              >
                <Pencil size={24} />
              </EditButton>

              <DeleteButton
                type="button"
                onClick={handleDelete}
              >
                <Eraser size={24} />
              </DeleteButton>
            </div>

          </InputGroup>

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