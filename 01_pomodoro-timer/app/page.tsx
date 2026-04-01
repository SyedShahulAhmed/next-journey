"use client";

import React, { useEffect, useState, useMemo } from "react";
import { quotes } from "@/data/quotes";
import { gifList } from "@/data/gifs";

import TimerDisplay from "@/components/TimerDisplay";
import TopBar from "@/components/TopBar";
import ControlsBar from "@/components/ControlsBar";
import SettingsModal from "@/components/SettingsModal";
import BackgroundLayer from "@/components/BackgroundLayer";
import AtmosphereLayer from "@/components/AtmosphereLayer";

const Home = () => {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");

  const [settings, setSettings] = useState({
    focus: 25,
    short: 5,
    long: 15,
    interval: 4,
  });

  const [totalTime, setTotalTime] = useState(25 * 60);
  const [quote, setQuote] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [effect, setEffect] = useState<"none" | "rain" | "snow" | "stars">("none");

  // Pre-generate effect particles with cinematic properties (useMemo to avoid re-rendering)
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: (i * 2.78) % 100,
        delay: (i * 0.14) % 4.8,
        angle: -15 - (i % 3) * 3,
        speed: 2.0 + (i % 4) * 0.4,
        length: 80 + (i % 5) * 20,
        layer: i % 2,
      })),
    [],
  );

  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: (i * 5) % 100,
        delay: i * 0.4,
        duration: 12 + (i % 6) * 2,
        layer: i % 2,
        size: 1.5 + (i % 3) * 0.8,
      })),
    [],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        top: (i * 3.85) % 100,
        left: (i * 3.85) % 100,
        brightness: 0.3 + ((i % 4) * 0.24),
        size: 0.8 + (i % 3) * 0.6,
        layer: i % 2,
        drift: (i % 2 === 0 ? -1 : 1) * (i % 3),
      })),
    [],
  );

  // Format functions
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatClock = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !is24Hour,
    });
  };

  // Mode switching
  const handleMode = (newMode: "focus" | "short" | "long") => {
    setMode(newMode);
    setRunning(false);

    const newTime =
      newMode === "focus"
        ? settings.focus * 60
        : newMode === "short"
          ? settings.short * 60
          : settings.long * 60;

    setTime(newTime);
    setTotalTime(newTime);
  };

  // Get random quote
  const getRandomQuote = () => {
    const i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Define auto-switch inside useEffect to capture current state values
    const handleAutoSwitch = () => {
      setRunning(false);
      getRandomQuote();

      if (mode === "focus") {
        setSessions((prevSessions) => {
          const newSessions = prevSessions + 1;

          if (newSessions % settings.interval === 0) {
            // Switch to long break
            const longTime = settings.long * 60;
            setTime(longTime);
            setTotalTime(longTime);
            setMode("long");
          } else {
            // Switch to short break
            const shortTime = settings.short * 60;
            setTime(shortTime);
            setTotalTime(shortTime);
            setMode("short");
          }
          return newSessions;
        });
      } else {
        // Switch back to focus
        const focusTime = settings.focus * 60;
        setTime(focusTime);
        setTotalTime(focusTime);
        setMode("focus");
      }
    };

    if (running && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    }

    // Auto-switch when timer reaches 0
    if (time === 0 && running) {
      handleAutoSwitch();
    }

    return () => clearInterval(interval);
  }, [running, time, mode, settings]);

  // Update clock
  useEffect(() => {
    const i = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("time");
    const savedMode = localStorage.getItem("mode");
    const savedSessions = localStorage.getItem("sessions");
    const savedRunning = localStorage.getItem("running");
    const savedSettings = localStorage.getItem("settings");
    const savedTotalTime = localStorage.getItem("totalTime");
    const savedBg = localStorage.getItem("bgImage");

    if (savedTime) setTime(Number(savedTime));
    if (savedMode) setMode(savedMode as any);
    if (savedSessions) setSessions(Number(savedSessions));
    if (savedRunning) setRunning(JSON.parse(savedRunning));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedTotalTime) setTotalTime(Number(savedTotalTime));
    if (savedBg) setBgImage(savedBg);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("time", time.toString());
    localStorage.setItem("mode", mode);
    localStorage.setItem("sessions", sessions.toString());
    localStorage.setItem("running", JSON.stringify(running));
    localStorage.setItem("settings", JSON.stringify(settings));
    localStorage.setItem("totalTime", totalTime.toString());

    if (bgImage) {
      localStorage.setItem("bgImage", bgImage);
    }
  }, [time, mode, sessions, running, settings, totalTime, bgImage]);

  // Initialize quote on mount
  useEffect(() => {
    getRandomQuote();
  }, []);

  // Quote auto-change during running
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      getRandomQuote();
    }, 15000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="w-screen h-screen overflow-hidden relative text-white">
      {/* LAYER 1: BACKGROUND */}
      <BackgroundLayer bgImage={bgImage} />

      {/* LAYER 2: VIGNETTE + CENTER FOCUS */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Vignette effect (edges darker) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 opacity-40" />
        
        {/* Vertical vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 opacity-40" />
        
        {/* Center radial focus - creates cinematic depth */}
        <div className="absolute inset-0 bg-radial-center opacity-50" style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.2) 100%)"
        }} />
      </div>

      {/* LAYER 2.5: ATMOSPHERE */}
      <AtmosphereLayer effect={effect} rainDrops={rainDrops} snowFlakes={snowFlakes} stars={stars} />

      {/* LAYER 3: UI */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between">
        {/* TOP BAR */}
        <TopBar
          mode={mode}
          handleMode={handleMode}
          currentTime={currentTime}
          formatClock={formatClock}
          is24Hour={is24Hour}
          setIs24Hour={setIs24Hour}
          sessions={sessions}
          onSettingsClick={() => setShowSettings(true)}
        />

        {/* CENTER: TIMER + QUOTE */}
        <div className="flex-1 flex flex-col items-center justify-center gap-12 relative">
          {/* Premium glow backdrop - creates immersive center focus */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Blue glow - core energy */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl opacity-40 animate-float" />
            
            {/* Green glow - growth and balance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/6 rounded-full blur-2xl opacity-30" style={{
              animation: "float-subtle 8s ease-in-out 2s infinite"
            }} />
            
            {/* Purple accent - depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl opacity-20" />
          </div>

          {/* Timer and Quote container */}
          <div className="relative z-10 flex flex-col items-center gap-10">
            <TimerDisplay time={time} totalTime={totalTime} formatTime={formatTime} />
            
            <div className="relative pointer-events-none max-w-2xl">
              {/* Quote glow background - subtle enhancement */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/15 via-green-400/8 to-blue-400/15 rounded-3xl blur-2xl opacity-50" />
              
              {/* Quote text - premium typography */}
              <p className="relative text-white/80 italic text-center leading-relaxed font-light text-lg tracking-wide px-8 py-6">
                
                <span className="block px-4">"{quote}"</span>
               
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM: CONTROLS */}
        <ControlsBar
          running={running}
          setRunning={setRunning}
          handleMode={handleMode}
          onCustomTime={(hours, minutes) => {
            const total = hours * 3600 + minutes * 60;
            setTime(total);
            setTotalTime(total);
            setRunning(false);
          }}
        />
      </div>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
          bgImage={bgImage}
          setBgImage={setBgImage}
          effect={effect}
          setEffect={setEffect}
          gifList={gifList}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Home;
