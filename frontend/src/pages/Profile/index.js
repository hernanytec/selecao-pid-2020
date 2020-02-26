/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import Card from '../../componentes/Card'

import Gallery from '../../componentes/Gallery'

import './style.css'
import notFound from '../../assets/page_not_found.svg'

import MenuBar from '../../componentes/MenuBar'

import api from '../../service/api'
import { Image } from 'react-bootstrap'

export default function Profile({ history }) {
    const user_key = history.location.state

    const [user, setUser] = useState({})

    const [dialogOptions, setDialogOptions] = useState({
        show: false,
        dialogType: null,
        edit: true
    });

    useEffect(() => {
        async function getUser() {
            const { data: user } = await api.get(`/user/${user_key}`)
            setUser(user)
        }

        getUser()
    }, [])

    const handleClose = () => {
        setDialogOptions({ ...dialogOptions, show: false })
    };

    const handleShow = (dtype) => {
        setDialogOptions({ ...dialogOptions, dialogType: dtype, show: true })
    }

    return (
        <>
            <MenuBar
                profile
                userId={user._id}
                handleShow={handleShow}
                handleClose={handleClose}
                dialogOptions={dialogOptions} />
            {
                //verifica se o objeto não é vazio
                Object.entries(user).length > 0
                    ?
                    <div className='d-flex align-items-center flex-column profile-container'>
                        <Card user={user} allFields />
                        <Gallery fotos={user.historico_foto_url} atualFoto={user.foto_url} />
                    </div>
                    : <div id='not-found'>
                        <Image src={notFound} />
                        <p>Nenhum usuário encontrado</p>
                    </div>
            }
        </>
    )
}