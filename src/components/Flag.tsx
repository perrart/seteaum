interface FlagProps {
  code: string;
  className?: string;
}

/**
 * Bandeiras desenhadas em SVG (cores aproximadas) para renderizar igual em
 * qualquer sistema — o emoji de bandeira não aparece no Windows.
 */
export default function Flag({ code, className = "" }: FlagProps) {
  const c = code.toUpperCase();
  return (
    <span
      className={`inline-block overflow-hidden rounded-[2px] ring-1 ring-black/15 ${className}`}
      style={{ width: 22, height: 15, lineHeight: 0 }}
    >
      <svg viewBox="0 0 60 40" width="22" height="15" preserveAspectRatio="none">
        {renderFlag(c)}
      </svg>
    </span>
  );
}

function vstripes(colors: string[]) {
  const w = 60 / colors.length;
  return colors.map((col, i) => (
    <rect key={i} x={i * w} y={0} width={w} height={40} fill={col} />
  ));
}
function hstripes(colors: string[]) {
  const h = 40 / colors.length;
  return colors.map((col, i) => (
    <rect key={i} x={0} y={i * h} width={60} height={h} fill={col} />
  ));
}

function renderFlag(c: string) {
  switch (c) {
    case "BRA":
      return (
        <>
          <rect width="60" height="40" fill="#009C3B" />
          <polygon points="30,5 55,20 30,35 5,20" fill="#FFDF00" />
          <circle cx="30" cy="20" r="8" fill="#002776" />
        </>
      );
    case "ARG":
      return (
        <>
          {hstripes(["#74ACDF", "#FFFFFF", "#74ACDF"])}
          <circle cx="30" cy="20" r="3.4" fill="#F6B40E" />
        </>
      );
    case "FRA":
      return <>{vstripes(["#0055A4", "#FFFFFF", "#EF4135"])}</>;
    case "GER":
      return <>{hstripes(["#000000", "#DD0000", "#FFCE00"])}</>;
    case "ITA":
      return <>{vstripes(["#009246", "#FFFFFF", "#CE2B37"])}</>;
    case "ESP":
      return (
        <>
          <rect width="60" height="40" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
        </>
      );
    case "ENG":
      return (
        <>
          <rect width="60" height="40" fill="#FFFFFF" />
          <rect x="25" width="10" height="40" fill="#CE1124" />
          <rect y="15" width="60" height="10" fill="#CE1124" />
        </>
      );
    case "NED":
      return <>{hstripes(["#AE1C28", "#FFFFFF", "#21468B"])}</>;
    case "URU":
      return (
        <>
          <rect width="60" height="40" fill="#FFFFFF" />
          <rect y="8" width="60" height="4.5" fill="#0038A8" />
          <rect y="17" width="60" height="4.5" fill="#0038A8" />
          <rect y="26" width="60" height="4.5" fill="#0038A8" />
          <rect y="35" width="60" height="4.5" fill="#0038A8" />
          <rect width="22" height="22" fill="#FFFFFF" />
          <circle cx="11" cy="11" r="6" fill="#FCD116" />
        </>
      );
    case "POR":
      return (
        <>
          <rect width="60" height="40" fill="#FF0000" />
          <rect width="24" height="40" fill="#006600" />
          <circle cx="24" cy="20" r="6" fill="#FFD700" />
        </>
      );
    case "MEX":
      return (
        <>
          {vstripes(["#006847", "#FFFFFF", "#CE1126"])}
          <circle cx="30" cy="20" r="3" fill="#8B5A2B" />
        </>
      );
    case "BEL":
      return <>{vstripes(["#000000", "#FAE042", "#ED2939"])}</>;
    case "CRO":
      return (
        <>
          {hstripes(["#FF0000", "#FFFFFF", "#171796"])}
          <rect x="26" y="13" width="8" height="8" fill="#FF0000" stroke="#fff" strokeWidth="1" />
        </>
      );
    default:
      return (
        <>
          <rect width="60" height="40" fill="#CBB99A" />
          <text
            x="30"
            y="26"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#5b5341"
          >
            {c.slice(0, 3)}
          </text>
        </>
      );
  }
}
