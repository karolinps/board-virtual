import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import axios from "axios"
import urlApi from "../api"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import TopBarProgress from "react-topbar-progress-indicator";
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {  Link } from "react-router-dom";

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            boards: [],
            isOpen: false,
            title: "",
            isOpenUpdate: false,
            isOpenDelete: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChange = this.onChange.bind(this)
        this.save = this.save.bind(this)
        this.delete = this.delete.bind(this)
        this.toggleModalDelete = this.toggleModalDelete.bind(this)
        this.toggleModalUpdate = this.toggleModalUpdate.bind(this)
    }

    componentDidMount() {
        this.getAllBoards()
    }

    //Open modal create board
    handleClickOpen() {
        this.setState({ isOpen: true })
    };

    //Close modales
    handleClose() {
        this.setState({
            isOpen: false,
            isOpenDelete: false,
            isOpenUpdate: false,
            title: "",
            description: ""
        })
    }

    //Get all boards
    getAllBoards() {
        this.setState({ isLoading: true })
        axios.get(urlApi.url + 'boards', {

        }).then(res => {

            this.setState({
                boards: res.data,
                isLoading: false
            })

        }).catch(err => {
            console.log(err)
        })

    }
    //Modal update board
    toggleModalUpdate(id) {
        this.setState({ isOpenUpdate: true, id_board: id, isLoading: true })

        axios.get(urlApi.url + 'boards/' + id, {
        })
            .then(res => {
                this.setState({ title: res.data.title, description: res.data.description, isLoading: false })
            })
            .catch(err => {
                console.log(err);
            });

    }

    //Modal delete board
    toggleModalDelete(id) {
        this.setState({ isOpenDelete: true, id_board: id })

    }

    //Onchange generic
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Save board create
    save(e) {
        e.preventDefault();
        this.setState({ isOpen: false, isLoading: true })
        axios.post(urlApi.url + 'boards', {
            "title": this.state.title,
            "description": this.state.description

        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllBoards() })
                Swal.fire({
                    icon: 'success',
                    title: 'Tablero creado con éxito',
                    showConfirmButton: false,
                    timer: 2500
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    //Update board register
    update(e, id) {
        e.preventDefault();
        this.setState({ isOpenUpdate: false, isLoading: true })
        axios.put(urlApi.url + 'boards/' + id, {
            "title": this.state.title,
            "description": this.state.description
        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllBoards() })
                Swal.fire({
                    icon: 'success',
                    title: 'Los datos del tablero han sido actualizado',
                    showConfirmButton: false,
                    timer: 2500
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    //Delete register board
    delete(e, id) {
        e.preventDefault();
        this.setState({ isOpenDelete: false, isLoading: true })
        axios.delete(urlApi.url + 'boards/' + id, {

        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllBoards() })
                Swal.fire({
                    icon: 'success',
                    title: 'El tablero ha sido borrado',
                    showConfirmButton: false,
                    timer: 2500
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="App">
                {this.state.isLoading ?
                    <TopBarProgress /> : null
                }
                <h2>Tableros</h2>
                <Grid container spacing={1}>

                    <Grid item sm={6} md={3} xs={12}>
                        <Button
                            className="btn-green"
                            onClick={this.handleClickOpen}>Crear Tablero</Button>
                    </Grid>

                </Grid><br />
                <Grid container spacing={1} style={{ padding: "10px" }}>
                    {this.state.boards.map(data => {
                        return <Grid item sm={6} md={3} xs={6} key={data.id}>
                            <Card>
                                <CardHeader
                                    title={data.title}
                                />
                                <CardContent>
                                    {data.description}
                                </CardContent>
                                <CardActions style={{ backgroundColor: "#3085d6" }}>
                                    <Tooltip title="Editar datos tablero">
                                        <EditIcon style={{ cursor: "pointer", color: "#fff" }} onClick={() => this.toggleModalUpdate(data.id)} />
                                    </Tooltip>
                                    <Tooltip title="Borrar Tablero">
                                        <DeleteIcon style={{ cursor: "pointer", color: "#fff" }} onClick={() => this.toggleModalDelete(data.id)} />
                                    </Tooltip>
                                    <Tooltip title="Ver Tablero">
                                        <Link to={"/taks/"+data.id}><VisibilityIcon style={{ cursor: "pointer", color: "#fff" }} /></Link>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    })}
                </Grid>
                {/*Modal para borrar register board*/}
                <Dialog
                    open={this.state.isOpenDelete}
                    onClose={this.handleClose}
                    fullWidth
                >
                    <DialogContent>
                        <DialogContentText>
                            <div className="iconWarning" ><ErrorOutlineIcon /></div>
                            <h3 style={{ textAlign: "center" }}>¿Está seguro de borrar el tablero?</h3>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            className="btn-red"
                        >No
                        </Button>
                        <Button
                            className="btn-green"
                            onClick={(e) => this.delete(e, this.state.id_board)}
                        >Si
                    </Button>
                    </DialogActions>
                </Dialog>

                {/*Modal update register board*/}
                <Dialog
                    open={this.state.isOpenUpdate}
                    onClose={this.handleClose}
                    fullWidth
                >
                    <form onSubmit={(e) => this.update(e, this.state.id_board)}>
                        <DialogContent>
                            <DialogContentText>
                                <h3 style={{textAlign:"center"}}>Editar datos del tablero</h3>
                    </DialogContentText>
                            <TextField
                                value={this.state.title}
                                label="Titulo"
                                name="title"
                                type="text"
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                value={this.state.description}
                                label="Descripción"
                                name="description"
                                type="text"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleClose}
                                className="btn-red"
                            >Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="btn-green"
                            >Si
                            </Button>
                        </DialogActions>
                    </form>

                </Dialog>
                {/*Modal create register board*/}

                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth
                >
                    <form onSubmit={this.save}>
                        <DialogContent>
                            <DialogContentText>
                                <h3 style={{textAlign:"center"}}>Agregar nuevo tablero</h3>
                    </DialogContentText>
                            <TextField
                                value={this.state.title}
                                label="Titulo"
                                name="title"
                                type="text"
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                value={this.state.description}
                                label="Descripción"
                                name="description"
                                type="text"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleClose}
                                className="btn-red"
                            >Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="btn-green"
                            >Si
                            </Button>
                        </DialogActions>
                    </form>

                </Dialog>
            </div>

        );
    }

}
