import { useEffect, useRef, useState } from "react";
import { randomTextGenerator } from "./utils/randomTextGenerator";
import { useTypingStats } from "./hooks/useTypingStats";

type Mode = "idle" | "countdown" | "running" | "finished"

function App() {

  const options: number[] = [20, 30, 40, 50, 60, 90, 120]
  const [mode, setMode] = useState<Mode>("idle");
  const [timer, setTimer] = useState(options[0]);
  const [countdown, setCountdown] = useState<number>(0);
  const [running, setRunning] = useState<number>(0);

  const [renderText, setRenderText] = useState<string>("");
  const [typing, setTyping] = useState<string>("");

  //for autofocus on input field
  const inputRef = useRef<HTMLInputElement>(null);

  // generate text once + on reset
  useEffect(() => {
    setRenderText(randomTextGenerator());
  }, []);

  //countdown mode logic
  useEffect(() => {
    if (mode === "countdown" && countdown > 0) {
      const timeId = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeId);
    }
    if (mode === "countdown" && countdown === 0) {
      setMode("running");
      setRunning(timer);
    }
  }, [mode, countdown, timer]);


  //ruunning mode logic
  useEffect(() => {
    if (mode === "running" && running > 0) {
      inputRef.current?.focus(); //for auto focus on the input
      const timeId = setTimeout(() => {
        setRunning((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeId);
    }

    if (mode === "running" && running === 0) {
      setMode("finished")
    }
  }, [mode, running])

  //finish if user completes text
  useEffect(() => {
    if (mode === "running" && typing.length === renderText.length && typing.length > 0) {
      setMode("finished");
    }
  }, [typing, renderText, mode]);

  // for result
  const stats = useTypingStats({
    renderText,
    typing,
    timer,
    running,
  });

  // reset handler
  const handleReset = () => {
    setMode("idle");
    setTyping("");
    setCountdown(0);
    setRunning(0);
    setRenderText(randomTextGenerator());
  };


  return (
    <div className="min-h-screen bg-[#2b2b2b] text-neutral-100 flex justify-center px-6 py-16">
      <div className="w-full max-w-4xl space-y-16">

        {/* header*/}
        <header className="space-y-2 pb-6 border-b border-neutral-800">
          <h1 className="text-3xl font-medium tracking-tight">
            Typing Practice
          </h1>
          <p className="text-neutral-500">
            Focus · Accuracy · Rhythm
          </p>
        </header>

        {/* idle mode */}
        {mode === "idle" && (
          <section className="space-y-14">

            <div className="space-y-2">
              <label className="block text-neutral-400 text-sm uppercase tracking-wide">
                Select Duration
              </label>
              <div className="relative">
                <select
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-xl focus:outline-none focus:border-neutral-400 transition"
                  value={timer}
                  onChange={(e) => setTimer(Number(e.target.value))}
                >
                  {options.map(opt => (
                    <option key={opt} value={opt}>
                      {opt} seconds
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="w-full bg-neutral-100 text-neutral-900 text-lg font-medium py-3 rounded-lg hover:bg-neutral-300 transition"
              onClick={() => {
                setCountdown(3);
                setMode("countdown");
              }}
            >
              Begin Session
            </button>

          </section>
        )}


        {/* countdown mode */}
        {mode === "countdown" && (
          <div className="flex flex-col items-center justify-center min-h-60 space-y-4">
            <div className="text-7xl font-light text-neutral-300">
              {countdown}
            </div>
            <p className="text-neutral-500">
              Prepare
            </p>
          </div>
        )}

        {/* running mode */}
        {mode === "running" && (
          <section className="space-y-8">
            <div className="text-neutral-400 font-bold text-lg">
              Time remaining: <span className="text-white font-bold text-2xl">{running}s</span>
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
                className="absolute inset-0 opacity-0 z-10"
              />

              <article className="text-4xl leading-[3.2rem] font-serif selection:bg-transparent">
                {renderText.split("").map((ch, i) => {
                  const typed = typing[i];
                  const isCursor = i === typing.length;

                  let cls = "text-neutral-500";
                  if (typed) cls = ch === typed ? "text-neutral-100" : "text-red-400";
                  if (isCursor) cls += " border-b-4 border-neutral-300";

                  return (
                    <span key={i} className={cls}>
                      {ch}
                    </span>
                  );
                })}
              </article>
            </div>
          </section>
        )}

        {/* finished mode */}
        {mode === "finished" && (
          <section className="space-y-12 max-w-xl">

            {/* Header */}
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold">
                Session Complete
              </h2>
              <p className="text-neutral-400 text-base">
                Here’s how you performed
              </p>
            </header>

            {/* results */}
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-neutral-800 p-5">
                <p className="text-sm text-neutral-300 uppercase tracking-wide">
                  Speed
                </p>
                <p className="text-2xl font-semibold text-neutral-100">
                  {stats.wpm.toFixed(1)} WPM
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 p-5">
                <p className="text-sm text-neutral-300 uppercase tracking-wide">
                  Accuracy
                </p>
                <p className="text-2xl font-semibold text-neutral-100">
                  {stats.accuracy.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="space-y-2 text-neutral-300 text-base">
              <p>
                Correct characters:{" "} <span className="font-semibold text-neutral-100"> {stats.correctChars} </span>
              </p>
              <p>
                Errors:{" "} <span className="font-semibold text-neutral-100"> {stats.wrongChars} </span>
              </p>
            </div>


            <button
              className="w-full bg-neutral-100 text-neutral-900 text-lg font-medium py-3 rounded-lg hover:bg-neutral-300 transition"
              onClick={handleReset}
            >
              Start Another Session
            </button>

          </section>
        )}
      </div>
    </div>
  );
}

export default App;