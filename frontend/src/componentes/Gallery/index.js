import React from 'react'
import { Container, Col, Image } from 'react-bootstrap'

import './style.css'

export default function Gallery({ fotos, atualFoto }) {
    return (
        <Container className='gallery text-center'>
            <Col>
                <h1>Histórico de fotos</h1>
                <hr />
                <div className='img-container'>
                    {
                        fotos.map((url, idx) => (
                            <Image key={idx} src={url} />
                        ))
                    }
                </div>
            </Col>
        </Container>
    )
}