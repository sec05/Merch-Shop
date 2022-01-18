const { GoogleSpreadsheet } = require('google-spreadsheet');
require("dotenv").config()
export default async function handler(req, res) {
  console.log(req.body)
  const doc = new GoogleSpreadsheet('1LOuiFOCWEbFn-C01CUYm2zwr72mwyOzajuE8_J1DefI');
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; 
  await sheet.loadCells("A1:L39") 
  const sizes = ["sm", "md", "lg","xl"]
    let clothes = {}
    for(let i = 23; i <= 24; i++){ 
      let tmp = {}
      for(let j = 1; j <= 4; j++){
        tmp[sizes[j-1]] = [sheet.getCell(i,j).value, sheet.getCell(i,7).value];
      }
      clothes[sheet.getCell(i,0).value] = tmp
    }
    let nonClothes = {}
    for(let i = 25; i <= 29; i++){
      nonClothes[sheet.getCell(i,0).value] = [sheet.getCell(i,5).value, sheet.getCell(i,7).value]
    }
    nonClothes[sheet.getCell(32,0).value] = [sheet.getCell(32,5).value, sheet.getCell(32,7).value]

    let errorItems = []
    if(Object.keys(req.body.clothes).length != 0)
    {
      Object.keys(req.body.clothes).map((key,index)=>{
        if(clothes[key][req.body.clothes[key][1]][0] < req.body.clothes[key][0])
          {
            errorItems.push(key)
          }
      })
    }
    if(Object.keys(req.body.nonClothes).length != 0)
    {
      Object.keys(req.body.nonClothes).map((key,index)=>{
        if(nonClothes[key][0] < req.body.nonClothes[key][0])
          {
            errorItems.push(key)
          }
      })
    }
    
    res.status(200).send(JSON.stringify(errorItems));
}