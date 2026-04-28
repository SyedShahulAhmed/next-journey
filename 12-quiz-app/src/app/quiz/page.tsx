"use client";

import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const MAX_TIME = 30;
const DAMAGE = 20;

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [curr, setCurr] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(MAX_TIME);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setisAnswered] = useState(false);
  const [flash, setFlash] = useState<"green" | "red" | null>(null);
  const [shake, setShake] = useState(false);
  const [damage, setDamage] = useState<{
    type: "enemy" | "player";
    value: number;
  } | null>(null);
  const [enemyPulse, setEnemyPulse] = useState(false);
  const [playerPulse, setPlayerPulse] = useState(false);
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advancingRef = useRef(false);
  const scoreRef = useRef(score);
  const currRef = useRef(curr);
  const questionsRef = useRef<Question[]>(questions);

  const triggerEffects = (type: "enemy" | "player") => {
    setDamage({ type, value: DAMAGE });
    if (type === "enemy") {
      setFlash("green");
      setEnemyPulse(true);
    } else {
      setFlash("red");
      setShake(true);
      setPlayerPulse(true);
    }

    setTimeout(() => setFlash(null), 260);
    setTimeout(() => setDamage(null), 900);
    setTimeout(() => {
      setShake(false);
      setEnemyPulse(false);
      setPlayerPulse(false);
    }, 520);
  };

  const clearAdvanceTimeout = () => {
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }
  };

  const handleNext = useCallback(() => {
    const next = currRef.current + 1;
    const total = questionsRef.current.length;

    if (next < total) {
      setCurr(next);
      setTime(MAX_TIME);
      setSelected(null);
      setisAnswered(false);
      return;
    }

    localStorage.removeItem("quiz-progress");
    router.push(`/result?score=${scoreRef.current}&total=${total}`);
  }, [router]);

  const scheduleAdvance = useCallback(
    (delayMs: number) => {
      // Prevent double triggers from timer and answer click.
      if (advancingRef.current) return;
      advancingRef.current = true;
      clearAdvanceTimeout();
      nextTimeoutRef.current = setTimeout(() => {
        advancingRef.current = false;
        handleNext();
      }, delayMs);
    },
    [handleNext],
  );

  const handleAnswer = (option: string) => {
    if (isAnswered || advancingRef.current) return;
    setisAnswered(true);
    setSelected(option);
    const isCorrect = option === questions[curr].answer;
    setScore((prev) => prev + (isCorrect ? 1 : 0));
    triggerEffects(isCorrect ? "enemy" : "player");

    // Delay next question so the player can read feedback before transition.
    scheduleAdvance(1000);
  };
  useEffect(() => {
    const saved = localStorage.getItem("quiz-progress");

    if (saved) {
      const parsed = JSON.parse(saved);

      setQuestions(parsed.questions);
      setCurr(parsed.curr);
      setScore(parsed.score);
      setTime(parsed.time);

      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple",
      );
      const data = await res.json();

      const formatted = data.results.map((q: any) => {
        const options = [...q.incorrect_answers, q.correct_answer];

        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }

        return {
          question: q.question,
          options,
          answer: q.correct_answer,
        };
      });

      setQuestions(formatted);
      setLoading(false);
    };

    fetchQuestions();
  }, []);
  useEffect(() => {
    scoreRef.current = score;
    currRef.current = curr;
    questionsRef.current = questions;
  }, [score, curr, questions]);

  useEffect(() => {
    // Timer logic: tick every second, pause on answer, auto-advance on 0.
    if (loading || isAnswered) return;

    if (time <= 0) {
      setisAnswered(true);
      triggerEffects("player");

      // Auto-advance after a short delay so the timeout feedback is visible.
      scheduleAdvance(900);
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, isAnswered, loading, scheduleAdvance]);

  useEffect(() => {
    // Cleanup any pending transitions when leaving the page.
    return () => clearAdvanceTimeout();
  }, []);
  useEffect(() => {
    if (questions.length === 0) return;

    const data = {
      questions,
      curr,
      score,
      time,
    };

    localStorage.setItem("quiz-progress", JSON.stringify(data));
  }, [questions, curr, score, time]);
  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden text-white">
        <div className="absolute inset-0 battle-bg battle-animate" />
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <h1 className="font-display text-2xl uppercase tracking-[0.3em] text-white/70">
            Loading Battle...
          </h1>
        </div>
      </main>
    );
  }

  const q = questions[curr];
  const maxHp = Math.max(100, questions.length * DAMAGE);
  const isCorrect = selected !== null && selected === q.answer;
  const isWrong = isAnswered && !isCorrect;
  const wrongCount = Math.max(0, curr - score) + (isWrong ? 1 : 0);
  const playerHp = Math.max(0, maxHp - wrongCount * DAMAGE);
  const enemyHp = Math.max(0, maxHp - score * DAMAGE);
  const timeRatio = Math.max(0, time / MAX_TIME);
  const ringRadius = 24;
  const circumference = 2 * Math.PI * ringRadius;
  const ringOffset = circumference - circumference * timeRatio;
  const timeLow = time <= Math.ceil(MAX_TIME * 0.3);
  const timeCritical = time <= 3;
  const particles = Array.from({ length: 12 }, (_, index) => index);
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 battle-bg battle-animate" />
      <div className="absolute inset-0 particle-layer">
        {particles.map((spark) => (
          <span key={`spark-${spark}`} />
        ))}
      </div>
      <div className="absolute inset-0 vignette" />
      {flash ? (
        <div
          className={`pointer-events-none absolute inset-0 ${
            flash === "green" ? "flash-green" : "flash-red"
          }`}
        />
      ) : null}

      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 ${
          shake ? "shake" : ""
        }`}
      >
        <header className="w-full max-w-5xl grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
              Player
            </p>
            <ProgressBar
              current={playerHp}
              total={maxHp}
              variant="player"
              pulse={playerPulse}
              size="sm"
            />
            {damage?.type === "player" ? (
              <span className="damage-float absolute -top-2 left-2 text-xs font-semibold text-[#ffd6d6]">
                -{damage.value} HP
              </span>
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-4">
              <span className="text-[0.55rem] uppercase tracking-[0.5em] text-white/50">
                Timer
              </span>
              <div className="relative h-16 w-16">
                <svg
                  className="h-16 w-16 -rotate-90"
                  viewBox="0 0 64 64"
                  role="img"
                  aria-label={`Time left ${time} seconds`}
                >
                  <circle
                    cx="32"
                    cy="32"
                    r={ringRadius}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r={ringRadius}
                    stroke={timeLow ? "#ff4a4a" : "#ffbf52"}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={ringOffset}
                    className={`transition-all duration-500 ${
                      timeCritical ? "critical-blink" : ""
                    }`}
                  />
                </svg>
                <span
                  className={`absolute inset-0 flex items-center justify-center font-display text-lg ${
                    timeCritical ? "text-[#ff4a4a] critical-pulse" : ""
                  }`}
                >
                  {time}
                </span>
              </div>
            </div>
          </div>

          <div className="relative space-y-3 text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
              Enemy
            </p>
            <ProgressBar
              current={enemyHp}
              total={maxHp}
              variant="enemy"
              pulse={enemyPulse}
              size="sm"
            />
            {damage?.type === "enemy" ? (
              <span className="damage-float absolute -top-2 right-2 text-xs font-semibold text-[#b7ffe2]">
                -{damage.value} HP
              </span>
            ) : null}
          </div>
        </header>

        <section className="mt-10 w-full max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
            <span>
              Phase {curr + 1} / {questions.length}
            </span>
            <span>Score {score}</span>
          </div>

          <div className="question-enter" key={q.question}>
            <QuestionCard
              question={q.question}
              options={q.options}
              onAnswer={handleAnswer}
              selected={selected}
              answer={q.answer}
              isAnswered={isAnswered}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
