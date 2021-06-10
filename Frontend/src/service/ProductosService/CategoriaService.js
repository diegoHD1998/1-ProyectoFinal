import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL_BASE}/Categorias`


export default class RolService {

    readAll(){
        return axios.get(baseUrl).then(res => res.data)
    }

    create(categoria){
        return axios.post(baseUrl,categoria).then(res => res.data)
    }

    update(categoria){
        return axios.put(`${baseUrl}/${categoria.idCategoria}`, categoria).then(res => res.data)
    }

    delete(id){
        return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
    }

}