type Props = {
  question: string;
  options: string[];
  onAnswer: (option: string) => void;
  selected: string | null;
  answer: string;
  isAnswered: boolean;
};

export default function QuestionCard({
  question,
  options,
  onAnswer,
  selected,
  answer,
  isAnswered,
}: Props) {
  return (
    <div className="arena-card w-full max-w-3xl rounded-3xl border border-white/10 p-8 md:p-10">
      <h1
        className="font-display text-2xl md:text-3xl mb-8 text-center text-white question-enter"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((opt, index) => {
          const isCorrect = selected && opt === answer;
          const isWrong = selected && opt === selected && opt !== answer;
          const isMuted = selected && opt !== answer && opt !== selected;
          const showXp = selected !== null && selected === answer && opt === answer;
          const showBurst = selected !== null && selected === answer && opt === answer;
          const base =
            "ripple-btn press-pop group relative flex min-h-[3.2rem] items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a18]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040a]";
          const style = isCorrect
            ? "border-[#2dff9d]/80 bg-[#0c1d18] text-[#b7ffe2] shadow-[0_0_18px_rgba(45,255,157,0.45)]"
            : isWrong
              ? "border-[#ff4a4a]/80 bg-[#2a0b0b] text-[#ffd6d6] shadow-[0_0_18px_rgba(255,70,70,0.45)]"
              : isMuted
                ? "border-white/10 bg-white/5 text-white/40"
                : "border-white/20 bg-white/5 text-white hover:scale-[1.05] hover:border-[#ff7a18]/70 hover:text-white hover:shadow-[0_0_22px_rgba(255,122,24,0.45)]";

          return (
            <button
              key={`${opt}-${index}`}
              type="button"
              onClick={() => onAnswer(opt)}
              disabled={isAnswered}
              aria-pressed={selected === opt}
              style={{ animationDelay: `${index * 90}ms` }}
              className={`${base} ${style} ${
                isCorrect ? "glow-pulse" : ""
              } ${showBurst ? "glow-burst" : ""} stagger-rise disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none`}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          );
        })}
      </div>
      {selected === answer ? (
        <span className="xp-float pointer-events-none mt-6 inline-flex items-center justify-center rounded-full border border-[#2dff9d]/60 bg-[#0b1a14] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#b7ffe2]">
          +10 XP
        </span>
      ) : null}
    </div>
  );
}
