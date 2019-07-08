/*
var fileObject = [];
var XML = null;
var output = document.getElementById('importExport');

function ExtractFiles(evt){
    var zip = new JSZip();
    var jsonFile;
    var count = -1;

    var files = evt.target.files[0]; // FileList object
    //console.log("name "+files.name);
    var reader = new FileReader();

    reader.onload= (function(files){
        return function(evt){
            JSZip.loadAsync(evt.target.result)
                .then(function(blk){
                    var jsonData ="";

                    blk.forEach(function(relativePath, file){
                        count++;
                        var jsonInfo = new Object;
                        jsonInfo.name = file.name;
                        file.async('text')
                            .then(function (data){
                                jsonInfo.data = data;
                                jsonData = data;
                                fileObject.push(jsonInfo);

                                if(!XML){
                                    XML = data;
                                    output.value = XML
                                    taChange();
                                    console.log(output.value);
                                }
                            });
                    });
                }).then(()=>{
                    setTimeout(()=>{
                        var jsonData = JSON.parse(fileObject[count].data);
                        count = 0;

                        for(var i=0; i<fileObject.length-1; ++i){
                            fileObject[i].isLib = jsonData[i].isLib;
                        }
                    return fileObject;
                },1000)
            })
        };
    })(files);
    reader.readAsArrayBuffer(files);
}


function handleFileSelect(evt) {
    ExtractFiles(evt);
    console.log(fileObject);
}

//document.getElementById('getFile').addEventListener('change', handleFileSelect, false);
*/
