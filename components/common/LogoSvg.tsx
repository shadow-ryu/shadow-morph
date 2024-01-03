import React from "react";
// @ts-ignore
const LogoSvg = ({ width, height }) => {
  const scaleFactor = 0.5; // Adjust this value to scale down further if needed

  const viewBoxWidth = width * scaleFactor;
  const viewBoxHeight = height * scaleFactor;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0  70 70"
      className="transition-transform duration-500 ease-in-out transform hover:rotate-360"
    >
      <defs id="SvgjsDefs2183">
        <linearGradient id="SvgjsLinearGradient2188">
          <stop id="SvgjsStop2189" stopColor="#905e26" offset="0"></stop>
          <stop id="SvgjsStop2190" stopColor="#f5ec9b" offset="0.5"></stop>
          <stop id="SvgjsStop2191" stopColor="#905e26" offset="1"></stop>
        </linearGradient>
        <linearGradient id="SvgjsLinearGradient2192">
          <stop id="SvgjsStop2193" stopColor="#905e26" offset="0"></stop>
          <stop id="SvgjsStop2194" stopColor="#f5ec9b" offset="0.5"></stop>
          <stop id="SvgjsStop2195" stopColor="#905e26" offset="1"></stop>
        </linearGradient>
      </defs>

      <g
        id="SvgjsStop2195"
        transform="matrix(17.094850991378024,0,0,17.094850991378024,-12.56471164747657,-8.461951322246724)"
        fill="url(#SvgjsLinearGradient2188)"
      >
        <g xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.07,2.844c0,0-0.12-0.756-0.816-0.961C2.852,1.764,2.64,2.022,2.661,2.234   c0,0-0.324-0.290,0.000054-0.663c0.406-0.338,1.16,0.271,1.503-0.116c0,0,0.149,0.41-0.191,0.562C4.037,2.018,4.327,2.419,4.07,2.844z   "
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.579,1.314c0,0-0.718-0.266-1.238,0.239C2.04,1.845,2.16,2.157,2.355,2.243   c0,0-0.441,0.192-0.545-0.381C1.714,1.341,2.615,0.984,2.446,0.495c0,0,0.431,0.071,0.396,0.442   C2.841,0.937,3.334,0.882,3.579,1.314z"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.004,0.991c0,0-0.584,0.495-0.399,1.197c0.107,0.405,0.438,0.453,0.608,0.325   c0,0-0.049,0.2-0.37-1.133-0.878-1.225c0,0,0.272-0.34,0.579-0.128C1.313,1.449,1.507,0.993,2.004,0.991z"
          ></path>
        </g>
      </g>

      <g
        id="SvgjsG2184"
        // @ts-ignore
        featurekey="symbolFeature-0"
        transform="matrix(0.26701251144339333,0,0,0.26701251144339333,-14.41867561794324,-14.41867561794324)"
        fill="url(#SvgjsLinearGradient2188)"
      >
        <defs xmlns="http://www.w3.org/2000/svg"></defs>
        <g xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              className="fil0"
              d="M215 64c38,18 65,57 65,103 0,62 -51,113 -113,113 -19,0 -37,-5 -52,-13 6,1 13,2 19,2l0 0 0 0 0 0 0 0c33,0 62,-13 84,-35 21,-21 34,-51 34,-83l0 0 0 0 0 0 0 0c0,-33 -13,-62 -34,-84 -1,-1 -2,-2 -3,-3z"
              style={{ fill: "url(#SvgjsLinearGradient2188)" }}
            ></path>
            <path
              className="fil0"
              d="M236 186c-6,16 -14,30 -26,41 -19,19 -46,31 -76,31l0 0 0 0 0 0 0 0c-16,0 -32,-3 -46,-10 -20,-19 -33,-46 -34,-76 4,6 8,11 13,16 21,22 51,35 84,35l0 0 0 0 0 0 0 0c32,0 62,-13 83,-35 1,0 1,-1 2,-2z"
              style={{ fill: "url(#SvgjsLinearGradient2188)" }}
            ></path>
            <path
              className="fil0"
              d="M167 54c4,0 8,0 12,0 -24,5 -45,16 -62,33 -21,21 -34,51 -34,83l0 0 0 0 0 0 0 0c0,7 0,13 2,20 -4,-3 -7,-6 -11,-9 -8,-8 -14,-18 -20,-28 7,-56 55,-99 113,-99z"
              style={{ fill: "url(#SvgjsLinearGradient2188)" }}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LogoSvg;
