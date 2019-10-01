class XmlUtil {
  /**
   * @param {HTMLElement} xml
   * @param {Library} library
   * @param {string[]} oldFunctions
   * @return {HTMLElement}
   */
  static updateLibraryBlocks(xml, library, oldFunctions) {
    const namespaceName = library.info.author;
    const libraryName = library.info.name;
    const libraryBlockInfos = BlockInfoDict.parseFromLibrary(library);
    const blockInfos = BlockInfoDict.parseFromXml(xml, namespaceName,
        libraryName, oldFunctions);
    blockInfos.updateFromLibraryBlockInfoDict(libraryBlockInfos);

    return xml;
  }
}
