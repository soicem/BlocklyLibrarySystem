class spriteCostume{
    constructor(){
        //Todo 현재는 local상에서 폴더를 생성함 서버에 올릴 땐 바꿔줘야 함
        var folderPath = "C:\\Users\\USER\\Desktop\\blocklylibrary\\BlocklyLibrarySystem\\google-blockly-82871b3\\tests\\src\\resources\\sprites";
        var folderName = folderPath + Sprite._name;
        var fileHandler = new ActiveXObject("Scripting.FileSystemObject");
        var folderCheck = fileHandler.FolderExists(folderName);
        if(folderCheck==false){
            fileHandler.CreateFolder(folderName)
        }
        this._imageList = {};

    }

    CreateFolder(folderName) {

    }

}