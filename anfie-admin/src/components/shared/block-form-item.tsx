import clsx from "clsx";
import { PropsWithChildren } from "react";

type IProps = PropsWithChildren & {
  label: string;
  required?: boolean;
  className?: string;
};
const BlockFormItem = ({ label, required, children, className }: IProps) => {
  return (
    <div
      className={clsx(
        "block-form-item",
        { "!items-start": required },
        className
      )}
    >
      <p className={clsx({ "mt-[10px]": required })}>
        {label} {required && <span className="text-red_400">*</span>}
      </p>
      {children}
    </div>
  );
};
export default BlockFormItem;
