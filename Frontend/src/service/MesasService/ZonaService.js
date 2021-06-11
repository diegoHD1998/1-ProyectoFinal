import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL_BASE}/Zonas`


export default class ZonaService {

    readAll(){
        return axios.get(baseUrl).then(res => res.data)
    }

    create(zona){
        return axios.post(baseUrl,zona).then(res => res.data)
    }

    update(zona){
        return axios.put(`${baseUrl}/${zona.idZona}`, zona).then(res => res.data)
    }

    delete(id){
        return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
    }

}