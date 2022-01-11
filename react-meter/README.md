# README
## react-meter

### This is a small customizable meter for React (Types Included)

install using:
```
> npm install react-meter
or
> yarn add react-meter
```
then import and use:

```jsx
import { ReactMeter } from "react-meter";

const someNumber = .9

<ReactMeter value={someNumber} />
```

![example image](https://github.com/DarbyBurbidge/react-meter/blob/dev/gauge/.images/GuageExampleAlpha.png)

### There are a number of customizable options (Note: the color function used is hsl):
| property | Description | Default |
| --- | --- | --- |
| className: | string that is used to specify the class of the enclosing div | (default: "react-meter") Note: the SVG has id="svg-react-meter" but is not customizable |
| value: | number between 0 and 1 representing the percentage to fill the meter. | none, required: true |
| sections: | number representing how many segments to build the meter. | default: 3 |
| numColors: | number representing the maximum number of colors (once passed the colors repeat the pattern: if max is 3, color #4 will be the same as color #1 e.g.). | default: sections |
| colorStart: | number representing the hue value to start (start position is the leftmost segment) | default: 120 |
| colorShift: | number representing how far the hue should shift with each segment (left to right) | default: 60 |
| saturation: | number representing the saturation level for the foreground stroke | default: 100 |
| luminosity: | number representing the luminosity level for the foreground stroke | default: 50 |

```jsx
<ReactMeter
    className="react-meter"
    value={someNumber} 
    sections={6}
    numColors={6}
    colorStart={120}
    colorShift={60}
    luminosity={50}
    saturation={75}   
/>
```

![example of customization](https://github.com/DarbyBurbidge/react-meter/blob/dev/gauge/.images/GuageCustomExample.png)

### This is my first published npm package and any recommendations or advice would be much appreciated.



