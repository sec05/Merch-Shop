const { GoogleSpreadsheet } = require('google-spreadsheet');
require("dotenv").config()
import CryptoJS from 'crypto-js';
import data from "../../key.json"
export default async function handler(req, res) {
    if(CryptoJS.AES.decrypt(req.body.key,process.env.KEY).toString()!=CryptoJS.AES.decrypt(data.API_key,process.env.KEY).toString())
    {
        res.status(403).send();
        return;
    }
    const doc = new GoogleSpreadsheet('1LOuiFOCWEbFn-C01CUYm2zwr72mwyOzajuE8_J1DefI');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells("A1:L39")
    const sizes = ["sm", "md", "lg", "xl"]
    if (Object.keys(req.body.clothes).length != 0) {
        Object.keys(req.body.clothes).map((key,index)=>{
           for(let i = 3; i <=  4; i ++)
           {
               if(sheet.getCell(i, 0).value === key)
               {  
                    sheet.getCell(i, sizes.indexOf(req.body.clothes[key][1])+1).value += req.body.clothes[key][0];
               }
           }
        
        })
    }

    if (Object.keys(req.body.nonClothes).length != 0) {
        Object.keys(req.body.nonClothes).map((key,index)=>{
           for(let i = 5; i <=  12; i ++)
           {
               if(sheet.getCell(i, 0).value === key)
               {
                    sheet.getCell(i, 5).value += req.body.nonClothes[key][0];
               }
           }
        
        })
    }
    await sheet.saveUpdatedCells()
    res.status(200).send()
}