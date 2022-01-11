import * as React from "react";
export interface MeterProps {
    className?: string;
    value: number;
    sections?: number;
    colorStart?: number;
    colorShift?: number;
    numColors?: number;
    saturation?: number;
    luminosity?: number;
}
export declare const ReactMeter: React.FC<MeterProps>;
