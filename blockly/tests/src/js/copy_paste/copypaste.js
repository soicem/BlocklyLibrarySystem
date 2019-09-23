
// when ctrl+c is pressed
document.addEventListener('copy', function (event) {
    var xml = Blockly.Xml.workspaceToDom(blockWorkspace);
    var clipText = Blockly.Xml.domToPrettyText(xml);

    event.clipboardData.setData('text/plain', clipText); // return type = text
    event.preventDefault();
});

// when ctrl+v is pressed
document.addEventListener('paste', function (event) {
    var clipText = event.clipboardData.getData('Text'); // return type = text
    var xml = Blockly.Xml.textToDom(clipText);

    Blockly.Xml.domToWorkspace(xml, blockWorkspace);
    event.preventDefault();
});
