import { ErrorMessage, Field } from "formik";

export default function OptionSelect({label}: {label:string}) {
  return (
    <label className="w-full h-[50px] border border-slate-500 rounded-md flex items-center has-[:checked]:border-lime has-[:checked]:bg-lime/25 group text-slate-900 font-bold">
      <Field
        type="radio"
        name="selected"
        value={label}
        className="mx-6 outline-0 ring-0 text-lime checked:bg-no-repeat hover:outline-none"
      />
      {label}
    </label>
  );
  
}
