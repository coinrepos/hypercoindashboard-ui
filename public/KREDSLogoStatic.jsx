// KREDSLogoStatic.jsx
export default function KREDSLogoStatic({ size = 120 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width={size} height={size}>
      <path 
        d="M60 20 L100 60 L60 100 L20 60 Z" 
        fill="#2ecc71" 
        stroke="#27ae60" 
        strokeWidth="4"
      />
      <text 
        x="60" y="75" 
        fontFamily="Arial" 
        fontSize="40" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="white"
      >₭</text>
    </svg>
  );
}
