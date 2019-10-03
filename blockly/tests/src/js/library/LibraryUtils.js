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
   * @param {HTMLElement} implementXml
   * @param {string} namespaceName
   * @param {{name:string,key,string}} library
   * @param {{name:string,key,string}} func
   * @param {string} interfaceBlockType
   * @returns {HTMLElement}
   */
  static convertToInterfaceXml(implementXml, namespaceName, library, func, interfaceBlockType) {
    const interfaceXml = document.createElement("block");
    interfaceXml.setAttribute("type", interfaceBlockType);

    const mutationXml = document.createElement("mutation");

    const namespaceXml = document.createElement("namespace");
    namespaceXml.setAttribute("name", namespaceName);
    mutationXml.appendChild(namespaceXml);

    const libraryXml = document.createElement("library");
    libraryXml.setAttribute("name", library.name);
    libraryXml.setAttribute("key", library.key);
    mutationXml.appendChild(libraryXml);

    const functionXml = document.createElement("function");
    functionXml.setAttribute("name", func.name);
    functionXml.setAttribute("key", func.key);
    const argsXml = implementXml.querySelectorAll("mutation arg");
    if (argsXml.length > 0) {
      functionXml.setAttribute("key", argsXml.length);
    }
    for (let j = 0; j < argsXml.length; j++) {
      let argXml = document.createElement("arg");
      argXml.setAttribute("name", name);
      functionXml.appendChild(argsXml);
    }
    mutationXml.appendChild(functionXml);

    const implement = this.domWrapper(
        "implement", this.domWrapper("xml", implementXml));

    mutationXml.appendChild(implement);

    interfaceXml.appendChild(mutationXml);
    console.log(interfaceXml)
    return interfaceXml;
  }

  static domWrapper(tag, xml) {
    let implementXml = document.createElement(tag);
    implementXml.appendChild(xml);
    return implementXml;
  }

  /**
   * @param {HTMLElement} procedureXml
   * @param {string} namespaceName
   * @param {{name:string,key,string}} library
   * @param {{name:string,key,string}} func
   * @returns {HTMLElement}
   */
  static convertProcedureToInterfaceXml(procedureXml, namespaceName, library, func) {
    return LibraryUtils.convertToInterfaceXml(procedureXml, namespaceName, library, func, "import_noReturn");
  }

  /**
   * @param {HTMLElement} functionXml
   * @param {string} namespaceName
   * @param {{name:string,key,string}} library
   * @param {{name:string,key,string}} func
   * @returns {HTMLElement}
   */
  static convertFunctionToInterfaceXml(functionXml, namespaceName, library, func) {
    return LibraryUtils.convertToInterfaceXml(functionXml, namespaceName, library, func, "import_return");
  }

  /**
   * @param {HTMLElement|string} implementation
   * @param {string} namespaceName
   * @param {{name:string,key,string}} library
   * @param {{name:string,key,string}} func
   * @returns {HTMLElement}
   */
  static convertImplementToInterface(implementation, namespaceName, library, func) {
    const implementXml = (typeof(implementation) === "string") ?
        (Blockly.Xml.textToDom(implementation)) : (implementation);

    const xml = document.createElement("xml");

    const returnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defreturn]");
    for (let i = 0; i < returnFunctionsXml.length; i++) {
      const functionXml = returnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertFunctionToInterfaceXml(functionXml, namespaceName, library, func);
      xml.appendChild(interfaceXml);
    }

    const noReturnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defnoreturn]");
    for (let i = 0; i < noReturnFunctionsXml.length; i++) {
      const functionXml = noReturnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertProcedureToInterfaceXml(functionXml, namespaceName, library, func);
      xml.appendChild(interfaceXml);
    }



    return xml;
  }

  /**
   * @param {string} namespaceName
   * @param {{name:string,key,string}} library
   * @param {{name:string,key,string}} func
   * @param {string} implementation
   * @returns {string}
   */
  static convertImplementToInterfaceString(namespaceName, library, func, implementation) {
    return Blockly.Xml.domToText(this.convertImplementToInterface(implementation, namespaceName, library, func));
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} libraryName
   * @return {Object<string,{key:string,xml:string,js:string}>}
   */
  static getImplementationBlocksInfo(workspace, libraryName) {
    let dict = {};

    let functionBlocks = workspace.getBlocksByType("procedures_defnoreturn", false);
    functionBlocks = functionBlocks.concat(workspace.getBlocksByType("procedures_defreturn", false));

    for (let i = 0; i < functionBlocks.length; i++) {
      Blockly.JavaScript.init(workspace);

      const functionBlock = functionBlocks[i];
      const functionName = functionBlock.getFieldValue("NAME");

      dict[functionName] = {};
      dict[functionName].key = Blockly.JavaScript.variableDB_.getName(
          functionBlock.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE);
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
