const http = require('http');
const https = require('https');
const colors = require('colors/safe');

global.statusFailed = 0;

const status = (arraySites) => {
    console.time('#forEach');

    var arrayJson = JSON.parse(arraySites);

    arrayJson.forEach(function (website) {

        var protocol = website.url.split(':');

        if (protocol[0] === 'http') {
            method = http;
        } else {
            method = https;
        }

        const request = method.get(website.url, (resp) => {

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

                //console.log(resp.statusCode);

                //Retorna o código do site completo
                // console.log(data);

                //Retorna o status HTTP
                console.log('');
                console.log('Nome: ' + website.nome);
                console.log('Url: ' + website.url);
                console.log('Responsável: ' + website.responsavel);
                console.log('Status: ' + statusCode);
                console.log('');
                //console.log(contentType);
            });

        }).on("error", (err) => {

            //Retorna o status HTTP
            console.log('');
            console.log('Nome: ' + website.nome);
            console.log('Url: ' + website.url);
            console.log('Responsável: ' + website.responsavel);
            console.log('Status: ' + colors.red(err.message));
            console.log('');
            //console.log(contentType);
        });

        console.log(global.statusFailed)

        request.end();
    })
    console.timeEnd('#forEach');
}

module.exports = { status }