export default function IncomeIcon(props: React.SVGProps<SVGSVGElement>) {
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
        y="11.5"
        width="11"
        height="11"
        rx="2.5"
        transform="rotate(-90 0.5 11.5)"
        stroke="currentColor"
      />
      <path
        d="M9.5 3C9.5 2.72386 9.27614 2.5 9 2.5L4.5 2.5C4.22386 2.5 4 2.72386 4 3C4 3.27614 4.22386 3.5 4.5 3.5L8.5 3.5L8.5 7.5C8.5 7.77614 8.72386 8 9 8C9.27614 8 9.5 7.77614 9.5 7.5L9.5 3ZM3.35355 9.35355L9.35355 3.35355L8.64645 2.64645L2.64645 8.64645L3.35355 9.35355Z"
        fill="currentColor"
      />
    </svg>
  );
}
