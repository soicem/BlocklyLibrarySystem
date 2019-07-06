/*
var fileObject = [];
var SpriteXML = {};
var output = document.getElementById('importExport');

function ExtractFiles(evt){
    var zip = new JSZip();
    var jsonFile;
    var count = -1;

    var files = evt.target.files[0]; // FileList object
    //console.log("name "+files.name);
    var reader = new FileReader();

    reader.onload= (function(){
        return function(evt){
            JSZip.loadAsync(evt.target.result)
                .then(function(blk){
                    blk.forEach(function(relativePath, file){
                        if( (file.name).indexOf(".xml") !== -1 ){

                            file.async('text')
                                .then(function (data) {
                                    console.log(file.name);
                                    SpriteXML[file.name] = data;
                                    console.log(JSON.stringify(SpriteXML));
                                })
                        }
                    })
                }).then(function(){
            });
        };
    })(files);
    reader.readAsArrayBuffer(files);
}


function getXML(){
    return SpriteXML;
}

function handleFileSelect(evt) {
    ExtractFiles(evt);
    //console.log(fileObject);
}

//document.getElementById('getFile').addEventListener('change', handleFileSelect, false);
*/
