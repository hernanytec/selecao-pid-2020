import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

export default function MyListGroupItem({ label, value }) {
    return (
        <ListGroupItem className='d-flex justify-content-between' >
            <span >{label}</span>
            <span>{value}</span>
        </ListGroupItem >
    )
}