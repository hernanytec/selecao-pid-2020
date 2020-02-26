import React from 'react'
import { Modal, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import FormUser from '../FormUser'
import FormInput from '../FormInput'

export default function MenuBar({ dialogOptions, handleShow, handleClose, handleSubmit, profile, userId }) {
    if (!dialogOptions)
        dialogOptions = {}

    const getMenuItems = () => {
        if (profile) {
            if (!userId)
                return null
            return (
                <Button
                    className="ml-auto"
                    onClick={() => handleShow("handle_user")}
                >
                    Editar usuário
                </Button>
            )
        } else if (handleShow) {
            return (
                <Nav className="mr-auto">
                    <NavDropdown title="Usuário" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => handleShow("handle_user")}>Adicionar usuário</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleShow("search_by_key")}>Buscar por rg ou cpf</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleShow("search_by_name")}>Buscar por nome</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleShow("remove_user")}>Remover usuário</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        getMenuItems()
                    }
                </Navbar.Collapse>
            </Navbar>

            <Modal show={dialogOptions.show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    {
                        dialogOptions.dialogType === 'handle_user'
                            ? <FormUser edit={dialogOptions.edit} userId={userId} />
                            : <FormInput
                                options={dialogOptions}
                                handleSubmit={handleSubmit}
                            />
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}