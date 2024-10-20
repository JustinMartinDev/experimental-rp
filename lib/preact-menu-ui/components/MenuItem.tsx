import clsx from "clsx";

type Props = {
  active: boolean;
  children: React.ReactElement | string;
};

const MenuItem = ({ active, children }: Props) => {
  const classes = clsx("pl-4 pr-4 pt-2 pb-2", {
    "bg-zinc-300": active,
    "text-slate-900": active,
  });

  return <li className={classes}>{children}</li>;
};

export { MenuItem };
