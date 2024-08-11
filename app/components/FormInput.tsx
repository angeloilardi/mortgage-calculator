

import { useField } from "formik";
import { NumericFormat } from "react-number-format";



type InputProps = {
  label: string;
  name: string;
  innerInputText: string;
  size: number;
  position: "left" | "right";
};

export default function FormInput({
  label,
  innerInputText,
  size,
  position,
  ...props
}: InputProps) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col w-full gap-3">
      <label htmlFor={label} className="text-slate-700">
        {label}
      </label>
      <div className="h-[50px] flex items-center w-full">
        {/* fixed input */}
        <input
          className={`pointer-events-none opacity-100  ${position === "left" ? `border-r-0 rounded-l-md` : "border-l-0 rounded-r-md order-2"} text-center font-bold ${meta.touched && meta.error ? `bg-red text-white border-red` : `bg-slate-100 text-slate-700 border-slate-500`}`}
          value={innerInputText}
          readOnly
          size={size}
          disabled
        />
        <NumericFormat
          className={`outline-0  w-full ${position === "left" ? `rounded-r-md border-l-0` : `rounded-l-md border-r-0`} text-slate-900 font-bold ${meta.touched && meta.error ? `border-red text-white` : `border-slate-500`}`}
          thousandSeparator
          valueIsNumericString
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}
