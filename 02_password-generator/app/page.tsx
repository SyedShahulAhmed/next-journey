"use client";

import { useEffect, useState } from "react";

type PasswordOptions = {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
};

type StrengthLevel = {
  label: string;
  percentClass: string;
  colorClass: string;
};

const strengthLevels: StrengthLevel[] = [
  {
    label: "Very Weak",
    percentClass: "w-[20%]",
    colorClass: "bg-[#e8c4c4]",
  },
  {
    label: "Weak",
    percentClass: "w-[40%]",
    colorClass: "bg-[#caa6a0]",
  },
  {
    label: "Medium",
    percentClass: "w-[60%]",
    colorClass: "bg-[#a18276]",
  },
  {
    label: "Strong",
    percentClass: "w-[80%]",
    colorClass: "bg-[#7a5c55]",
  },
  {
    label: "Very Strong",
    percentClass: "w-full",
    colorClass: "bg-[#5e4a46]",
  },
];

const upperChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const lowerChars = "abcdefghijkmnopqrstuvwxyz";
const numberChars = "23456789";
const symbolChars = "!@#$%^&*()_+-={}[]<>?";

const getRandomIndex = (max: number) => {
  if (max <= 0) return 0;
  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  return random[0] % max;
};

const getStrength = (
  password: string,
): { level: StrengthLevel; feedback: string[] } => {
  const feedback: string[] = [];

  if (!password) {
    return {
      level: strengthLevels[0],
      feedback: ["Generate a password to see live feedback"],
    };
  }

  let score = 0;

  if (password.length >= 10) score += 1;
  else feedback.push("Increase length to at least 10 characters");

  if (password.length >= 14) score += 1;
  if (password.length >= 20) score += 1;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const varietyCount =
    Number(hasUpper) + Number(hasLower) + Number(hasNumber) + Number(hasSymbol);

  if (hasUpper) score += 1;
  else feedback.push("Add uppercase letters");

  if (hasLower) score += 1;
  else feedback.push("Add lowercase letters");

  if (hasNumber) score += 1;
  else feedback.push("Add numbers");

  if (hasSymbol) score += 1;
  else feedback.push("Add symbols");

  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push("Avoid repeated characters");
  }

  if (/123|234|345|abc|bcd|cde|qwerty|asdf|zxcv/i.test(password)) {
    score -= 1;
    feedback.push("Avoid predictable sequences");
  }

  if (varietyCount >= 3 && password.length >= 14) score += 1;

  let normalized = 1;
  if (score >= 8) normalized = 5;
  else if (score >= 7) normalized = 4;
  else if (score >= 5) normalized = 3;
  else if (score >= 3) normalized = 2;

  const level = strengthLevels[normalized - 1];

  return { level, feedback: feedback.slice(0, 4) };
};

const buildPassword = (length: number, options: PasswordOptions) => {
  let chars = "";
  const seeded: string[] = [];

  if (options.upper) {
    chars += upperChars;
    seeded.push(upperChars[getRandomIndex(upperChars.length)]);
  }
  if (options.lower) {
    chars += lowerChars;
    seeded.push(lowerChars[getRandomIndex(lowerChars.length)]);
  }
  if (options.numbers) {
    chars += numberChars;
    seeded.push(numberChars[getRandomIndex(numberChars.length)]);
  }
  if (options.symbols) {
    chars += symbolChars;
    seeded.push(symbolChars[getRandomIndex(symbolChars.length)]);
  }

  if (!chars) {
    return "";
  }

  const password = [...seeded];
  for (let i = password.length; i < length; i += 1) {
    password.push(chars[getRandomIndex(chars.length)]);
  }

  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = getRandomIndex(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
};

const Toggle = ({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className="group flex w-full items-center justify-between rounded-2xl border border-[#caa6a0]/70 bg-[#f9ebe7] px-4 py-3 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_24px_rgba(161,130,118,0.2)]"
      aria-pressed={checked}
      aria-label={label}
    >
      <span className="text-sm font-medium tracking-wide text-[#5e4a46]">
        {label}
      </span>
      <span
        className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
          checked ? "bg-[#a18276]" : "bg-[#e8c4c4]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-[#f9ebe7] shadow-[0_4px_12px_rgba(94,74,70,0.2)] transition-all duration-300 ${
            checked ? "left-5.5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
};

const Home = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });

  const copyPassword = async () => {
    if (!password || error) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const generatePassword = () => {
    setError("");
    setCopied(false);

    const typeCount =
      (options.upper ? 1 : 0) +
      (options.lower ? 1 : 0) +
      (options.numbers ? 1 : 0) +
      (options.symbols ? 1 : 0);

    if (typeCount === 0) {
      setError("Turn on at least one character type");
      setPassword("");
      return;
    }

    if (length < typeCount) {
      setError(`Minimum length should be ${typeCount}`);
      setPassword("");
      setLength(typeCount);
      return;
    }

    setPassword(buildPassword(length, options));
  };

  const { level, feedback } = getStrength(password);
  const sliderProgress = `${((length - 6) / 44) * 100}%`;

  useEffect(() => {
    generatePassword();
  }, [options, length]);

  return (
    <main className="min-h-screen bg-[#f9ebe7] px-4 py-10 text-[#5e4a46]">
      <section className="relative mx-auto max-w-2xl rounded-4xl border border-[#e8c4c4] bg-[linear-gradient(180deg,#f9ebe7_0%,#f4dfda_100%)] p-5 shadow-[0_18px_45px_rgba(202,166,160,0.35)] transition-all duration-300 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <h1 className="bg-[linear-gradient(90deg,#5e4a46_0%,#a18276_100%)] bg-clip-text text-3xl font-black tracking-wide text-transparent sm:text-4xl">
            🔐 Password Generator
          </h1>
        </div>

        <div className="mb-6 rounded-2xl border border-[#a18276] bg-[#f9ebe7] p-4 shadow-[0_8px_24px_rgba(161,130,118,0.2)]">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a18276]">
            Generated Password
          </p>
          <div className="flex items-center gap-3">
            <output className="min-w-0 flex-1 break-all font-mono text-lg text-[#5e4a46] sm:text-2xl">
              {password || "Select options to generate"}
            </output>
            <button
              type="button"
              onClick={copyPassword}
              className="group shrink-0 rounded-xl border border-[#caa6a0] bg-[#f9ebe7] p-2.5 text-xl leading-none transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_18px_rgba(161,130,118,0.24)]"
              aria-label="Copy password"
            >
              <span className="inline-block text-[#5e4a46] transition-transform duration-300 group-hover:scale-110">
                ⧉
              </span>
            </button>
          </div>
        </div>

        <div className="mb-7 flex items-center justify-between gap-3">
          <label
            htmlFor="length"
            className="text-sm font-semibold tracking-widest text-[#5e4a46]"
          >
            LENGTH
          </label>
          <span className="rounded-xl border border-[#caa6a0] bg-[#f9ebe7] px-3 py-1 font-mono text-lg font-bold text-[#5e4a46] shadow-[0_6px_16px_rgba(161,130,118,0.2)]">
            {length}
          </span>
        </div>
        <input
          id="length"
          type="range"
          min={6}
          max={50}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="soft-range mb-8"
          style={{ "--range-progress": sliderProgress } as React.CSSProperties}
        />

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <Toggle
            checked={options.upper}
            label="Uppercase"
            onChange={() =>
              setOptions((prev) => ({ ...prev, upper: !prev.upper }))
            }
          />
          <Toggle
            checked={options.lower}
            label="Lowercase"
            onChange={() =>
              setOptions((prev) => ({ ...prev, lower: !prev.lower }))
            }
          />
          <Toggle
            checked={options.numbers}
            label="Numbers"
            onChange={() =>
              setOptions((prev) => ({ ...prev, numbers: !prev.numbers }))
            }
          />
          <Toggle
            checked={options.symbols}
            label="Symbols"
            onChange={() =>
              setOptions((prev) => ({ ...prev, symbols: !prev.symbols }))
            }
          />
        </div>

        <div className="mb-6 rounded-2xl border border-[#e8c4c4] bg-[#f9ebe7] p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a18276]">
              Strength
            </p>
            <span className="text-sm font-bold text-[#5e4a46]">
              {level.label}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#e8c4c4]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${level.percentClass} ${level.colorClass}`}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {feedback.length > 0 ? (
            feedback.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#caa6a0] bg-[#f9ebe7] px-3 py-1 text-xs font-medium text-[#7a5c55]"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-[#a18276] bg-[#f9ebe7] px-3 py-1 text-xs font-medium text-[#5e4a46]">
              Excellent composition
            </span>
          )}
        </div>

        {error ? (
          <p className="mb-5 rounded-xl border border-[#caa6a0] bg-[#e8c4c4] px-4 py-2 text-sm text-[#5e4a46]">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={generatePassword}
          className="w-full rounded-2xl bg-[linear-gradient(90deg,#caa6a0_0%,#a18276_100%)] px-6 py-4 text-base font-bold tracking-wide text-[#f9ebe7] shadow-[0_12px_24px_rgba(161,130,118,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_30px_rgba(94,74,70,0.3)] active:scale-[0.98]"
        >
          Generate Password
        </button>

        <div
          className={`pointer-events-none mt-4 text-center text-sm font-semibold transition-all duration-300 ${
            copied
              ? "translate-y-0 opacity-100 text-[#5e4a46]"
              : "-translate-y-1 opacity-0"
          }`}
        >
          Password copied to clipboard
        </div>
      </section>
    </main>
  );
};

export default Home;
