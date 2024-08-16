"use client";

import * as yup from "yup";

import { Form, Formik, ErrorMessage } from "formik";

import Image from "next/image";
import FormInput from "./components/FormInput";
import { useEffect, useRef, useState } from "react";
import ResultsEmpty from "./components/ResultsEmpty";
import ResultsCompleted from "./components/ResultsCompleted";
import OptionSelect from "./components/OptionSelect";
import { CalculatorIcon } from "./components/CalculatorIcon";

export default function Home() {
  interface FormValues {
    amount: string | "";
    years: string | "";
    rate: string | "";
    selected: string;
  }

    // form initial values
  const initialValues: FormValues = {
    amount: "",
    years: "",
    rate: "",
    selected: "",
  };

  // state variables
  const [monthlyRepayment, setMonthlyRepayment] = useState<"" | number>("");

  const [interestRepayment, setInterestRepayment] = useState<number | null>(
    null
  );

  const [totalRepayment, setTotalRepayment] = useState<"" | number>("");

  const [isInterestOnly, setisInterestOnly] = useState(false);

  const results = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState( initialValues )

  useEffect(() => {
    if (!isInterestOnly) {
      setTotalRepayment(+monthlyRepayment * +formValues.years * 12);
    }
  }, [monthlyRepayment, formValues.years, isInterestOnly]);
  

  // validation schema
  let schema = yup.object().shape({
    amount: yup.string().required("This field is required"),
    years: yup.number().required("This field is required").positive(),
    rate: yup.number().required("This field is required").positive(),
    selected: yup.string().required("This field is required"),
  });



  return (
    <main className="h-screen flex flex-col md:flex-row md:max-w-5xl md:h-max md:rounded-xl bg-white md:border-white md:overflow-auto md:mx-4 md:min-h-max">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          // transform form values into numbers
          const amount = Number(values.amount.replace(/[^0-9\.-]+/g, ""));
          const years = Number(values.years);
          const rate = Number(values.rate);
          const n = years * 12;
          const i = rate / 100 / 12;
          setFormValues(values);
          setInterestRepayment(amount * (rate / 100) * years);
          // calculate monthly repayment based on the mortgage type
          if (values.selected === "Repayment") {
            setMonthlyRepayment(
              +(
                (amount * i * Math.pow(1 + i, n)) /
                (Math.pow(1 + i, n) - 1)
              ).toFixed(2)
            );
            setisInterestOnly(false);
          } else {
            setMonthlyRepayment(+(amount * i).toFixed(2));
            setisInterestOnly(true);
          }

          // scroll down to the results section
          results.current && results.current.scrollIntoView(true);
        }}
      >
        <Form className="px-6 pt-9 pb-8 flex flex-col items-start gap-7 w-full flex-1 bg-white border-inherit">
          <div className="flex flex-col items-start gap-4 w-full md:flex-row">
            <h1 className="text-slate-900 text-left font-[700] text-xl">
              Mortgage Calculator
            </h1>
            {/* reset button */}
            <button
              className="underline text-slate-700 md:ml-auto"
              type="reset"
              onClick={() => setInterestRepayment(null)}
            >
              Clear all
            </button>
          </div>
          {/* 3x Form inputs */}
          <FormInput
            name="amount"
            label="Mortgage amount"
            innerInputText="£"
            size={3}
            position="left"
          ></FormInput>
          <div className="flex md:gap-5 flex-col w-full md:w-auto md:flex-row">
            <FormInput
              name="years"
              label="Mortgage term"
              innerInputText="Years"
              size={6}
              position="right"
            ></FormInput>
            <FormInput
              name="rate"
              label="Interest Rate"
              innerInputText="%"
              size={3}
              position="right"
            ></FormInput>
          </div>
          {/* Mortgage type radio buttons */}
          <fieldset id="my-radio-group" className="text-slate-700">
            Mortgage Type
          </fieldset>
          <div
            role="group"
            aria-labelledby="my-radio-group"
            className="flex flex-col w-full gap-2"
          >
            <OptionSelect label="Repayment" />
            <OptionSelect label="Interest Only" />
            <ErrorMessage
              name="selected"
              render={(msg) => <div className="text-red text-sm">{msg}</div>}
            ></ErrorMessage>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-lime rounded-full w-full py-5 px-9 flex font-bold justify-center items-center text-lg hover:bg-lime/50 gap-4 md:w-max"
          >
            <CalculatorIcon/>
            Calculate Repayments
          </button>
        </Form>
      </Formik>

      {/* results section */}
      <div className="flex-1" ref={results}>
        {interestRepayment ? (
          <ResultsCompleted
            monthlyRepayment={monthlyRepayment}
            totalRepayment={isInterestOnly ? interestRepayment : totalRepayment}
          />
        ) : (
          <ResultsEmpty />
        )}
      </div>
    </main>
  );
}
