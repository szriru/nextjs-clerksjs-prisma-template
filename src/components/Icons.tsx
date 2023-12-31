interface Props {
  [key: string]: any;
}

export function IconSleep(props: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M23 12h-6v-2l3.39-4H17V4h6v2l-3.38 4H23v2m-8 4H9v-2l3.39-4H9V8h6v2l-3.38 4H15v2m-8 4H1v-2l3.39-4H1v-2h6v2l-3.38 4H7v2z" />
    </svg>
  );
}