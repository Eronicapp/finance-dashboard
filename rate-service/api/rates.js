import axios from "axios";
// console.log("axios", axios);

export default async function handler(req, res){
    try{
        const response = await axios.get('https://api.frankfurter.dev/v1/latest?base=USD');
        if(!response.ok){
            throw new Error('frankfurter API responded with status: ${response.status}');
        }
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(response.data);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch rates', details: error.message});
    }
}
