import React from "react"

import {
    Button,
} from "reactstrap"

import { IconLoading } from "../Icons"


export const EditButton = props => {
    const {
        loading,
        click,
    } = props

    return (
        <Button
            color="info"
            size="sm"
            onClick={click}
        >
            {loading ? <IconLoading /> : <i className="fa fa-edit" />}
        </Button >
    )
}

export const DeleteButton = props => {
    const {
        loading,
        click,
    } = props

    return (
        <Button
            color="danger"
            size="sm"
            onClick={click}
        >
            {loading ? <IconLoading /> : <i className="fa fa-trash" />}
        </Button >
    )
}

export const CancelButton = props => {
    const {
        loading,
        onClick
    } = props

    return (
        <Button
            color="danger"
            onClick={onClick}
            disabled={loading}
        >
            <i className="fa fa-ban"></i> Cancelar
        </Button>
    )
}

export const CloseButton = props => {
    const {
        loading,
        onClick
    } = props

    return (
        <Button
            color="danger"
            onClick={onClick}
            disabled={loading}
        >
            <i className="fa fa-ban"></i> Cerrar
        </Button>
    )
}

export const SaveButton = props => {
    const {
        loading,
        onClick
    } = props

    return (
        <Button
            onClick={onClick}
            disabled={loading}
            color="success"
        >
            {loading ? <IconLoading /> : <i className="fa fa-save" />} Guardar
        </Button>
    )
}

export const NewButton = props => {
    const {
        loading,
        onClick
    } = props

    return (
        <Button
            color="success"
            onClick={onClick}
        >
            {loading ? <IconLoading /> : <i className="fa fa-plus" />} Nuevo
        </Button>
    )
}
