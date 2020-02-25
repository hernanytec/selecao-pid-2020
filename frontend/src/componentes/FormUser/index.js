/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import InputMask from 'react-input-mask';

import api from '../../service/api'

import './style.css'

import camera from '../../assets/camera.svg'

export default function formUser({ edit, userId }) {
    const [validated, setValidated] = useState(false)
    const [foto, setFoto] = useState(null)
    const [nome, setNome] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [nomeMae, setNomeMae] = useState('')
    const [nomePai, setNomePai] = useState('')

    const preview = useMemo(() => {
        return foto ? URL.createObjectURL(foto) : null
    }, [foto])


    const addUser = async () => {
        const data = new FormData()
        data.append('nome', nome)
        data.append('foto', foto)
        data.append('data_nasc', dataNasc)
        data.append('cpf', cpf)
        data.append('rg', rg)
        data.append('nome_pai', nomePai)
        data.append('nome_mae', nomeMae)

        await api.post('/users', data)

        document.location.reload();
    }

    const editUser = async () => {
        const data = new FormData()
        data.append('foto', foto)
        await api.put(`/user/${userId}`, data)
        document.location.reload();
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const form = e.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {//se os campos estiverem preenchidos
            if (edit)
                return editUser(e)

            return addUser(e)
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="validationCustom01">
                    <label
                        id="foto"
                        style={{ backgroundImage: `url(${preview})` }}
                        title="clique para adicionar foto"
                        className={`d-flex flex-column ${foto ? 'has-foto' : ''}`}
                    >
                        <Form.Control
                            type="file"
                            required
                            onChange={event => setFoto(event.target.files[0])} />

                        <img src={camera} alt="select img" />

                        <Form.Control.Feedback className='text-center' type="invalid">
                            Insira uma foto
                        </Form.Control.Feedback>
                    </label>
                </Form.Group>
            </Form.Row>

            {
                !edit
                    ?
                    <>
                        < Form.Row >
                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom03">
                                <Form.Label>Data de nascimento</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    value={dataNasc}
                                    onChange={e => setDataNasc(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="validationCustom04">
                                <Form.Label>CPF</Form.Label>
                                <InputMask
                                    className='form-control'
                                    mask="999.999.999-99"
                                    required
                                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                    type="text"
                                    placeholder="CPF"
                                    value={cpf}
                                    onChange={e => setCpf(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    CPF inválido
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom05">
                                <Form.Label>RG</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="RG"
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="validationCustom06">
                                <Form.Label>Nome da mãe</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome da mãe"
                                    value={nomeMae}
                                    onChange={e => setNomeMae(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="validationCustom07">
                                <Form.Label>Nome do pai</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome do pai"
                                    value={nomePai}
                                    onChange={e => setNomePai(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                    </>
                    : null
            }
            <Button className='w-100' variant="success" type="submit">Salvar</Button>

        </Form >
    )
}