var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors') // add cors for xmlhttprequest error in browser
var fs = require('fs');
var text = ""
const nodeCmd = require('node-cmd');

app.listen(3000, function(){
	console.log("start ! express server on port 3000");
})

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.set('view engine', 'ejs')

//url routing
app.get('/', function(req, res){
	console.log('test')
	res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req, res){
	res.sendFile(__dirname + "/public/main.html")
})

app.post('/email_post', function(req, res){
    // get : req.param('email')
    console.log(req.body)
    //res.send("<h1>welcome !" + req.body.email + "</h1>")
    res.render('email.ejs', {'code' : req.body.code})
});

app.post('/ajax_send_email', function(req, res){ 
    var langType = req.body.langType
    var cmdCommand; 
    if(langType == 0){
        langType = ".py"
        cmdCommand = "python main.py"
    }
    var numberOfLibs = req.body.libraries.numberOfLibs
    var libraryInfo = req.body.libraries.libraryInfo
    for(var i = 0; i < numberOfLibs; i++){
        //console.log(libraryInfo[i])
        var nameOfFunc;
        var funcBody;
        if(numberOfLibs != i){
            nameOfFunc = libraryInfo[i].name + langType
            funcBody = libraryInfo[i].body
        }
        
        
        fs.writeFile(nameOfFunc, funcBody, function(err) {
            if(err) {
                return console.log(err);
            } 
            console.log(nameOfFunc + " was saved!");
        });  
    }
    fs.writeFile("main" + langType, req.body.main, function(err) {
        if(err) {
            return console.log(err);
        } 
        console.log("main" + langType + " was saved!");
    });
    
    console.log(cmdCommand)
    nodeCmd.get("python main.py", (err, data, stderr) => {
        var responseData = {'result' : 'ok', 'output' : data};  
        res.json(responseData)
    });
});
