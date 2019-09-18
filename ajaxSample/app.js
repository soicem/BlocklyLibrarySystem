'use strict';

const Git = require('nodegit');
const cnst = require('./constant');
const common = require('./common');

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
    var cmdCommand; 
    console.log(req.body.main);
    let repo;
    let index;
    let oid;
    //console.log(cnst.add_commit_filename);
    Git.Repository.open(cnst.test_git_path)
    .then((repoResult) => (repo = repoResult))
    .then(() => {
        return fs.writeFileSync(
            cnst.test_file_path + "main.blk",
            JSON.stringify(req.body.main)
        );
    })
    .then(() => repo.refreshIndex())
    .then((indexResult) => (index = indexResult))
    .then(() => index.addByPath(cnst.add_commit_filename))
    .then(() => index.write())
    .then(() => index.writeTree())
    .then((oidResult) => {
        oid = oidResult;
        return Git.Reference.nameToId(repo, 'HEAD');
    })
    .then((head) => repo.getCommit(head))
    .then((parent) => {
        let commit_msg = 'BLK commit!';

        return repo.createCommit(
            'HEAD',
            common.get_commiter_sign(cnst),
            common.get_commiter_sign(cnst),
            commit_msg,
            oid,
            [parent]
        );
    })
    .done((commitId) => {
        console.log('New Commit: ', commitId);
    });

    let repoR;

    Git.Repository.open(cnst.cur_git_path)
        .then((repoResult) => (repoR = repoResult))
        .then(() => Git.Remote.lookup(repoR, 'origin'))
        .then((remote) => {
            return remote.push(
                ['refs/heads/master:refs/heads/master'],
                {
                    callbacks: {
                        credentials: (url, userName) => {
                            return Git.Cred.userpassPlaintextNew(cnst.account, cnst.password);
                        },
                        certificateCheck: () => {
                            return 1;
                        }
                    }
                }
            );
        })
        .then(() => {
            console.log('push done');
            //repoR.free();
        })
        .catch((e) => console.log(e));
});
