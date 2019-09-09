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
   * @param {string} namespaceName
   * @param {string} libraryName
   * @param {string} interfaceBlockName
   * @returns {HTMLElement}
   */
  static convertToInterfaceXml(functionBlockXml, namespaceName, libraryName, interfaceBlockName) {
    const functionName = functionBlockXml.querySelector("field[name=NAME]").innerText;
    const argsXml = functionBlockXml.querySelectorAll("mutation arg");

    let interfaceXml = document.createElement("block");
    interfaceXml.setAttribute("type", interfaceBlockName);

    let mutationXml = document.createElement("mutation");
    mutationXml.setAttribute("ns", namespaceName);
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

    let implement = this.domWrapper("implement", this.domWrapper("xml", functionBlockXml));

    mutationXml.appendChild(implement);
    interfaceXml.appendChild(mutationXml);
    return interfaceXml;
  }

  static domWrapper(tag, xml) {
    let implementXml = document.createElement(tag);
    implementXml.appendChild(xml);
    return implementXml;
  }

  /**
   * @param {HTMLElement} procedureBlockXml
   * @param {string} namespaceName
   * @param {string} libraryName
   * @returns {HTMLElement}
   */
  static convertProcedureToInterfaceXml(procedureBlockXml, namespaceName, libraryName) {
    return LibraryUtils.convertToInterfaceXml(procedureBlockXml, namespaceName, libraryName, "import_noReturn");
  }

  /**
   * @param {HTMLElement} functionBlockXml
   * @param {string} namespaceName
   * @param {string} libraryName
   * @returns {HTMLElement}
   */
  static convertFunctionToInterfaceXml(functionBlockXml, namespaceName, libraryName) {
    return LibraryUtils.convertToInterfaceXml(functionBlockXml, namespaceName, libraryName, "import_return");
  }

  /**
   * @param {string} namespaceName
   * @param {string} libraryName
   * @param {HTMLElement|string} implementation
   * @returns {HTMLElement}
   */
  static convertImplementToInterface(namespaceName, libraryName, implementation) {
    const implementXml = (typeof(implementation) === "string") ?
        (Blockly.Xml.textToDom(implementation)) : (implementation);

    const xml = document.createElement("xml");

    const returnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defreturn]");
    for (let i = 0; i < returnFunctionsXml.length; i++) {
      const functionXml = returnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertFunctionToInterfaceXml(functionXml, namespaceName, libraryName);
      xml.appendChild(interfaceXml);
    }

    const noReturnFunctionsXml = implementXml.querySelectorAll("block[type=procedures_defnoreturn]");
    for (let i = 0; i < noReturnFunctionsXml.length; i++) {
      const functionXml = noReturnFunctionsXml[i];
      const interfaceXml = LibraryUtils.convertProcedureToInterfaceXml(functionXml, namespaceName, libraryName);
      xml.appendChild(interfaceXml);
    }

    return xml;
  }

  /**
   * @param {string} namespaceName
   * @param {string} libraryName
   * @param {string} implementation
   * @returns {string}
   */
  static convertImplementToInterfaceString(namespaceName, libraryName, implementation) {
    return Blockly.Xml.domToText(this.convertImplementToInterface(namespaceName, libraryName, implementation));
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
