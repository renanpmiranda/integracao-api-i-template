import React, { useEffect, useState } from "react"
import axios from "axios"
import { Usuario } from "./Componentes/Usuario"

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  const pegarUsuarios = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {
      headers: {
        Authorization: "renan-miranda-ammal"
      }
    })
    .then((resposta) => {
      console.log(resposta.data)
      setUsuarios(resposta.data)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }   
  
  useEffect(() => {
    pegarUsuarios()
  }, [])

  const criarUsuario = () => {
    const body = {
      name: nome,
      email: email
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, {
      headers: {
        Authorization: "renan-miranda-ammal"
      }
    })
    .then((resposta) => {
      console.log(resposta)
      pegarUsuarios()
      setNome("")
      setEmail("")
    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>

      <input 
        placeholder="name"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input 
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarUsuario}>Criar Usuário</button>
      <br/>
      <br/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} id={usuario.id} pegarUsuarios={pegarUsuarios}/>
      })}
    </>
  )
}

export default App;
