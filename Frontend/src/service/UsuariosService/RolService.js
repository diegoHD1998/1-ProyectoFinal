import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL_BASE}/Roles`


export default class RolService {

    readAll(){
        return axios.get(baseUrl).then(res => res.data)
    }

    create(rol){
        return axios.post(baseUrl,rol).then(res => res.data)
    }

    update(rol){
        return axios.put(`${baseUrl}/${rol.idRol}`, rol).then(res => res.data)
    }

    delete(id){
        return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
    }

}