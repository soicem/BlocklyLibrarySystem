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
          alert("Failed to load a library from " + url + '.');
          reject({error: "Failed to load a library from " + url + '.'});
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

}
