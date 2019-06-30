
var jsoninfo    = [];
var zip         = new JSZip();

var FileToBLK = function (fileName, data, isLib) {
    var Fileinfo = {};
    Fileinfo.name = fileName;
    Fileinfo.isLib = isLib;

    jsoninfo.push(Fileinfo);

    zip.file(fileName, data);
};

var CreateBLK = function (blkName){
    zip.file("info.json", JSON.stringify(jsoninfo));
    blkName += ".blk";

    zip.generateAsync({type:"blob"})
        .then((content)=>{
            saveAs(content, blkName);
        });
};

var ClearBLK = function(){
    zip = new JSZip();
    jsoninfo = [];
};

var ExportBLK = function (file){
    new JSZip.external.Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent('C:\\Users\\ch02\\Desktop\\cy.zip', function(err,data){
            if(err)     reject(err);
            else        resolve(data);
        });
    }).then(function (data){
        return JSZip.loadAsync(data);
    }).then(function (data){
        console.log(data);
    });
};


