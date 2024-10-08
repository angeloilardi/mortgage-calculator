

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
      <div className="h-10 flex items-center w-full has-[:focus]:border-lime has-[:focus]:ring-0 focus:border-2">
        {/* fixed input */}
        <NumericFormat
          className={`outline-0  w-full ${position === "left" ? `rounded-r-md border-l-0` : `rounded-l-md border-r-0`} text-slate-900 font-bold ${meta.touched && meta.error ? `border-red text-white` : `border-slate-500`} focus:ring-0 focus:border-lime peer`}
          thousandSeparator
          valueIsNumericString
          {...field}
          {...props}
        />
        <input
          className={`pointer-events-none opacity-100  ${position === "left" ? `border-r-0 rounded-l-md order-first` : "border-l-0 rounded-r-md"} text-center font-bold ${meta.touched && meta.error ? `bg-red text-white border-red` : `bg-slate-100 text-slate-700 border-slate-500`} peer-focus:bg-lime peer-focus:border-lime`}
          value={innerInputText}
          readOnly
          size={size}
          disabled
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}
