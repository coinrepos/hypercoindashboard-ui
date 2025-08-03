// KREDSLogoAnimated.jsx
export default function KREDSLogoAnimated({ size = 120, duration = 2 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      style={{ display: 'block' }}
    >
      <g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 60 60"
          to="360 60 60"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
        <path
          d="M60 20 L100 60 L60 100 L20 60 Z"
          fill="#2ecc71"
          stroke="#27ae60"
          strokeWidth="4"
          filter="url(#glow)"
        />
        <text
          x="60"
          y="75"
          fontFamily="Arial"
          fontSize="40"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
        >
          ₭
        </text>
      </g>
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
