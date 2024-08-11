export default function ResultsCompleted({
  monthlyRepayment,
  totalRepayment,
}: {
  monthlyRepayment: number | "";
  totalRepayment: number | "";
}) {
  return (
    <div className="flex flex-col bg-slate-900 p-9 gap-6 h-full md:rounded-bl-[70px]">
      <div className="flex flex-col gap-6">
        <h2 className="text-white font-bold text-xl">Your results </h2>
        <p className="text-slate-300">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click “calculate repayments”
          again.
        </p>
      </div>
      <div className="rounded-md bg-slate-950 px-4 md:px-8 py-6 md:py-8 border-t-4 border-lime flex flex-col">
        <h3 className="text-slate-300">Your monthly repayments</h3>
        <p className="text-lime text-4xl md:text-5xl font-bold py-5">
          {monthlyRepayment.toLocaleString("en-US", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
        <hr className="text-slate-300 my-6" />
        <h3 className="text-slate-300 mt-6 mb-4">{`Total you'll repay over the term`}</h3>
        <p className="text-white font-bold md:text-3xl">
          {totalRepayment.toLocaleString("en-US", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
      </div>
    </div>
  );
}
