import { styleText } from 'node:util'

const text = `
       .    *          .                .                                       
   .                                .                      .     .         *    
       .         .          *                  .     *                  .       
 .    *                      .      .                  .                     .  
              #######                                          *                
............###    #####.....................####................#####..........
:::::::::::##      ##$ ###::::::::::::::::###$#####::::::::::::##""$$####:::::::
~~~~~~~~~##         #$"" ###~~~~~~~~~~#####""$$##  ###--~~~~###   ""$"# ###~~~~~
======###            $$""" ####===#####      "$$##   #######       $$" ##  ###==
%%%####              ##$$"""  #####             $$#   #####       $$ """###  ###
###                   ##$$$"""   ###             $..       ###$$$$     "  ##    
  ###                  ###$$$      ####           #...                     ###  
                         ## $$        ##             ...                     #  
`

const warning_msg = styleText('yellow', "ASCII art line width is not consistent")
const lines = text.split('\n').filter(Boolean)
const current_line_length = lines.at(0)?.length ?? 0

lines.forEach(line => {
	if (line.length !== current_line_length) console.warn(warning_msg)
})

export { text, current_line_length as width }
