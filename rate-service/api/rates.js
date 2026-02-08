import axios from "axios";
console.log("axios", axios);

export default async function handler(req, res){
    try{
        const response = await axios.get('https://api.frankfurter.dev/v1/latest?base=USD');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(response.data);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch rates'});
    }
}