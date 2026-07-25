"use client";

import { useEffect, useState } from "react";

function timeIn(timeZone: string) {
  return new Date().toLocaleTimeString("en-US", { timeZone, hour: "2-digit", minute: "2-digit" });
}

export function OfficeClocks() {
  const [austin, setAustin] = useState("");
  const [lisbon, setLisbon] = useState("");

  useEffect(() => {
    function tick() {
      setAustin(timeIn("America/Chicago"));
      setLisbon(timeIn("Europe/Lisbon"));
    }
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7">
      <h3 className="m-0 mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-[#7D8280]">
        Offices
      </h3>
      <div className="mb-1.5 flex justify-between font-mono text-sm">
        <span>Austin, TX — HQ</span>
        <span className="text-[#7D8280]">{austin}</span>
      </div>
      <div className="flex justify-between font-mono text-sm">
        <span>Lisbon, PT — Engineering</span>
        <span className="text-[#7D8280]">{lisbon}</span>
      </div>
    </div>
  );
}
