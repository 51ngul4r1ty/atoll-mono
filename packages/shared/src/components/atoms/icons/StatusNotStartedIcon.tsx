// externals
import * as React from "react";

// style
import baseCss from "../../common/base.module.css";

// interfaces/types
import { StandardInvertibleComponentProps } from "../../common/types";

// utils
import { getFillAndStrokeClassNames } from "../../common/propUtils";

export type StatusNotStartedIconProps = StandardInvertibleComponentProps;

export const StatusNotStartedIcon: React.FC<StatusNotStartedIconProps> = (props) => {
    const { fillClass, strokeClass } = getFillAndStrokeClassNames(
        props,
        baseCss.fillInverted,
        baseCss.fill,
        baseCss.strokeInverted,
        baseCss.stroke
    );

    return (
        <svg
            fill="none"
            className={strokeClass}
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
                    d="M 35.408,21.129 L 35.409,21.133 L 35.802,24.48 C 36.755,24.359 37.723,24.341 38.687,24.43 L 39.076,21.092 L 39.078,21.077 C 37.851,20.958 36.62,20.977 35.408,21.129 Z M 42.582,21.807 L 42.581,21.809 L 41.479,24.999 C 42.412,25.297 43.323,25.706 44.197,26.227 L 45.985,23.397 L 46.002,23.371 C 44.903,22.708 43.756,22.188 42.582,21.807 Z M 28.552,23.591 L 28.555,23.596 L 30.367,26.44 C 31.188,25.916 32.062,25.49 32.969,25.163 L 31.865,21.976 L 31.863,21.973 C 30.709,22.385 29.597,22.926 28.552,23.591 Z M 48.876,25.558 L 48.866,25.569 L 46.498,27.96 C 47.25,28.667 47.904,29.451 48.456,30.29 L 51.313,28.507 L 51.325,28.5 C 50.636,27.441 49.818,26.452 48.876,25.558 Z M 23.65,28.417 C 23.581,28.52 23.514,28.623 23.448,28.727 L 23.461,28.735 L 26.321,30.511 C 26.371,30.432 26.423,30.353 26.475,30.275 C 26.967,29.528 27.523,28.848 28.132,28.237 L 25.748,25.843 L 25.747,25.842 C 24.977,26.612 24.272,27.472 23.65,28.417 Z M 52.962,31.753 L 52.952,31.756 L 49.775,32.884 C 50.135,33.845 50.383,34.846 50.511,35.863 L 53.873,35.498 L 53.875,35.497 C 53.717,34.219 53.411,32.962 52.962,31.753 Z M 21.03,35.552 L 24.393,35.918 C 24.51,34.95 24.735,33.989 25.075,33.054 L 22.23,32.047 L 21.903,31.932 L 21.886,31.926 C 21.458,33.111 21.174,34.328 21.03,35.552 Z M 24.363,38.77 L 21,39.135 C 21.123,40.375 21.389,41.598 21.788,42.781 L 24.978,41.649 L 24.976,41.649 C 24.664,40.714 24.458,39.748 24.363,38.77 Z M 49.891,41.801 L 49.889,41.801 L 53.08,42.93 C 53.511,41.698 53.788,40.433 53.916,39.164 L 50.551,38.798 C 50.452,39.81 50.233,40.818 49.891,41.801 Z M 26.191,44.281 L 23.32,46.069 C 23.959,47.121 24.723,48.112 25.608,49.015 L 27.989,46.61 L 27.986,46.612 C 27.293,45.897 26.693,45.113 26.191,44.281 Z M 48.602,44.447 L 48.615,44.455 C 48.558,44.546 48.5,44.635 48.443,44.725 C 47.926,45.505 47.339,46.213 46.697,46.846 L 46.674,46.823 L 49.081,49.242 C 49.886,48.449 50.62,47.561 51.268,46.583 C 51.342,46.47 51.415,46.357 51.486,46.243 L 48.615,44.455 L 48.602,44.447 Z M 30.264,48.485 L 28.455,51.341 C 29.516,52.028 30.629,52.578 31.77,52.997 L 32.873,49.802 C 31.973,49.469 31.097,49.03 30.263,48.488 L 30.264,48.485 Z M 41.592,49.957 L 42.698,53.147 C 43.917,52.741 45.092,52.194 46.196,51.51 L 44.36,48.622 L 44.384,48.659 C 43.503,49.202 42.565,49.636 41.592,49.957 Z M 35.779,50.518 L 35.388,53.872 C 36.635,54.027 37.891,54.039 39.13,53.913 L 38.736,50.56 C 37.756,50.656 36.763,50.643 35.779,50.519 L 35.779,50.518 Z"
                    className={fillClass}
                    strokeLinejoin="miter"
                    stroke="none"
                    fill="#0d2644"
                    strokeWidth="0.26"
                    markerStart="none"
                    markerEnd="none"
                />
            </g>
        </svg>
    );
};
