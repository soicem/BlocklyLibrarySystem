
var jsoninfo    = [];
var zip         = new JSZip();
var img = zip.folder("images");
var backimg = zip.folder("backImage");

var FileToBLK = function (fileName, data, isLib) {
    var Fileinfo = {};
    Fileinfo.name = fileName;
    Fileinfo.isLib = isLib;

    jsoninfo.push(Fileinfo);
    zip.file(fileName, data);
};

function ImgToBLK(name, Source){
    if(Source === undefined || Source === null)
        return;

    img.file(name, Source, {base64:true});
};

function BackImgToBLK(name, Source){
    if(Source === undefined || Source === null)
        return;

    backimg.file(name, Source, {base64:true});
};

var CreateBLK = function (blkName, ext){
    zip.file("info.json", JSON.stringify(jsoninfo));
    blkName += "." + ext;

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


