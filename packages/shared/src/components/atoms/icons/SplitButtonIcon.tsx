// externals
import * as React from "react";

// style
import baseCss from "../../common/base.module.css";

// interfaces/types
import { StandardInvertibleComponentProps } from "../../common/types";

// utils
import { getFillAndStrokeClassNames } from "../../common/propUtils";
import { buildClassName } from "../../../utils/classNameBuilder";

export type SplitButtonIconProps = StandardInvertibleComponentProps;

export const SplitButtonIcon: React.FC<SplitButtonIconProps> = (props) => {
    const { fillClass, strokeClass } = getFillAndStrokeClassNames(
        props,
        baseCss.fillInverted,
        baseCss.fill,
        baseCss.strokeInverted,
        baseCss.stroke
    );

    const classNameToUse = buildClassName(strokeClass, props.className);

    return (
        <svg
            fill="none"
            className={classNameToUse}
            fillRule="evenodd"
            stroke="black"
            strokeWidth="0.501"
            strokeLinejoin="bevel"
            strokeMiterlimit="10"
            fontFamily="Times New Roman"
            fontSize="16"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            overflow="visible"
            width="75pt"
            height="75pt"
            viewBox="0 -75 75 75"
        >
            <defs>
            </defs>
            <g
                id="Layer 1"
                transform="scale(1 -1)"
            >
                <path
                    d="M 35.1,55.499 L 35.129,43.335 C 35.41,35.27 39.893,30.75 46.107,24.592 L 43.009,21.601 L 42.876,21.442 C 42.771,21.262 42.767,21.131 42.78,20.911 C 42.78,20.018 43.387,19.5 44.316,19.5 L 53.816,19.5 C 54.272,19.5 54.684,19.676 54.989,19.957 C 55.074,19.942 55.158,19.928 55.243,19.911 L 55.225,19.929 L 55.086,20.057 C 55.343,20.341 55.5,20.712 55.5,21.118 L 55.5,30.074 C 55.5,30.967 54.483,31.836 53.722,31.707 C 53.615,31.689 53.519,31.667 53.445,31.638 C 53.377,31.609 53.296,31.535 53.233,31.474 L 49.753,28.115 C 45.66,32.303 42.205,34.333 40.405,40.669 C 40.067,42.994 40.105,45.562 40.105,47.419 C 40.105,50.194 40.147,55.531 40.166,55.499 L 35.1,55.499 Z M 25.247,28.115 L 21.767,31.474 C 21.702,31.535 21.621,31.609 21.555,31.638 C 21.479,31.667 21.383,31.689 21.278,31.707 C 20.515,31.836 19.5,30.967 19.5,30.074 L 19.5,21.118 C 19.5,20.712 19.655,20.341 19.912,20.057 L 19.775,19.929 L 19.756,19.911 C 19.841,19.928 19.926,19.942 20.009,19.957 C 20.314,19.676 20.728,19.5 21.184,19.5 L 30.682,19.5 C 31.612,19.5 32.22,20.018 32.22,20.911 C 32.231,21.131 32.227,21.262 32.124,21.442 L 31.989,21.601 L 28.891,24.592 C 31.413,27.093 33.651,29.321 35.438,31.628 C 34.371,33.385 33.577,35.247 33.117,37.349 C 31.356,33.536 28.3,31.24 25.247,28.115 Z"
                    className={fillClass}
                    fill="#0d2644"
                    stroke="none"
                    strokeLinejoin="miter"
                    markerStart="none"
                    markerEnd="none"
                />
            </g>
        </svg>
    );
};
