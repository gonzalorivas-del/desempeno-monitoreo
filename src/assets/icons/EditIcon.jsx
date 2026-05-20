export function EditIcon({ size = 20, color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.5 3.5l3 3L7 16H4v-3L13.5 3.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.5 5.5l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
