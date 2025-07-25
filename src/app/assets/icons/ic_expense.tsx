export default function ExpenseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="2.5"
        stroke="currentColor"
      />
      <path
        d="M9 9.5C9.27614 9.5 9.5 9.27614 9.5 9L9.5 4.5C9.5 4.22386 9.27614 4 9 4C8.72386 4 8.5 4.22386 8.5 4.5L8.5 8.5L4.5 8.5C4.22386 8.5 4 8.72386 4 9C4 9.27614 4.22386 9.5 4.5 9.5L9 9.5ZM2.64645 3.35355L8.64645 9.35355L9.35355 8.64645L3.35355 2.64645L2.64645 3.35355Z"
        fill="currentColor"
      />
    </svg>
  );
}
