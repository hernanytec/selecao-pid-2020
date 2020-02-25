/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

export default function formInput({ options, handleSubmit }) {

    const [inputModal, setInputModal] = useState('');

    useEffect(() => {
        function addFocus() {
            document.getElementById('form-imput').focus()
        }

        addFocus()
    }, [])

    return (
        <Form inline onSubmit={e => handleSubmit(e, inputModal)}>
            <FormControl
                id='form-imput'
                onChange={(e) => setInputModal(e.target.value)}
                value={inputModal}
                type="text"
                placeholder={options.placeholderText}
                className='col-sm-10'
            />

            <Button
                variant={options.buttonDelete ? 'danger' : 'outline-success'}
                className='col-sm-2'
                type="submit"
            >
                {options.buttonDelete ? 'Deletar' : 'Buscar'}
            </Button>
        </Form>
    )
}