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

const Anekdots = require("./Anekdots")(sequelize);

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

async function get_db(ofs, lim, selcat, searchinp, filt_sz, filt_mk) {
    res = await Anekdots.findAll({where: {id:randomIntFromInterval(1, 120000)}});
    return res;
}


const express = require("express");
  
const app = express();
const jsonParser = express.json();
  
  
app.get("/", function(request, response){
    response.sendFile(__dirname + "//index.html");
});

app.get('/express_backend', (req, res) => {
  get_db().then(data => res.send({a: JSON.stringify(data)}));
});


const multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })

const { spawn } = require('child_process');
app.post('/', upload.single('form-reqs'), (req, res) => {
  const command = spawn('D:/ultralyticProject/venv/Scripts/python.exe', ["D:/ultralyticProject/main.py"]);
  command.stdin.write("uploads/" + req.file.filename);
  command.stdin.end();
  let datasend = ""
  command.stdout.on('data', function (data) {
    datasend += data.toString();
    console.log(data);
  });
  command.on('close', (code) => {
    if (code !== 0) {
      console.log(`grep process exited with code ${code}`);
    }
    res.send(`<img src='uploads/${req.file.filename}'><p>${JSON.stringify(datasend)}</p>`);
  });
});


  
app.use('/uploads', express.static(__dirname + '/uploads'));
  
app.listen(3000, 'localhost');

