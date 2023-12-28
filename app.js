require('dotenv').config();
const {Sequelize, Op} = require('sequelize');

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
async function get_db(ofs, lim, selcat, searchinp, filt_sz, filt_mk) {
    console.log("get_db()_called");
    let res = [{count: 0, rows: []}, {count: 0, rows: []}, {count: 0, rows: []}];
    if (selcat == "search" || selcat == "search_") {
        res = [await Positions.findAndCountAll({where: {
            [Op.and]: [
                searchinp.split(" ").map(x => {return { 'name': { [Op.like]: '%' + x + '%' } }})
            ]
          },
            offset: ofs, limit: lim}), {count: 0, rows: []}, {count: 0, rows: []}]
    }
    else {
        if (selcat !="") {
            const where_tmp = {subsubcat:selcat}
            if (filt_sz != "Все размеры")
                where_tmp.size = filt_sz;
            if (filt_mk != "Все марки")
                where_tmp.mark = filt_mk;
            res = [await Positions.findAndCountAll({
                where: where_tmp,
                offset: ofs, limit: lim}),
                
                await Positions.findAndCountAll({
                    where: {subsubcat:selcat},
                    order: [
                        ['size', 'ASC'],
                    ],
                    attributes: [
                        // specify an array where the first element is the SQL function and the second is the alias
                        [Sequelize.fn('DISTINCT', Sequelize.col('size')) ,'size'],
                
                        // specify any additional columns, e.g. country_code
                        // 'country_code'
                
                    ]}),
                await Positions.findAndCountAll({
                    where: {subsubcat:selcat},
                    order: [
                        ['mark', 'ASC'],
                    ],
                    attributes: [
                        // specify an array where the first element is the SQL function and the second is the alias
                        [Sequelize.fn('DISTINCT', Sequelize.col('mark')) ,'mark'],
                
                        // specify any additional columns, e.g. country_code
                        // 'country_code'
                
                    ]})
                ]
        }
    }
    return res;
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

var fs=require('fs');
var cattree=fs.readFileSync('cattree.json', 'utf8');

app.get('/express_backend', (req, res) => { //Строка 9
    get_db(parseInt(req.query.ofs), parseInt(req.query.lim), req.query.selcat, req.query.searchinp, req.query.filt_size, req.query.filt_mark).then((data) => {res.send({ express: JSON.stringify(data[0]), sizes: JSON.stringify(data[1]), marks: JSON.stringify(data[2]),catinfo: cattree })})
     //Строка 10
  }); //Строка 11
  
app.use(express.static('app'));
  
app.listen(3000);

