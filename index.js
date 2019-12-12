const http = require('http');
const https = require('https');
const colors = require('colors/safe');
const fs = require("fs");

const status = async (arraySites) => {
    //console.time('#forEach');

    var arrayJson = JSON.parse(arraySites);

    arrayJson.forEach(function (website) {

        var protocol = website.url.split(':');

        var method = protocol[0] === 'http' ? http : https;

        //Método asyncrono
        method.get(website.url, (resp) => {

            const { statusCode } = resp;

            //if (statusCode == 200) {
            //   successcode = successcode + 1
            // }
            // const contentType = resp.headers['content-type'];

            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                if (statusCode !== 200 && status !== 301) {
                    var data = new Date();

                    var statusText = "\n" + data
                    statusText += "\n" + "Nome: " + website.nome + "\n" + "Url: " + website.url + "\n" + "Responsável: " + website.responsavel + "\n" + "Status: " + statusCode + "\n"
                    fs.appendFileSync('errors.txt', statusText);

                }

                //console.log(resp.statusCode);

                //Retorna o código do site completo
                // console.log(data);

                //Retorna o status HTTP

                console.log('');
                console.log('Nome: ' + website.nome);
                console.log('Url: ' + website.url);
                console.log('Responsável: ' + website.responsavel);
                console.log('STATUS: ' + colors.green(statusCode));
                console.log('');
                //console.log(contentType);
            });

        }).on("error", (err) => {

            var data = new Date();

            var statusText = "\n" + data
            statusText += "\n" + "Nome: " + website.nome + "\n" + "Url: " + website.url + "\n" + "Responsável: " + website.responsavel + "\n" + "Status: " + err.message + "\n"

            fs.appendFileSync('errors.txt', statusText);


            //Retorna o status HTTP
            console.log('');
            console.log('Nome: ' + website.nome);
            console.log('Url: ' + website.url);
            console.log('Responsável: ' + website.responsavel);
            console.log('STATUS: ' + colors.red(err.message));
            console.log('');
            //console.log(contentType);
        });


    })
    //console.timeEnd('#forEach');
}


module.exports = { status }