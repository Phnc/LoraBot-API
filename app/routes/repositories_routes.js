const { json } = require('body-parser');
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
                    form = JSON.parse(data);
                    formatted = form.map(elem => {
                        let obj = {
                            profilePic: elem.owner.avatar_url,
                            name: elem.name,
                            description: elem.description
                        };
                        return obj;
                    });
                    console.log(formatted);
                    res.send(formatted);
                });

                resp.on("error", err => {
                    console.log(err);
                });
            })
    });
}