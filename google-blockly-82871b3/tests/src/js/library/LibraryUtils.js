class LibraryUtils {

  /**
   * @param {Library|LibraryInfo|string} source
   */
  static getLibraryName(source) {
    let libraryName = "";

    if (typeof (source) === "string") {
      libraryName = source;
    } else if (source instanceof Library) {
      libraryName = source.info.name
    } else if (source instanceof LibraryInfo) {
      libraryName = source.name
    } else {
      console.error("Wrong source type was used");
    }

    return libraryName;
  }

  /**
   * Returns library in JSON object from the given url
   * @param url The url where JSON file of a library exists
   * @returns {Promise<{info:*,imports:{},functions:Object.<string,{xml:string,js:string}>,jsObject:string,hashCode:string}>} Returns null if failed
   */
  static async getLibraryJsonFromUrl(url) {
    function getOnload(xhr, resolve, reject) {
      return () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject({error: `Failed to load a library from '${url}.'`});
        }
      };
    }

    return await new Promise(((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = getOnload(xhr, resolve, reject);

      xhr.send();
    }));
  }

  /**
   * @param {HTMLElement} functionBlockXml
   * @param {string} libraryName
   * @param {string} interfaceBlockName
   * @returns {HTMLElement}
   */
  static convertToInterfaceXml(functionBlockXml, libraryName, interfaceBlockName) {
    const functionName = functionBlockXml.querySelector("field[name=NAME]").innerText;
    const argsXml = functionBlockXml.querySelectorAll("mutation arg");

    let interfaceXml = document.createElement("block");
    interfaceXml.setAttribute("type", interfaceBlockName);

    let mutationXml = document.createElement("mutation");
    mutationXml.setAttribute("lib", libraryName);
    mutationXml.setAttribute("func", functionName);
    mutationXml.setAttribute("args", argsXml.length);

    for (let j = 0; j < argsXml.length; j++) {
      const argXml = argsXml[j];
      const argName = argXml.getAttribute("name");

      let aXml = document.createElement("arg");
      aXml.setAttribute("name", argName);
      mutationXml.appendChild(aXml);
    }

    interfaceXml.appendChild(mutationXml);
    return interfaceXml;
  }

  /**
   * @param {HTMLElement} procedureBlockXml
   * @param {string} libraryName
   * @returns {HTMLElement}
   */
  static convertProcedureToInterfaceXml(procedureBlockXml, libraryName) {
    return LibraryUtils.convertToInterfaceXml(procedureBlockXml, libraryName, "import_noReturn");
  }

  /**
   * @param {HTMLElement} functionBlockXml
   * @param {string} libraryName
   * @returns {HTMLElement}
   */
  static convertFunctionToInterfaceXml(functionBlockXml, libraryName) {
    return LibraryUtils.convertToInterfaceXml(functionBlockXml, libraryName, "import_return");
  }

  /**
   * @param {string} libraryName
   * @param {HTMLElement|string} implementation
   * @returns {HTMLElement}
   */
  static convertImplementToInterface(libraryName, implementation) {
    const implementXml = (typeof(implementation) === "string") ?
        (Blockly.Xml.textToDom(implementation)) : (implementation);

    const xml = document.createElement("xml");

    const returnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defreturn]");
    for (let i = 0; i < returnFunctionsXml.length; i++) {
      const returnFunctionXml = returnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertFunctionToInterfaceXml(returnFunctionXml, libraryName);
      xml.appendChild(interfaceXml);
    }

    const noReturnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defnoreturn]");
    for (let i = 0; i < noReturnFunctionsXml.length; i++) {
      const noReturnFunctionXml = noReturnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertProcedureToInterfaceXml(noReturnFunctionXml, libraryName);
      xml.appendChild(interfaceXml);
    }

    return xml;
  }

  static convertImplementToInterfaceString(libraryName, implementation) {
    return Blockly.Xml.domToText(this.convertImplementToInterface(libraryName, implementation));
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} libraryName
   */
  static getImplementationBlocksInfo(workspace, libraryName) {
    let dict = {};

    let functionBlocks = workspace.getBlocksByType("procedures_defnoreturn", false);
    functionBlocks = functionBlocks.concat(workspace.getBlocksByType("procedures_defreturn", false));

    for (let i = 0; i < functionBlocks.length; i++) {
      const functionBlock = functionBlocks[i];
      const functionName = functionBlock.getFieldValue("NAME");

      dict[functionName] = {};
      dict[functionName].xml = this.getBlockXml(functionBlock);
      dict[functionName].js = this.getBlockJs(workspace, functionBlock);
    }

    return dict;
  }

  /**
   * @param {Blockly.Block} block
   * @returns {string}
   */
  static getBlockXml(block) {
    let blockXml = Blockly.Xml.blockToDom(block);
    let blockXmlText = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n"
        + Blockly.Xml.domToPrettyText(blockXml)
        + "\n</xml>";

    console.log(blockXmlText);
    return blockXmlText;
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {Blockly.Block} block
   * @returns {string}
   */
  static getBlockJs(workspace, block) {
    Blockly.JavaScript.init(workspace);
    delete Blockly.JavaScript.definitions_["variables"];
    Blockly["JavaScript"].blockToCode(block, true);
    const blockJsText = Blockly.JavaScript.finish("");

    console.log(blockJsText);
    return blockJsText;
  }
}
