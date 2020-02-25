import React, { useState, useEffect } from 'react'

import Card from '../../componentes/Card'
import MenuBar from '../../componentes/MenuBar'
import './style.css'

import notFound from '../../assets/page_not_found.svg'

import api from '../../service/api'
import { Image } from 'react-bootstrap'

export default function Home({ history }) {

    const [users, setUsers] = useState([])
    const [dialogOptions, setDialogOptions] = useState({
        show: false,
        dialogType: null,
        placeholderText: '',
        buttonDelete: false
    });

    useEffect(() => {
        async function getUsers() {
            const { data: users } = await api.get('/users')
            setUsers(users)
        }

        getUsers()
    }, [])

    const fowartToProfile = async key => {
        history.push({ pathname: '/profile', state: key })
    }

    const fowartToList = async name => {
        history.push({ pathname: '/list', state: name })
    }

    const handleClose = () => {
        setDialogOptions({ ...dialogOptions, show: false })
    };

    const handleShow = (dtype) => {
        let placeholderText = null
        let buttonDelete = false

        switch (dtype) {
            case 'search_by_key':
                placeholderText = 'Informe o CPF ou RG do usuário'
                break;
            case 'search_by_name':
                placeholderText = 'Informe o nome do usuário'
                break;
            case 'remove_user':
                placeholderText = 'Informe o CPF ou RG para deletar'
                buttonDelete = true
                break;
            default:
                placeholderText = ''
        }

        const options = {
            show: true,
            dialogType: dtype,
            placeholderText,
            buttonDelete
        }

        setDialogOptions(options)
    }

    const handleSubmit = async (e, inputModal) => {
        e.preventDefault()

        switch (dialogOptions.dialogType) {
            case 'search_by_key':
                fowartToProfile(inputModal)
                break;
            case 'search_by_name':
                fowartToList(inputModal)
                break;
            case 'remove_user':
                const { data: user } = await api.delete(`/user/${inputModal}`)

                if (user) {
                    setUsers(users.filter(u => u._id !== user._id))
                    handleClose()
                }
                break;
            default:
                console.log('ERROR: invalid dialog type')
        }
    }

    return (
        <>
            <MenuBar
                dialogOptions={dialogOptions}
                handleShow={handleShow}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
            {
                users.length > 0
                    ?
                    <div className='cards-container'>
                        {
                            users.map((user) => (
                                <Card
                                    key={user._id}
                                    user={user}
                                    onSeeDetails={fowartToProfile}
                                />
                            ))
                        }
                    </div>
                    : <div id='not-found'>
                        <Image src={notFound} />
                        <p>Ainda não há usuárioas cadastrados <br />Vá em: <span> Usuário > Adicionar usuário</span> e adicione o primero :)</p>
                    </div>
            }
        </>
    )
}