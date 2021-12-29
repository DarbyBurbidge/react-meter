import React, { useEffect, useState } from "react";
import "./Styles/Gauge.css"

interface Props {
    value: string;
    breakpoints?: string
}

export const Gauge: React.FC<Props> = (props) => {
    const [ base, setBase ] = useState(Number(props.value))
    const [ numBreakpoints, setNumBreakpoints ] = useState(Number(props.breakpoints))
    const [ meters, setMeters ] = useState({})
    const [ display, setDisplay ] = useState({})
    const breakpoints = [numBreakpoints]
    let meterStateString = 'setMeters({ '
    for(let i = 0; i < numBreakpoints; i++) {
        breakpoints[i] = ((i+1)/(numBreakpoints+1));
        console.log(breakpoints[i])
        

        if (i == 0) {
            meterStateString += `...meters, ${`metersVal${i}`}: ` + `${(base > breakpoints[0] ? 1 : (base / breakpoints[0]))}`
        }
        console.log("hmm...")
        meterStateString += `, ${`metersVal${i+1}`}: ` + `${(base - breakpoints[i] < 0 ?
                0 : 
            Math.min((base - breakpoints[i]) / breakpoints[0], 1))}`
        
        //setDisplay({...display, [`display${i}`]: (meters.[`meterVal${i}`] > 0 && base > 0)})
    }
    meterStateString += ' })'
    if(Object.keys(meters).length == 0) {
        eval(meterStateString)
    }
    /*const val1 = base > breakpoints[0] ? 1 : (base / breakpoints[0]);
    const val2 = base - breakpoints[0] < 0 ? 0 : Math.min((base - breakpoints[0]) / breakpoints[0], 1);
    const val3 = base - breakpoints[1] < 0 ? 0 : Math.min((base - breakpoints[1]) / breakpoints[0], 1);*/
    
    
    /*
        display1: (meters.meterVal1 > 0 && base > 0),
        display2: (meters.meterVal2 > 0 && base > 0),
        display3: (meters.meterVal3 > 0 && base > 0)
    })*/
    console.log(breakpoints)
    console.log(meters);
   
    return(
        <div className="gauge">
            <div className="percent">
            <svg>
                {/*<circle id="meter-1" cx="300" cy="300" r="114.6"></circle>
                <circle id="meter-1 meter-fg-1" cx="300" cy="300" r="114.6" style={display.display1 ? {strokeDasharray: `${meters.meterVal1 * 110}, ${(720 - meters.meterVal1 * 110)}`} : {display: 'none'}}></circle>
                <circle id="meter-2" cx="300" cy="300" r="114.6"></circle>
                <circle id="meter-3 meter-fg-2" cx="300" cy="300" r="114.6" style={display.display2 ? {strokeDasharray: `${meters.meterVal2 * 110}, ${(720 - meters.meterVal2 * 110)}`} : {display: 'none'}}></circle>
                <circle id="meter-3" cx="300" cy="300" r="114.6"></circle>
                <circle id="meter-3 meter-fg-3" cx="300" cy="300" r="114.6" style={display.display3 ? {strokeDasharray: `${meters.meterVal3 * 110}, ${(720 - meters.meterVal3 * 110)}`} : {display: 'none'}}></circle>
                */}
            </svg>
        </div>
        </div>
    );
};