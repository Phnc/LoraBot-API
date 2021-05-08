const { request } = require('express');

const https = require("https");
const options = {
    hostname: 'api.github.com',
    path: '/orgs/takenet/repos?per_page=5&sort=created&direction=asc&language=c%23',
    method: 'GET',
    headers: {
        'User-Agent': 'Phnc'
    }
};

module.exports = function(app){
    app.get('/repositories', (req, res) => {
        https
            .get(options, resp => {
                let data = "";
                resp.on("data", chunk => {
                    data+=chunk;
                });

                resp.on("end", () => {
                    res.send(JSON.parse(data));
                });

                resp.on("error", err => {
                    console.log(err);
                });
            })
    });
}