"use client";

import * as yup from "yup";

import { Form, Formik, Field, FormikProps, ErrorMessage } from "formik";

import { NumericFormat } from "react-number-format";

import Image from "next/image";
import TextInput from "./components/FormInput";
import { useEffect, useState } from "react";
import ResultsEmpty from "./components/ResultsEmpty";
import ResultsCompleted from "./components/ResultsCompleted";
import OptionSelect from "./components/OptionSelect";
import { constants } from "buffer";
import FormInput from "./components/FormInput";

export default function Home() {
  interface FormValues {
    amount: string | ""
    years: string | "";
    rate: string | "";
    selected: string;
  }

  const [monthlyRepayment, setMonthlyRepayment] = useState<"" | number>("");

  const [interestRepayment, setInterestRepayment] = useState<number | null>(null);

  const [totalRepayment, setTotalRepayment] = useState<"" | number>("");

const [amount, setAmount] = useState<number | null>(0);

  useEffect(() => {
    interestRepayment && amount &&
    setTotalRepayment(interestRepayment + amount);
  }, [amount, interestRepayment]);

  let schema = yup.object().shape({
    amount: yup.string().required("This field is required"),
    years: yup.number().required("This field is required").positive(),
    rate: yup.number().required("This field is required").positive(),
    selected: yup.string().required("This field is required"),
  });

  const initialValues: FormValues = {
    amount: "",
    years: "",
    rate: "",
    selected: "",
  };

  return (
    <main className="h-screen w-full">
      <Formik
        initialValues={initialValues}
        // validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
          const amount = Number(values.amount.replace(/[^0-9\.-]+/g, ""));
          const years = Number(values.years);
          const rate = Number(values.rate);
          const n = years * 12;
          const i = rate / 100 / 12;
          setAmount(amount);
          console.log(amount, years, rate);
          setMonthlyRepayment(
            +(
              (amount * i * Math.pow(1 + i, n)) /
              (Math.pow(1 + i, n) - 1)
            ).toFixed(2)
          );
          // function calculateTotalRepayment() {
          // setTotalRepayment(interestRepayment + amount);
          // };
          function calculatInterestRepayment(
            amount: number,
            rate: number,
            years: number
            // callback: { (): void; (): void }
          ) {
            setInterestRepayment(+(amount * (rate / 100) * years));
            // callback();
          }
          calculatInterestRepayment(
            amount,
            rate,
            years
            // calculateTotalRepayment
          );
        }}
      >
        <Form className="px-6 pt-9 pb-8 flex flex-col items-start gap-7 w-full bg-white">
          <h1 className="text-slate-900 text-left font-[700] text-xl">
            Mortgage Calculator
          </h1>
          <button className="underline text-slate-700" type="reset">
            Clear all
          </button>
          {/* <CurrencyInput
  
            name="amount"
            label="Mortgage Amount"
            innerInputText="£"

          /> */}

          <TextInput
            name="amount"
            label="Mortgage amount"
            innerInputText="&"
            size={3}
            position="left"
          ></TextInput>
          <TextInput
            name="years"
            label="Mortgage term"
            innerInputText="Years"
            size={6}
            position="right"
          ></TextInput>
          <TextInput
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
      {interestRepayment ? (
        <ResultsCompleted
          monthlyRepayment={monthlyRepayment}
          totalRepayment={totalRepayment}
        />
      ) : (
        <ResultsEmpty />
      )}
    </main>
  );
}
