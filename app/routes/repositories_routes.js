const { json } = require("body-parser");
const { request } = require("express");

const https = require("https");
const options = {
  hostname: "api.github.com",
  path:
    "/orgs/takenet/repos?per_page=5&sort=created&direction=asc&language=c%23",
  method: "GET",
  headers: {
    "User-Agent": "Phnc",
  },
};

module.exports = function (app) {
  app.get("/repositories", (req, res) => {
    https.get(options, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        form = JSON.parse(data);
        formatted = form.map((elem) => {
          let obj = {
            header: {
              type: "application/vnd.lime.media-link+json",
              value: {
                title: elem.name,
                text: elem.description,
                type: "image/jpeg",
                uri: elem.owner.avatar_url,
              },
            },
          };
          return obj;
        });
        console.log(formatted);
        let content = {
            "itemType": "application/vnd.lime.document-select+json",
            "items": formatted
        };
        res.send(content);
      });

      resp.on("error", (err) => {
        console.log(err);
      });
    });
  });
};
