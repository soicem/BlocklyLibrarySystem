class GalleryUtil {
  /**
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  static spriteChooser(input) {
    if (input.files == null) { return 0; }

    let i = 0;
    for (; i < input.files.length; i++) {
      this.addSprite(input.files[i]);
    }
    return i;
  }

  /**
   * @param {File} file
   */
  static addSprite(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      const spriteName = getNoDuplicationName(file.name);

      // Add sprite to the gallery
      document.getElementById("spriteGallery").innerHTML +=
          this.generateSpriteHtml(spriteName, reader.result);
      TrashToImg(spriteName);

      // Add sprite object to the canvas
      myCanvas.addSpriteAndSelect(spriteName, reader.result);
      myCanvas.getSpriteByName(spriteName).printProperties();
    });
  }

  /**
   * @param {string} spriteName
   * @param {string} imageBase64
   * @returns {string}
   */
  static generateSpriteHtml(spriteName, imageBase64) {
    return `<div id="${spriteName}" class="spriteImg" onclick="myCanvas.setCurrentSprite('${spriteName}')"><img src="${imageBase64}" alt=""><div class="desc">${spriteName}</div></div>`;
  }

  /**
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  static stageChooser(input) {
    if (input.files == null) { return 0; }

    let i = 0;
    for (; i < input.files.length; i++) {
      this.addStage(input.files[i]);
    }
    return i;
  }

  /**
   * @param {File} file
   */
  static addStage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      const stageName = getNoDuplicationName(file.name);

      // Add sprite to the gallery
      document.getElementById("stageGallery").innerHTML +=
          this.generateStageHtml(stageName, reader.result);

      // Add sprite object to the canvas
      myCanvas.addStage(stageName, reader.result);
      myCanvas.getSpriteByName(stageName).printProperties();
    });
  }

  /**
   * @param {string} stageName
   * @param {string} imageBase64
   * @returns {string}
   */
  static generateStageHtml(stageName, imageBase64) {
    return `<div id="${stageName}" class="stage" onclick="myCanvas.setCurrentSprite('${stageName}')"><img src="${imageBase64}" alt=""><div class="desc">${stageName}</div></div>`;
  }
}
