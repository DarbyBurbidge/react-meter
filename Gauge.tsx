import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "./Styles/Gauge.css";

interface Props {
    value: number;
    breakpoints: number
    posX: string
    posY: string
}

export const Gauge: React.FC<Props> = (props) => {
    const [ base, setBase ] = useState(props.value)
    const [ prevBase, setPrevBase ] = useState(base)
    const [ numBreakpoints, setNumBreakpoints ] = useState(props.breakpoints)
    const [ meters, setMeters ] = useState({})
    const [ display, setDisplay ] = useState({})
    const [recalcDisplay, setRecalcDisplay] = useState(true)
    if(base != props.value || base != prevBase) {
            setPrevBase(base)
            setBase(props.value)
            setRecalcDisplay(true)
    } 
    if (numBreakpoints != props.breakpoints) {
        console.log("bad breakpoints")
        setNumBreakpoints(props.breakpoints)
    }
    // console.log(base)
    // console.log(prevBase)
    
    const breakpoints = [numBreakpoints]
    
    let gaugeSVG: string = ''
    let meterStateString = 'setMeters({ '
    let displayStateString = 'setDisplay({ '
    for(let i = 0; i < numBreakpoints; i++) {
        breakpoints[i] = ((i+1)/(numBreakpoints+1));
        //console.log(breakpoints[i])
        

        if (i == 0) {
            meterStateString += ` ${`meterVal${i}`}: ` + `${(base > breakpoints[0] ? 1 : (base / breakpoints[0]))}`
            displayStateString += ` display${i}: eval('meters.meterVal${i} > 0 && base > 0')`
            gaugeSVG += `<circle id=meter-${i} cx=${props.posX} cy=${props.posY} r="114.6"></circle>` +
                        `<circle id='meter-${i} meter-fg-${i}' cx=${props.posX} cy=${props.posY} r="114.6"></circle>`
        }
        gaugeSVG += `<circle id=meter-${i+1} cx=${props.posX} cy=${props.posY} r="114.6"></circle>` +
                    `<circle id='meter-${i+1} meter-fg-${i+1}' cx=${props.posX} cy=${props.posY} r="114.6"></circle>`
        meterStateString += `, ${`meterVal${i+1}`}: ` + `${(base - breakpoints[i] < 0 ?
                0 : 
            Math.min((base - breakpoints[i]) / breakpoints[0], 1))}`
        displayStateString += `, display${i+1}: eval('meters.meterVal${i+1} > 0 && base > 0')`
    }
    meterStateString += ' })'
    displayStateString += ' })'
    if(Object.keys(meters).length == 0 || Object.keys(meters).length != numBreakpoints+1 || (prevBase != base)) {
        eval(meterStateString)
    }
    if((Object.keys(meters).length !== 0) && ((Object.keys(display).length != Object.keys(meters).length) || (prevBase != base))) {
        eval(displayStateString)
        //console.log(display)
    }
    useEffect(() => {
        
        if((Object.keys(meters).length !== 0) && recalcDisplay) {
            eval(displayStateString)
            //console.log(display)
            setRecalcDisplay(false)
        }
        for(let i = 0; i < Object.keys(meters).length; i++) {
            const lineWidth = 10
            const background = document.getElementById(`meter-${i}`)
            const overlay = document.getElementById(`meter-${i} meter-fg-${i}`)
            const meterEval = eval(`meters.meterVal${i}`)
            const sectionSize = 360 / (numBreakpoints + 1)
            let backStroke = sectionSize - lineWidth - 2 + numBreakpoints/lineWidth //the addon is for some fractional losses on higher numbers of sections
            const offset = 360 - (backStroke+lineWidth)*i - lineWidth + lineWidth/(2*numBreakpoints)
            const overlayStroke = backStroke * meterEval
            const overLayGap = (720 - overlayStroke)
            
            //console.log(backStroke)
            const backGap = (720 - backStroke)
            background?.setAttribute("style", `stroke-dasharray: ${backStroke.toFixed(0)}, ${backGap.toFixed(0)}; stroke-dashoffset: ${(offset).toFixed(0)}; stroke: hsl(${120 - i*60}, 70%, 25%);}`)
            if (eval(`display.display${i}`) && overlay && Object.keys(meters).length > 0) {
                //console.log(eval(`display.display${i}`))
                overlay.setAttribute("style", `stroke-dasharray: ${overlayStroke.toFixed(0)}, ${overLayGap.toFixed(0)}; stroke-dashoffset: ${offset.toFixed(0)}; stroke: hsl(${120 - i*60}, 100%, 50%);}`)
                //console.log(`meter-fg-${i}`)
            } else if (overlay) {
                overlay.setAttribute("style", "display: none")
            }
        }
    });
    //console.log(meters)

   
    return(
        <div className="gauge">
            <div className="percent">
            <svg id="svg">
                {parse(gaugeSVG)}
                {/*
                <circle id="meter-1" cx="300" cy="300" r="114.6"></circle>
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