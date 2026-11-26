export function ServiceSymbol({
  type,
  className = "",
}: {
  type: string;
  className?: string;
}) {
  return (
    <svg
      className={`service-symbol ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "tarot" && (
        <>
          <g transform="rotate(-13 43 52)">
            <rect x="21" y="22" width="43" height="61" rx="3" />
            <rect x="25" y="26" width="35" height="53" rx="1" />
          </g>
          <g transform="rotate(10 58 51)">
            <rect
              x="39"
              y="18"
              width="42"
              height="62"
              rx="3"
              fill="var(--symbol-fill, #edf6fc)"
            />
            <rect x="43" y="22" width="34" height="54" rx="1" />
            <path d="m60 35 3 10 10 3-10 3-3 11-3-11-10-3 10-3Z" />
            <path d="M49 29h1m20 40h1" />
          </g>
        </>
      )}
      {type === "lenormand" && (
        <>
          <rect
            x="28"
            y="20"
            width="46"
            height="64"
            rx="4"
            transform="rotate(-10 51 52)"
          />
          <rect
            x="29"
            y="17"
            width="46"
            height="64"
            rx="4"
            transform="rotate(8 52 49)"
            fill="var(--symbol-fill, #edf6fc)"
          />
          <rect
            x="34"
            y="22"
            width="36"
            height="54"
            rx="2"
            transform="rotate(8 52 49)"
          />
          <path d="M50 53c-19-4-10-23 0-10 9-17 22-2 7 6 16 7 4 21-3 9-6 14-20 1-4-5Z" />
          <path d="m53 55-4 14M40 29h1m22 39h1" />
        </>
      )}
      {type === "astrology" && (
        <>
          <path d="M48 17a33 33 0 1 0 0 66 29 29 0 0 1 0-66Z" />
          <circle cx="62" cy="48" r="12" />
          <circle cx="62" cy="48" r="7" />
          <path d="M62 24v9m0 30v9M38 48h9m30 0h9M45 31l6 6m22 22 6 6M45 65l6-6m22-22 6-6M63 13V6m-3 3h6M80 81v-8m-4 4h8" />
        </>
      )}
      {type === "matrix" && (
        <>
          <path d="m50 9 32 19v43L50 90 18 71V28Z" />
          <path d="m50 9 32 62H18Zm0 81L18 28h64ZM18 28l64 43M82 28 18 71M50 9v81M18 50h64" />
          {[
            [50, 9],
            [82, 28],
            [82, 71],
            [50, 90],
            [18, 71],
            [18, 28],
            [50, 50],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="3"
              fill="var(--symbol-fill, #edf6fc)"
            />
          ))}
        </>
      )}
      {type === "solar" && (
        <>
          <circle cx="50" cy="50" r="19" />
          <circle cx="50" cy="50" r="14" />
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d="M50 15v9"
              transform={`rotate(${i * 22.5} 50 50)`}
            />
          ))}
        </>
      )}
    </svg>
  );
}
