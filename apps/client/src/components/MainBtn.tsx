import { ButtonHTMLAttributes, ReactNode } from "react";

export type MainBtnProps = ButtonHTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onClick?: () => void;
};
const MainBtn = ({ type, disabled, children, onClick }: MainBtnProps) => {
  return (
    <button
      className="flex items-center justify-center fill-btn btn-large disabled:bg-slate-300
        disabled:text-slate-500 disabled:cursor-not-allowed"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MainBtn;
