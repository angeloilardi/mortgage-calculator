"use client";

import * as yup from "yup";

import { Form, Formik, Field, FormikProps, ErrorMessage } from "formik";

import Image from "next/image";
import TextInput from "./components/TextInput";
// import OptionSelect from "./components/OptionSelect";
import { useState } from "react";
import ResultsEmpty from "./components/ResultsEmpty";
import ResultsCompleted from "./components/ResultsCompleted";
import OptionSelect from "./components/OptionSelect";

export default function Home() {
  interface FormValues  {
    amount: number | '';
    years: number | '';
    rate: number | '';
    selected: string;
  };

  const [monthlyRepayment, setMonthlyRepayment] = useState<null | number>(null);

  const [interestRepayment, setInterestRepayment] = useState<null | number>(
    null
  );

  const [totalRepayment, setTotalRepayment] = useState<null | number>(null);

  let schema = yup.object().shape({
    amount: yup.number().required("This field is required"),
    years: yup.number().required("This field is required").positive(),
    rate: yup.number().required("This field is required").positive(),
    selected: yup.string().required("This field is required")
  });


  const initialValues: FormValues = {
    amount: '',
    years: '',
    rate: '',
    selected: "",
  };

  return (
    <main className="h-screen w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          //  const { Number(amount, rate, years}} = values;
          const amount = Number(values.amount);
          const years = Number(values.years);
          const rate = Number(values.rate);
          const n = years * 12;
          const i = rate / 100 / 12;
          setMonthlyRepayment(
            +(
              (amount * i * Math.pow(1 + i, n)) /
              (Math.pow(1 + i, n) - 1)
            ).toFixed(2)
          );
          setInterestRepayment(amount * (rate / 100) * years);
          // setTotalRepayment(interestRepayment + amount);
        }}
      

      >
        <Form className="px-6 pt-9 pb-8 flex flex-col items-start gap-7 w-full bg-white">
          <h1 className="text-slate-900 text-left font-[700] text-xl">
            Mortgage Calculator
          </h1>
          <button className="underline text-slate-700" type="reset">
            Clear all
          </button>
          <TextInput
            type="number"
            name="amount"
            label="Mortgage Amount"
            innerInputText="£"
            size={3}
            position="left"
          ></TextInput>
          <TextInput
            type="number"
            name="years"
            label="Mortgage term"
            innerInputText="Years"
            size={6}
            position="right"
          ></TextInput>
          <TextInput
            type="number"
            name="rate"
            label="Interest Rate"
            innerInputText="%"
            size={3}
            position="right"
          ></TextInput>
          <div id="my-radio-group" className="text-slate-700">
            Mortgage Type
          </div>
          <div
            role="group"
            aria-labelledby="my-radio-group"
            className="flex flex-col w-full gap-2"
          >
            <OptionSelect label="Repayment" />
            <OptionSelect label="Interest Only" />
            <ErrorMessage name="selected"></ErrorMessage>
          </div>
          {/* <OptionSelect legend="Mortgage Type" options={options}name="selected"></OptionSelect> */}
          <button
            type="submit"
            className="bg-lime rounded-full w-full p-6 flex font-bold justify-center items-center text-lg"
          >
            <img src="./images/icon-calculator.svg" className="px-4" alt="" />
            Calculate Repayments
          </button>
        </Form>
      </Formik>
      <ResultsCompleted monthlyRepayment={monthlyRepayment} totalRepayment={totalRepayment}/>
    </main>
  );
}
