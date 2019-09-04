

function collapseToolbox(workspace) {
  let tree = workspace.getToolbox().tree_;

  if (tree) {
    tree.setSelectedItem(null);
  }
}

// 라이브러리 xml의 원형을 본따서 arg, type, name 을 바꾼 후 리턴
function generateLibFuncXML(arr) {
  var argument = 0;

  if (arr['type'] === "procedures_defnoreturn") {
    arr['type'] = "import_noReturn"
  } else if (arr['type'] === "procedures_defreturn") {
    arr['type'] = "import_return"
  }

  if (arr['arg'] !== null && arr['arg'] !== undefined) {
    argument = Object.keys(arr['arg']).length;
  }

  var a = "<block type=\"" + arr['type'] + "\" y=\"138\">" + "\n" +
      "<mutation func=\"" + arr['funcName'] + "\" args=\"" + argument + "\">" + "\n";

  for (var key in arr['arg']) {
    // check if the property/key is defined in the object itself, not in parent
    if (arr['arg'].hasOwnProperty(key)) {
      a += "<arg name=\"" + arr['arg'][key] + "\"></arg>" + "\n"
    }
  }
  a += "</mutation>" + "\n" +
      "</block>" + "\n";
  console.log(a);
  return a;
}

// function xml parser
function libFuncToMutationCode(libFunction) {
  var parser, xmlDoc, txt = "";
  var result = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">" + "\n";

  parser = new DOMParser();
  xmlDoc = parser.parseFromString(libFunction, "text/xml");

  var blockObjects = xmlDoc.getElementsByTagName("block");
  //console.log(blockObjects)

  for (var blockIdx = 0; blockIdx < blockObjects.length; blockIdx++) {
    var dict = {};
    var x = blockObjects[blockIdx];
    if (x.getAttributeNode("type").nodeValue === "text_print") {
      continue;
    }
    var flag = 0;
    if (x.getAttributeNode("type").nodeValue === "procedures_defnoreturn") {
      flag = 1;
    }

    if (x.getAttributeNode("type").nodeValue === "procedures_defreturn") {
      flag = 1;
    }
    if (!flag) {
      continue;
    }
    console.log(x.getAttributeNode("type").nodeValue);

    dict["type"] = x.getAttributeNode("type").nodeValue;
    var xlen = x.childNodes.length;
    var y = x.firstChild;
    for (var i = 0; i < xlen; i++) {
      if (y.nodeName === "mutation") {
        var firstNode = y.firstChild;
        var mLen = y.childNodes.length;
        var argDict = {};
        for (var j = 0; j < mLen; j++) {
          if (firstNode.nodeName !== "#text") {
            txt += firstNode.nodeName + "<br>";
            console.log(firstNode.getAttributeNode("name").nodeValue);
            argDict[j] = firstNode.getAttributeNode("name").nodeValue
          }
          firstNode = firstNode.nextSibling
        }
        dict["arg"] = argDict
      } else if (y.nodeName === "field") {
        dict["funcName"] = y.childNodes[0].nodeValue;
        console.log(y.childNodes[0].nodeValue)
      }
      if (y.nodeType == 1) {
        txt += y.nodeName + "<br>";
      }
      y = y.nextSibling;
    }
    console.log(dict)
    result += generateLibFuncXML(dict)
  }
  result += "</xml>" + "\n";
  return result;
}

function myImport(workspace, xmlString) {
  let convertedXml = libFuncToMutationCode(xmlString);
  let xml = Blockly.Xml.textToDom(convertedXml);

  let childrenCount = xml.children.length || 0;
  for (let i = 0; i < childrenCount; i++) {
    let child = xml.children[i];

    let childIsBlock = (child.nodeName === "block");
    let childTypeIsImportReturn = (child.getAttribute("type") === "import_return");
    let childTypeIsImportStatement = (child.getAttribute("type") === "import_noReturn");

    if (childIsBlock && (childTypeIsImportReturn || childTypeIsImportStatement)) {
      document.getElementById("toolbox-categories").querySelector("[name='Import']").append(
          child);
      i--;
      childrenCount--;
    }
  }

  collapseToolbox();
  workspace.updateToolbox(document.getElementById("toolbox-categories"));
}
