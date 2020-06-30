let sketch = require('sketch')
import { createPaletteFromString } from './palette-replace'
import command_util from './command_util'

export default function() {
  sketch.UI.getInputFromUser(
  	"Enter custom replace palette", { initialValue: 'example : BA869B:BA34FF,FFFFFF:EAEAEA' },
  	(err, value) => {
  		if (err) {
        console.log('custom color replace cancelled')
  			return
  		} else {
        try {
           var paletteJson = createPaletteFromString(value)
           console.log(paletteJson)
           command_util(paletteJson)
         } catch(error) {
           sketch.UI.message('‼️ print enter palette in correct format ‼️')
           console.error(error)
         }
       }
  	}
  )
}
