import axios from "axios"
import { useEffect, useState } from "react"

export const Usuario = (props) => {
    const [usuario, setUsuario] = useState({})
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [editar, setEditar] = useState(false)

    const pegarUsuarioPeloId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`,{
            headers: {
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta.data)
            setUsuario(resposta.data)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {
        pegarUsuarioPeloId()
    }, [])

    const editarDadosUsuario = () => {
        const body = {
            name: nome,
            email: email
        }

        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, {
            headers:{
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            pegarUsuarioPeloId()
            setEditar(!editar)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    const deletarUsuario = () => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, {
            headers: {
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            props.pegarUsuarios()
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <>
            
            {
                
                editar ? 
                    <div>
                        <input 
                            placeholder="nome" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)}>
                        </input>
                        <input 
                            placeholder="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <button onClick={editarDadosUsuario}> Alterar dados</button>
                    </div> : <div>
                        <p>{usuario.name}</p>
                        <p>{usuario.email}</p>
                    </div>                
            }
            <button onClick={() => setEditar(!editar)}>Editar</button>      
            <button onClick={deletarUsuario}>Deletar usuário</button>            
        </>
    )
}