export function EyeIcon({ size = 20, color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 10C3 5.5 6.5 3 10 3s7 2.5 9 7c-2 4.5-5.5 7-9 7s-7-2.5-9-7Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
