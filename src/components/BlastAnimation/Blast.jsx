import React from 'react'
import './blast.scss'

const Blast = ({ letterClass, arrayStr = [], indexLetter }) => {
    
    return (
        <span>
            {arrayStr.map((char, index) => {
                return ( <span
                     key={index + char} 
                     className={`${letterClass} _${index + indexLetter}`}
                >
                    {char}
                </span>
             )
           })}
        </span>
    )
}  

export default Blast