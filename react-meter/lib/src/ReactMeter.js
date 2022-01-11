"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactMeter = void 0;
const React = require("react");
const html_react_parser_1 = require("html-react-parser");
const existsAndInRange = (value, min, max) => {
    if (value == null) {
        return false;
    }
    return ((value >= min) && (value <= max));
};
const ReactMeter = (props) => {
    const className = (props.className && typeof (props.className) === "string") ? props.className : "react-meter";
    const cx = "50%";
    const cy = "95%";
    const baseValue = props.value;
    const sections = existsAndInRange(props.sections, 1, 6) ? props.sections : 3;
    const numBreakpoints = sections - 1;
    const colorStart = existsAndInRange(props.colorStart, 0, 360) ? props.colorStart : 120;
    const colorShift = existsAndInRange(props.colorShift, 0, 359) ? props.colorShift : 60;
    const numColors = existsAndInRange(props.numColors, 0, sections) ? props.numColors : sections;
    const luminosity = existsAndInRange(props.luminosity, 0, 100) ? props.luminosity : 50;
    const saturation = existsAndInRange(props.luminosity, 0, 100) ? props.saturation : 100;
    const meters = [];
    const display = [];
    const breakpoints = [numBreakpoints];
    let gaugeSVG = '';
    for (let i = 0; i < sections; i++) {
        breakpoints[i] = ((i + 1) / (sections));
        if (i === 0) {
            meters[i] = (baseValue > breakpoints[0] ? 1 : (baseValue / breakpoints[0]));
            display[i] = meters[i] > 0 && baseValue > 0;
        }
        gaugeSVG += `<circle id=meter-${i} cx=${cx} cy=${cy} r="114.6"></circle>` +
            `<circle id='meter-${i} meter-fg-${i}' cx=${cx} cy=${cy} r="114.6"></circle>`;
        meters[i + 1] = (baseValue - breakpoints[i] < 0 ?
            0 :
            Math.min((baseValue - breakpoints[i]) / breakpoints[0], 1));
        display[i + 1] = meters[i + 1] > 0 && baseValue > 0;
    }
    React.useEffect(() => {
        for (let i = 0; i < Object.keys(meters).length; i++) {
            const lineWidth = 10;
            const background = document.getElementById(`meter-${i}`);
            const overlay = document.getElementById(`meter-${i} meter-fg-${i}`);
            const meterEval = meters[i];
            const sectionSize = 360 / (sections);
            const backStroke = sectionSize - lineWidth + sections / (lineWidth * 2);
            const offset = 360 - (backStroke + lineWidth) * i - (lineWidth / 2);
            const overlayStroke = backStroke * meterEval;
            const overLayGap = (720 - overlayStroke);
            const backGap = (720 - backStroke);
            background === null || background === void 0 ? void 0 : background.setAttribute("style", `stroke-dasharray: ${backStroke.toFixed(0)}, ${backGap.toFixed(0)};
                stroke-dashoffset: ${(offset).toFixed(0)};
                stroke: hsl(${colorStart - (i % numColors) * colorShift}, 70%, 25%);
                width: 100%;
                height: 100%;
                fill: none;
                stroke-width: 10;
                stroke-linecap:
                round;`);
            if (display[i] && overlay && Object.keys(meters).length > 0) {
                overlay.setAttribute("style", `stroke-dasharray: ${overlayStroke.toFixed(0)}, ${overLayGap.toFixed(0)};
                    stroke-dashoffset: ${offset.toFixed(0)};
                    stroke: hsl(${colorStart - (i % numColors) * colorShift}, ${saturation}%, ${luminosity}%);
                    width: 100%;
                    height: 100%;
                    fill: none;
                    stroke-width: 10;
                    stroke-linecap: round;`);
            }
            else if (overlay) {
                overlay.setAttribute("style", "display: none");
            }
        }
    });
    return (React.createElement("div", { className: className },
        React.createElement("svg", { id: "svg-react-meter", style: { top: '5rem', margin: 'auto', width: '100%', height: '100%' } }, (0, html_react_parser_1.default)(gaugeSVG))));
};
exports.ReactMeter = ReactMeter;
//# sourceMappingURL=ReactMeter.js.map