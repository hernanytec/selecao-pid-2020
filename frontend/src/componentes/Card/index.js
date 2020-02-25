import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { format } from 'date-fns'

import ListGroupItem from '../ListGroupItem'

import './style.css'

export default function MyCard({ user, onSeeDetails, allFields }) {

    const transformDate = (date, pattern) => {
        if (!pattern)
            pattern = 'dd/MM/yyyy'

        return format(new Date(date), pattern)
    }

    return (
        <Card className='text-center shadow-sm'>
            <Card.Img variant="top" src={user.foto_url} />
            <Card.Body>
                <Card.Title>{user.nome}</Card.Title>

                <ListGroup className="list-group-flush">

                    <ListGroupItem label="Nascimento" value={transformDate(user.data_nasc)} />
                    <ListGroupItem label="CPF" value={user.cpf} />
                    <ListGroupItem label="RG" value={user.rg} />
                    {
                        allFields
                            ?
                            <>
                                <ListGroupItem label="Pai" value={user.nome_pai} />
                                <ListGroupItem label="Mãe" value={user.nome_mae} />
                            </>
                            :
                            null
                    }
                </ListGroup>
            </Card.Body>

            <Card.Footer>
                {
                    allFields
                        ? <small className="text-muted">{transformDate(user.data_cad, "'Cadastrado em' dd/MM/yyyy', às ' HH:mm'h'")}</small>
                        :
                        <Button
                            className='w-100'
                            variant="outline-success"
                            onClick={() => onSeeDetails(user.cpf)}
                        >Ver mais</Button>

                }
            </Card.Footer>

        </Card >

    )
}