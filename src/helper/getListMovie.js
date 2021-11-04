import axios from 'axios'
import { API, KEY } from '../const'

export default async function getMovie(param, url) {
    let params = {
        apikey: KEY,
        ...param,
        url
    }
    return await axios.get(API, { params })
    // let getData = await axios.get(API, { params })
    // let result = getData.data
    // return result
}