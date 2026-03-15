import { styleText } from 'node:util'

export const text = `
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
export const width = lines[0]?.length ?? 0

lines.forEach(line => {
	if (line.length !== width) console.warn(warning_msg)
})
