require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DS_PASSWORD,
     {
       host: process.env.DB_HOST,
       port: process.env.DB_PORT,
       dialect: 'mysql'
     }
   );

sequelize.authenticate();

const Positions = require("./Positions")(sequelize);

let datadb;
async function get_db() {
    const res = Positions.findAll();
    
    return await res;
}

var _getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];
  
    filesystem.readdirSync(dir).forEach(function(file) {
  
        file = dir+'/'+file;
        var stat = filesystem.statSync(file);
  
        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);
  
    });
  
    return results;
  
  };

const express = require("express");
  
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();
  
app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
     
    response.json(request.body); // отправляем пришедший ответ обратно
});
  
app.get("/", function(request, response){
      
    if (request.query.q === "test") {
        get_db().then((res) => {
            let tmp = JSON.stringify(res);
            response.json(tmp);});
        return;
    }
    response.sendFile(__dirname + "//app/index.html");
});

app.get('/express_backend', (req, res) => { //Строка 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
  }); //Строка 11
  
app.use(express.static('app'));
  
app.listen(3000);

