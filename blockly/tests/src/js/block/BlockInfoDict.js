"use strict";

class BlockInfoDict {
  /**
   * @param {HTMLElement} xml
   * @param {string} namespaceName
   * @param {string} libraryName
   * @param {string[]}oldFunctions
   */
  static parseFromXml(xml, namespaceName, libraryName, oldFunctions) {
    const blockInfoDict = new BlockInfoDict();

    oldFunctions.forEach(functionName => {
      const queryString = `block>mutation>namespace[name="${namespaceName}"]>library[name="${libraryName}"]>function[name="${functionName}"]`;

      for (const [i, functionXml] of xml.querySelectorAll(queryString).entries()) {
        const libraryXml = functionXml.parentElement;
        const namespaceXml = libraryXml.parentElement;
        const mutationXml = namespaceXml.parentElement;
        const blockXml = mutationXml.parentElement;
        const blockInfo = BlockInfo.parseFromXml(blockXml);
        blockInfoDict.add(functionName + i, blockInfo);
      }
    });

    return blockInfoDict;
  }

  /**
   * @param {Library} library
   */
  static parseFromLibrary(library) {
    const blockInfoDict = new BlockInfoDict();

    for (const functionName in library.functions) {
      if (!library.functions.hasOwnProperty(functionName)) continue;

      const func = library.functions[functionName];
      const xml = Blockly.Xml.textToDom(func.interfaceXml);
      const blockInfo = BlockInfo.parseFromXml(xml.querySelector("block"));
      blockInfoDict.add(functionName, blockInfo);
    }

    return blockInfoDict;
  }


  /**
   */
  constructor() {
    this.blockInfos = {};
  }

  /**
   * @returns {Object<string,BlockInfo>}
   */
  get blockInfos() {
    return this._blockInfos;
  }

  /**
   * @private
   * @param {Object<string,BlockInfo>} blockInfo
   */
  set blockInfos(blockInfo) {
    this._blockInfos = blockInfo;
  }

  /**
   * @param {string} functionName
   * @param {BlockInfo} blockInfo
   */
  add(functionName, blockInfo) {
    this.blockInfos[functionName] = blockInfo;
  }

  /**
   * @param {BlockInfoDict} libraryBlockInfoDict
   */
  updateFromLibraryBlockInfoDict(libraryBlockInfoDict) {
    for (const blockInfosKey in this.blockInfos) {
      if (!this.blockInfos.hasOwnProperty(blockInfosKey)) continue;

      const blockInfo = this.blockInfos[blockInfosKey];
      blockInfo.updateFromLibraryBlockInfo(libraryBlockInfoDict.blockInfos[blockInfo.funcName]);
    }
  }
}
