class spriteCostume{
    constructor(){
        /*
        //Todo 현재는 local상에서 폴더를 생성함 서버에 올릴 땐 바꿔줘야 함
        var folderPath = "C:\\Users\\USER\\Desktop\\blocklylibrary\\BlocklyLibrarySystem\\google-blockly-82871b3\\tests\\src\\resources\\sprites";
        var folderName = folderPath + Sprite._name;
        var fileHandler = new ActiveXObject("Scripting.FileSystemObject");
        var folderCheck = fileHandler.FolderExists(folderName);
        if(folderCheck==false){
            fileHandler.CreateFolder(folderName)
        }
        this._imageList = {};*/
        this._currentCostume = 0;
    }

    getCurrentCostumeNum() {
        return this._currentCostume;
    }

    setCurrentCostumeNum(costumeNum) {
        this._currentCostume = costumeNum;
    }

    setCurrentCostume(num) {
        this.setCurrentCostumeNum(num);
        var l = document.getElementsByClassName('costumeImg');
        for (var i = 0; i < l.length; i++) {
            l[i].style.border = 'solid 1px #ccc';
        }
        var costumeNum = this.getCurrentCostumeNum() + "";
        document.getElementById(this.getCurrentSpriteName() + '_' + costumeNum).style.border = "solid 2px #415DCC";
    }

    addCostumeAndSelect(costumeNum, imageSrc, isClone = [false, ]) {
        //console.log(spriteName);


        if(!isClone[0]){
            this.setCurrentCostume(costumeNum);
        }
    }
}