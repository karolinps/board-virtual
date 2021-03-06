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

export default class Taks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taks: [],
            isOpen: false,
            title: "",
            description: "",
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
        this.getAllTaks()
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

    //Get all taks de ese board
    getAllTaks() {
        this.setState({ isLoading: true })
        axios.get(urlApi.url + 'boards/' + this.props.match.params.id + '/taks', {

        }).then(res => {

            this.setState({
                taks: res.data,
                isLoading: false
            })


        }).catch(err => {
            console.log(err)
        })

    }
    //Modal update board
    toggleModalUpdate(id) {
        this.setState({ isOpenUpdate: true, id_tak: id, isLoading: true })

        axios.get(urlApi.url + 'taks/' + id, {
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
        this.setState({ isOpenDelete: true, id_tak: id })

    }

    //Onchange generic
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Save board create
    save(e) {
        e.preventDefault();
        this.setState({ isOpen: false, isLoading: true })
        axios.post(urlApi.url + 'taks', {
            "title": this.state.title,
            "description": this.state.description,
            "boardId": Number(this.props.match.params.id),

        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllTaks() })
                Swal.fire({
                    icon: 'success',
                    title: 'Tarea creada con éxito',
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
        axios.put(urlApi.url + 'taks/' + id, {
            "title": this.state.title,
            "description": this.state.description,
            "boardId": Number(this.props.match.params.id),
        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllTaks() })
                Swal.fire({
                    icon: 'success',
                    title: 'Los datos de la tarea han sido actualizado',
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
        axios.delete(urlApi.url + 'taks/' + id, {

        })
            .then(res => {
                this.setState({ isLoading: false, ...this.getAllTaks() })
                Swal.fire({
                    icon: 'success',
                    title: 'La tarea ha sido borrada',
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
                <h2>Tareas</h2>
                <Grid container spacing={1}>

                    <Grid item sm={6} md={3} xs={12}>
                        <Button
                            className="btn-green"
                            onClick={this.handleClickOpen}>Añadir Tarea</Button>
                    </Grid>

                </Grid><br />
                <Grid container spacing={1} style={{ padding: "10px" }}>
                    {this.state.taks.map(data => {
                        return <Grid item sm={6} md={2} xs={6} key={data.id}>
                            <Card>
                                <CardHeader
                                    title={data.title}
                                />
                                {/*<CardContent>
                                    {data.description}
                                </CardContent>*/}
                                <CardActions style={{ backgroundColor: "#1f9e6d" }}>
                                    <Tooltip title="Editar datos tarea">
                                        <EditIcon style={{ cursor: "pointer", color: "#fff" }} onClick={() => this.toggleModalUpdate(data.id)} />
                                    </Tooltip>
                                    <Tooltip title="Borrar Tarea">
                                        <DeleteIcon style={{ cursor: "pointer", color: "#fff" }} onClick={() => this.toggleModalDelete(data.id)} />
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
                            <h3 style={{ textAlign: "center" }}>¿Está seguro de borrar la tarea?</h3>
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
                            onClick={(e) => this.delete(e, this.state.id_tak)}
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
                    <form onSubmit={(e) => this.update(e, this.state.id_tak)}>
                        <DialogContent>
                            <DialogContentText>
                                <h3 style={{ textAlign: "center" }}>Editar datos de la tarea</h3>
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
                                <h3 style={{ textAlign: "center" }}>Agregar nueva tarea</h3>
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
