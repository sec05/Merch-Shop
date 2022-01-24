const { GoogleSpreadsheet } = require('google-spreadsheet');
require("dotenv").config()
var nodemailer = require('nodemailer');
import CryptoJS from 'crypto-js';
import data from "../../key.json"
export default async function handler(req, res) {
    if (CryptoJS.AES.decrypt(req.body.key, process.env.KEY).toString() != CryptoJS.AES.decrypt(data.API_key, process.env.KEY).toString()) {
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
    const emailStrs = []
    if (Object.keys(req.body.clothes).length != 0) {
        Object.keys(req.body.clothes).map((key, index) => {
            for (let i = 3; i <= 4; i++) {
                if (sheet.getCell(i, 0).value === key) {
                    sheet.getCell(i, sizes.indexOf(req.body.clothes[key][1]) + 1).value += req.body.clothes[key][0];
                    emailStrs.push(req.body.clothes[key][0] + "x " + req.body.clothes[key][1] + " " + key + "\n")

                }
            }

        })
    }

    if (Object.keys(req.body.nonClothes).length != 0) {
        Object.keys(req.body.nonClothes).map((key, index) => {
            for (let i = 5; i <= 12; i++) {
                if (sheet.getCell(i, 0).value === key) {
                    sheet.getCell(i, 5).value += req.body.nonClothes[key][0];
                    emailStrs.push(req.body.nonClothes[key][0] + "x " + key + "\n")
                }
            }

        })
    }
    let str = ""
    for (let s = 0; s < emailStrs.length; s++) {
        str += emailStrs[s]
    }
    // await sheet.saveUpdatedCells()
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ne-mfvp@nfty.org',
            pass: process.env.PWD
        }
    });

    var mailOptions = {
        from: 'ne-mfvp@nfty.org',
        to: 'spencer.ec09@gmail.com',
        subject: 'Your order from the NFTY-NE merch store',
        text: `Hi, \nHere is an order summary from the NFTY-NE merch store:\n${str}\nSpencer Evans-Cole\nNFTY-NE MFVP\nne-mfvp@nfty.org\n978-758-1496`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
           // console.log(error);
        } else {
           // console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).send()
}