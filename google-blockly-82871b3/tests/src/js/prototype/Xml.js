class Xml {
  /**
   * @param {HTMLElement} xml
   * @param {Library} library
   * @param {string[]} oldFunctions
   * @return {HTMLElement}
   */
  static updateLibraryBlocks(xml, library, oldFunctions) {
    const namespaceName = library.info.author;
    const libraryName = library.info.name;
    const libraryInfos = this.getBlockInfosFromLibrary(library);
    const blockInfos = this.getBlockInfos(xml, namespaceName, libraryName, oldFunctions);

    blockInfos.forEach((blockInfo) => {
      const libraryInfo = libraryInfos[blockInfo.functionName];

      if (libraryInfo &&
          blockInfo.type === libraryInfo.type &&
          ArrayUtil.equal(blockInfo.args, libraryInfo.args)) {

        blockInfo.mutation.replaceChild(libraryInfo.implement.cloneNode(true), blockInfo.implement);
      } else {
        blockInfo.mutation.setAttribute("outdated", "true");
      }
    });

    return xml;
  }

  /**
   * @param {HTMLElement} xml
   * @param {string} namespaceName
   * @param {string} libraryName
   * @param {string[]}oldFunctions
   * @returns {[]}
   */
  static getBlockInfos(xml, namespaceName, libraryName, oldFunctions) {
    let blockInfos = [];
    oldFunctions.forEach((functionName) => {
      const queryString = `block>mutation[ns="${namespaceName}"][lib="${libraryName}"][func="${functionName}"]`;
      xml.querySelectorAll(queryString).forEach((selection) => {
        blockInfos.push(this.blockInfoFromXml(selection.parentElement));
      });
    });
    return blockInfos;
  }

  /**
   * @param {Library} library
   */
  static getBlockInfosFromLibrary(library) {
    const blockInfos = {};

    for (let funcName in library.functions) {
      if (!library.functions.hasOwnProperty(funcName)) continue;

      const func = library.functions[funcName];
      const xml = Blockly.Xml.textToDom(func.interfaceXml);
      blockInfos[funcName] = this.blockInfoFromXml(xml.querySelector("block"));
    }

    return blockInfos;
  }

  /**
   * @param {HTMLElement} xml
   * @return {{element:Element,type:string,mutation:Element,implement:Element,args:string[]}}
   */
  static blockInfoFromXml(xml) {
    const element = xml;
    const type = element.getAttribute("type");
    const mutation = element.querySelector("mutation");
    const functionName = mutation.getAttribute("func");
    const implement = mutation.querySelector("implement");

    const args = [];
    mutation.querySelectorAll("arg").forEach((e) => {
      args.push(e.getAttribute("name"));
    });

    return {
      element: element,
      type: type,
      mutation: mutation,
      functionName: functionName,
      implement: implement,
      args: args
    };
  }
}
