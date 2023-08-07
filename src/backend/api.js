import axios from "axios";

export const getData = async() => {
    console.log()
    const data = await axios.get(`https://6j8v6fqi1g.execute-api.us-east-2.amazonaws.com/prod/items`)
    return JSON.parse(data.data.body)
}

export const putData = async(body) => {
    console.log(body)
    const data = await axios.put(`https://6j8v6fqi1g.execute-api.us-east-2.amazonaws.com/prod/add`, body)
    return data
}