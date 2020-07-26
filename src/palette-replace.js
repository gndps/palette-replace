var Style = require('sketch/dom').Style

export const litJsonWhite = {
    "1ECBED" : "00FFFF",
    "D931BC" : "FF00FF",
    "E6D900" : "FFFF00",
    "AC313C" : "FF0000",
    "21A64C" : "00CC00",
    "D22A4E" : "FF008A",
    "1757CF" : "0000CC",
    "DA4538" : "FF7000",
    "AAC90B" : "D1FF00",
    "6F47B1" : "8E00FF",
    "9451A6" : "C000FF",
    "1A7BD8" : "0082CC",
    "4FB6A7" : "00CCA2",
    "2E2949" : "31115D",
    "9488B0" : "B986FF",
    "BA869B" : "FF86C6",
    "B34C6C" : "FF34A0",
    "5A78BF" : "3D7DFF",
    "4D88D6" : "00ADFF",
    "7D9DCE" : "8BDAFF",
    "9F8CAC" : "91B6FF",
    "A49FB3" : "C8DBFF",
    "BBB100" : "FFFD00",
    "B7B560" : "FFFE84",
    "2B2747" : "31115D",
    "39317C" : "4F00BC"
}

export const litJsonColor = {
    "10CAEC" : "00FFFF",
    "E642C8" : "FF00FF",
    "DDDF02" : "FFFD33",
    "DF232A" : "FF0000",
    "2FBA5D" : "0AB600",
    "F12668" : "FF008A",
    "0849EB" : "002CB4",
    "E94D44" : "FF7000",
    "9AC110" : "D1FF00",
    "8365D6" : "4F00BC",
    "C45ADD" : "8800BA",
    "0C9CFC" : "00AAFF",
    "2BCCD9" : "00FFA2",
    "E5A5CA" : "FF99CF",
    "4F3A84" : "1B0737",
    "533D68" : "1A0422",
    "243956" : "061F2A",
    "1F1F1F" : "000000",
    "8B4A60" : "561212",
    "7FB4FA" : "8BDAFF",
    "2BA2FC" : "3AC0FF"

}

export function createPaletteFromString(paletteString) {
  var colorPairs = paletteString.split(",")
  var paletteDict = {}
  colorPairs.forEach((colorPair, i) => {
    var colors = colorPair.split(":")
    var colsrc = colors[0]
    var coldest = colors[1]
    paletteDict[colsrc] = coldest
  });
  return paletteDict
}

export const unlitJsonWhite = swap(litJsonWhite)
export const unlitJsonColor = swap(litJsonColor)

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

export function replacePalette(layer, paletteJson) {
  if(layer.layers == null || (layer.style.fills != null && layer.style.fills.length > 0)) {
    // console.log(`will replace color for ${layer.name}`)

    // console.log(layer.style)
    // console.log(layer.style.fills)
    // replace fill color
    layer.style.fills.forEach((fill, i) => {
      var fillColor = fill.color.toUpperCase().split("#")[1]
      var alphaChannel = 'ff'
      if(fillColor.length == 8) {
        fillColor = fillColor.slice(0,-2)
        alphaChannel = fillColor.slice(-2)
      }
      // console.log(`current fill color = ${fillColor}`)
      if(Object.keys(paletteJson).includes(fillColor)) {
        var replaceWithColor = "#" + paletteJson[fillColor].toLowerCase()
        fill['color'] = replaceWithColor
        // console.log(`changing fill color ${fill.color.toUpperCase()} to ${replaceWithColor}`)
      }
    });

    // replace border color
    layer.style.borders.forEach((border, i) => {
      var borderColor = border.color.toUpperCase().split("#")[1]
      var alphaChannel = 'ff'
      if(borderColor.length == 8) {
        borderColor = borderColor.slice(0,-2)
        alphaChannel = borderColor.slice(-2)
      }
      if(Object.keys(paletteJson).includes(borderColor)) {
        var replaceWithColor = "#" + paletteJson[borderColor].toLowerCase()
        border['color'] = replaceWithColor
        // console.log(`changing border color ${borderColor} to ${replaceWithColor}`)
      }
    });

    if(layer.style.textColor != null) {
      var textColor = layer.style.textColor.toUpperCase().split("#")[1]
      var alphaChannel = 'ff'
      if(textColor.length == 8) {
        textColor = textColor.slice(0,-2)
        alphaChannel = textColor.slice(-2)
      }
      // console.log(`current fill color = ${textColor}`)
      if(Object.keys(paletteJson).includes(textColor)) {
        var replaceWithColor = "#" + paletteJson[textColor].toLowerCase()
        layer.style['textColor'] = replaceWithColor
        // console.log(`changing text color ${layer.style.textColor.toUpperCase()} to ${replaceWithColor}`)
      }
    }

  } else {
    layer.layers.forEach((lyr, i) => {
      replacePalette(lyr, paletteJson)
    });
  }
}
