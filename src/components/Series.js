import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Series = () => {
    const[data, setData] = useState([]);

    useEffect(()=>{
        axios
            .get('/api/series')
            .then(res=>{
                setData(res.data.data)
            })
    },[])

    const deleteSerie = id => {
        axios
            .delete('/api/series/'+id)
            .then(res => {
                const filtered = data.filter(item => item.id !== id);
                setData(filtered);
            })
    }
    const renderRow = record => {

        return(
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Excluir</button>
                    <Link to={'/series/'+ record.id} className='btn btn-warning'>Info</Link>
                </td>
            
            </tr>
        );
    }


    if(data.length === 0){
        return(
            <div className="container">
                <h1>Séries</h1>
                <Link to="/series/new" className='btn btn-primary'>Nova Séries</Link><br /><br />
                <div className='alert alert-warning' role='alert'>
                    Não existem séries criadas.
                </div>

            </div>
        );
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link to="/series/new" className='btn btn-primary'>Nova Séries</Link><br /><br />
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map(renderRow)}
                </tbody>
            </table>
        </div>
    );
  }

  export default Series;