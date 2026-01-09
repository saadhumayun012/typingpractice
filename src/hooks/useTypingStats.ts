interface TypingStatsArgs {
  renderText: string;
  typing: string;
  timer: number;
  running: number;
}

export function useTypingStats({
  renderText,
  typing,
  timer,
  running,
}: TypingStatsArgs) {
  const correctChars = renderText
    .split("")
    .filter((ch, i) => ch === typing[i]).length;

  const totalTypedChars = typing.length;
  const wrongChars = totalTypedChars - correctChars;

  const accuracy =
    totalTypedChars > 0
      ? (correctChars / totalTypedChars) * 100
      : 0;

  const totalWords =
    typing.trim() === "" ? 0 : typing.trim().split(/\s+/).length;

  const elapsedSeconds = timer - running;
  const elapsedMinutes = elapsedSeconds / 60;

  const wpm =
    elapsedMinutes > 0 ? totalWords / elapsedMinutes : 0;

  return {
    correctChars,
    wrongChars,
    totalWords,
    accuracy,
    wpm,
  };
}
