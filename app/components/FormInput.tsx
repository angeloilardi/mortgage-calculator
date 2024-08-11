

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
        <input
          className={`bg-slate-100 pointer-events-none  ${position === "left" ? `border-r-0 rounded-l-md` : "border-l-0 rounded-r-md order-2"} text-center text-slate-700 font-bold`}
          value={innerInputText}
          readOnly
          size={size}
          disabled
        />
        <NumericFormat
          className={`border-slate-500 outline-0  w-full ${position === "left" ? `rounded-r-md border-l-0` : `rounded-l-md border-r-0`} text-slate-900 font-bold`}
          thousandSeparator
          valueIsNumericString
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
