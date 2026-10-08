"use client";
export default function PrintButton() {
  return <button onClick={() => window.print()} className="noprint">Download PDF</button>;
}
