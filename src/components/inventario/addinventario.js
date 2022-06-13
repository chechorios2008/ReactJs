import { obtenerTodos, obtenerMarcas, obtenerTipoEquipo, obtenerUsuario, guardarInventario } from '../../services/EstadoService'
import React, { useEffect, useState } from 'react'

export default function AddInventario() {

    const [estadoEquipos, setEstadoEquipo] = useState([]);
    const [marcas, setMarca] = useState([]);
    const [tipoEquipos, setTipoEquipos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [datosEnviar, setDato] = useState({
        serial: '',
        modelo: '',
        descripcion: '',
        fotoEquipo: '',
        precio: 0,
        usuarioCargo: '',
        marca: '',
        estadoEquipo: '',
        tipoEquipo: ''
    });
    useEffect(() => {
        getEquipos()
        getMarcas()
        getTipoEquipos()
        getUsuarios()
    }, []);

    const getEquipos = () => {
        obtenerTodos().then(data => setEstadoEquipo(data.data))
    }
    const getMarcas = () => {
        obtenerMarcas().then(data => setMarca(data.data))
    }
    const getTipoEquipos = () => {
        obtenerTipoEquipo().then(data => setTipoEquipos(data.data))
    }
    const getUsuarios = () => {
        obtenerUsuario().then(data => setUsuarios(data.data))
    }

    const enviar = (e) => {
        e.preventDefault();
        guardarInventario(datosEnviar)
        .then(response=>{
            window.location='/inventario'
        })
    }
    const cambioDato = (e) => {
        e.preventDefault()
        setDato()
        setDato({
            ...datosEnviar,
            [e.target.getAttribute('id')]: e.target.value
        })
    }
    return (
        <div className='container d-flex justify-content-center my-4'>
            <div className='card' style={{ maxWidth: "600px", width: "80%" }}>
                <form className='m-4' onSubmit={enviar}>
                    <h3 className='text-center'>Agregar Inventario</h3>
                    <div class="form-group">
                        <label for="serial">Serial</label>
                        <input type="text" class="form-control" id="serial" value={datosEnviar.serial} aria-describedby="emailHelp" placeholder="Serial" onChange={cambioDato} />
                    </div>
                    <div class="form-group">
                        <label for="modelo">Modelo</label>
                        <input type="text" class="form-control" id="modelo" value={datosEnviar.modelo} aria-describedby="emailHelp" placeholder="Modelo" onChange={cambioDato} />
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <input type="text" class="form-control" id="descripcion" value={datosEnviar.descripcion} aria-describedby="emailHelp" placeholder="Descripción"  onChange={cambioDato} />
                    </div>
                    <div class="form-group">
                        <label for="fotoEquipo" >Link imagen</label>
                        <input type="text" class="form-control" id="fotoEquipo" value={datosEnviar.fotoEquipo} aria-describedby="emailHelp" placeholder="Descripción"  onChange={cambioDato}/>
                    </div>
                    <div class="form-group">
                        <label for="precio">Precio</label>
                        <input type="text" class="form-control" id="precio" aria-describedby="emailHelp" placeholder="Precio" value={datosEnviar.precio}  onChange={cambioDato}/>
                    </div>
                    <select className='form-select my-3' id='usuarioCargo' value={datosEnviar.usuarioCargo}  onChange={cambioDato}>
                        <option value="">Selecciona un usuario</option>
                        {
                            usuarios.map((usu, index) => {
                                return (
                                    <option key={usu._id} value={usu._id}>{usu.usuarios}</option>
                                )
                            })
                        }
                    </select>
                    <select className='form-select my-3' id='marca' value={datosEnviar.marca}  onChange={cambioDato}>
                        <option value="">Selecciona una marca</option>
                        {
                            marcas.map((marc, index) => {
                                return (
                                    <option key={marc._id} value={marc._id}>{marc.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <select className='form-select my-3' id='estadoEquipo' value={datosEnviar.estadoEquipo}  onChange={cambioDato}>
                        <option value="">Selecciona el estado del equipo</option>
                        {
                            estadoEquipos.map((estado, index) => {
                                return (
                                    <option key={estado._id} value={estado._id}>{estado.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <select className='form-select my-3' id='tipoEquipo' value={datosEnviar.tipoEquipo}  onChange={cambioDato}>
                        <option value="">Selecciona el tipo del equipo</option>
                        {
                            tipoEquipos.map((tipo, index) => {
                                return (
                                    <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <div className='d-flex justify-content-center my-3'>
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
