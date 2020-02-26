/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import Card from '../../componentes/Card'
import Gallery from '../../componentes/Gallery'
import api from '../../service/api'

import './style.css'
import notFound from '../../assets/page_not_found.svg'
import MenuBar from '../../componentes/MenuBar'
import { Image } from 'react-bootstrap'

export default function List({ history }) {
    const name = history.location.state

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsersByName() {
            const { data: users } = await api.get(`/users/${name}`)
            setUsers(users)
        }

        getUsersByName()
    }, [])

    return (
        <>

            <MenuBar />
            {
                users.length > 0 ?
                    users.map(user => (
                        <div key={user._id} className='card-gallery-container' >
                            <Card user={user} allFields />
                            <Gallery fotos={user.historico_foto_url} atualFoto={user.foto_url} />
                            <hr />
                        </div>
                    ))
                    : <div id='not-found'>
                        <Image src={notFound} />
                        <p>Não há usuários com o nome <span>{name}</span></p>
                    </div>
            }
        </>
    );
}
