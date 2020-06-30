import sketch from 'sketch'
import { replacePalette } from './palette-replace'
// documentation: https://developer.sketchapp.com/reference/api/

export default function(paletteJson) {
  const doc = sketch.getSelectedDocument()
  const selectedLayers = doc.selectedLayers
  const selectedCount = selectedLayers.length
  var layer = null
  if(selectedCount == 1) {
    selectedLayers.forEach((lyr, i) => {
      layer = lyr
    })
    replacePalette(layer, paletteJson)
  } else {
    sketch.UI.message("Please select 1 layer")
  }
}
