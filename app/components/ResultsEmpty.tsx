import Image from "next/image";

export default function ResultsEmpty() {
  return (
    <div className="flex flex-col w-full bg-slate-900 items-center justify-center p-9 gap-6 md:rounded-bl-[70px] h-full">
      <Image
        src="images/illustration-empty.svg"
        alt="calculator illustration"
        width={300}
        height={300}
      ></Image>
      <h2 className="text-white text-xl font-bold">Results shown here</h2>
      <p className="text-slate-300">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}
