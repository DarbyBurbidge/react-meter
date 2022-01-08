import React, { useEffect } from "react";
import parse from "html-react-parser";
import "./Gauge.css";

interface Props {
    className?: string
    value: number
    sections?: number
    colorStart?: number
    colorShift?: number
    numColors?: number
    saturation?: number
    luminosity?: number
}

export const Meter: React.FC<Props> = (props) => {
    const className = props.className ? props.className : "gauge"
    const cx = "50%"
    const cy= "95%"
    const baseValue = props.value
    const sections = props.sections ? props.sections : 3
    const numBreakpoints = sections - 1
    const colorStart = props.colorStart ? props.colorStart : 120
    const colorShift = props.colorShift ? props.colorShift : 60
    const numColors = props.numColors ? props.numColors : sections
    const luminosity = props.luminosity ? props.luminosity : 50
    const saturation = props.saturation ? props.saturation : 100
    const meters: (number[] | never[]) = []
    const display: (boolean[] | never[]) = []
    
    const breakpoints = [numBreakpoints]
    
    let gaugeSVG: string = ''
    for(let i = 0; i < sections; i++) {
        breakpoints[i] = ((i+1)/(sections));
        

        if (i === 0) {
            meters[i] = (baseValue > breakpoints[0] ? 1 : (baseValue / breakpoints[0]))
            display[i] = meters[i] > 0 && baseValue > 0
            //gaugeSVG += `<circle id=meter-${i} cx=${props.cx} cy=${props.cy} r="114.6"></circle>` +
            //            `<circle id='meter-${i} meter-fg-${i}' cx=${props.cx} cy=${props.cy} r="114.6"></circle>`
        }
        gaugeSVG += `<circle id=meter-${i} cx=${cx} cy=${cy} r="114.6"></circle>` +
                    `<circle id='meter-${i} meter-fg-${i}' cx=${cx} cy=${cy} r="114.6"></circle>`
        meters[i+1] = (baseValue - breakpoints[i] < 0 ?
            0 : 
            Math.min((baseValue - breakpoints[i]) / breakpoints[0], 1))
        display[i+1] = meters[i+1] > 0 && baseValue > 0
    }
    useEffect(() => {
        for(let i = 0; i < Object.keys(meters).length; i++) {
            const lineWidth = 10
            const background = document.getElementById(`meter-${i}`)
            const overlay = document.getElementById(`meter-${i} meter-fg-${i}`)
            const meterEval = meters[i]
            const sectionSize = 360 / (sections)
            let backStroke = sectionSize - lineWidth + sections/(lineWidth*2) //the addon is for some fractional losses on higher numbers of sections
            const offset = 360 - (backStroke+lineWidth)*i - lineWidth/2
            const overlayStroke = backStroke * meterEval
            const overLayGap = (720 - overlayStroke)
            
            const backGap = (720 - backStroke)
            background?.setAttribute("style", `stroke-dasharray: ${backStroke.toFixed(0)}, ${backGap.toFixed(0)}; stroke-dashoffset: ${(offset).toFixed(0)}; stroke: hsl(${colorStart - (i%numColors)*colorShift}, 70%, 25%);}`)
            if (display[i] && overlay && Object.keys(meters).length > 0) {
                overlay.setAttribute("style", `stroke-dasharray: ${overlayStroke.toFixed(0)}, ${overLayGap.toFixed(0)}; stroke-dashoffset: ${offset.toFixed(0)}; stroke: hsl(${colorStart - (i%numColors)*colorShift}, ${saturation}%, ${luminosity}%);}`)
            } else if (overlay) {
                overlay.setAttribute("style", "display: none")
            }
        }
    });

   
    return(
        <div className={className}>
            <svg id="svg">
                {parse(gaugeSVG)}
            </svg>
        </div>
    );
};