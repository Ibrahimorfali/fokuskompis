"use strict";

const STORAGE_KEYS = {
  settings: "fokuskompis_settings_v1",
  stats: "fokuskompis_stats_v1"
};

const DEFAULT_SETTINGS = {
  childName: "Min kompis",
  dailyGoalStickers: 3,
  motionMode: "full",
  activityDurationSec: 180,
  breakDurationSec: 60,
  sessionDurationSec: 600,
  soundMode: "on",
  voiceStyle: "adultWarm",
  voiceName: "auto",
  soundTheme: "theme",
  energyMode: "calm",
  themeMode: "jungle",
  pinCode: "1234",
  enabledActivities: {
    draw: true,
    dance: true,
    play: true
  },
  customPrompts: {
    draw: [],
    dance: [],
    play: []
  }
};

const DEFAULT_STATS = {
  sessionsCompleted: 0,
  totalFocusSec: 0,
  totalStickers: 0,
  streakDays: 0,
  lastSessionDate: "",
  activityCounts: {
    draw: 0,
    dance: 0,
    play: 0
  }
};

const BASE_PROMPTS = {
  draw: [
    "Rita en glad sol.",
    "Rita en dansande katt.",
    "Rita en rutschkana.",
    "Rita tre ballonger.",
    "Rita en regnbåge med prickar."
  ],
  dance: [
    "Hoppa mjukt på stället.",
    "Snurra ett varv långsamt.",
    "Klappa händer i takt.",
    "Rör armarna som vingar.",
    "Ta tre glada steg fram."
  ],
  play: [
    "Hoppa 5 gånger.",
    "Gå på tå i 10 sekunder.",
    "Kryp som en tiger i 8 sekunder.",
    "Balans på ett ben i 6 sekunder.",
    "Rulla axlarna långsamt 5 gånger.",
    "Rör vid golvet och sträck upp armarna.",
    "Smyg tyst som en katt i 10 sekunder."
  ]
};

const THEME_PACKS = {
  jungle: {
    label: "Djungel",
    heroName: "Leo Lejon",
    buddyName: "Maja Apa",
    heroRole: "fokusledare",
    breakText: "Ta lugna djungel-andetag med Leo.",
    idleText: "Leo Lejon och Maja Apa leder passet.",
    prompts: {
      draw: [
        "Rita Leo Lejon i en djungel.",
        "Rita Maja Apa i ett träd.",
        "Rita en liten djungelstig.",
        "Rita tre palmblad."
      ],
      dance: [
        "Stampa som en glad elefant.",
        "Svaj som ett träd i vinden.",
        "Gör en tiger-smygning i 5 sekunder."
      ],
      play: [
        "Hoppa över en osynlig stock 4 gånger.",
        "Smyg under en osynlig gren.",
        "Gör ap-hopp i 10 sekunder."
      ]
    },
    praise: [
      "Leo säger: starkt jobbat.",
      "Maja säger: du fokuserar fint.",
      "Djungelteamet jublar för dig."
    ],
    palette: {
      bg1: "#fff1ad",
      bg2: "#dff8d6",
      shapeA: "#ffd36b",
      shapeB: "#9be0a6",
      dance1: "#fff4d8",
      dance2: "#e9fff1",
      guideBg: "#f8ffea"
    }
  },
  ocean: {
    label: "Hav",
    heroName: "Nora Narval",
    buddyName: "Timo Sköldpadda",
    heroRole: "havscoach",
    breakText: "Flyt lugnt som en liten våg.",
    idleText: "Nora Narval och Timo Sköldpadda leder passet.",
    prompts: {
      draw: [
        "Rita Nora Narval med ett stort leende.",
        "Rita en sköldpadda som simmar.",
        "Rita tre bubblor och en fisk.",
        "Rita en sjöstjärna på botten."
      ],
      dance: [
        "Gunga kroppen som en mjuk våg.",
        "Simma med armarna långsamt.",
        "Gör en delfin-hopprörelse."
      ],
      play: [
        "Balansera som på en liten brygga i 6 sekunder.",
        "Kryp som en havssköldpadda i 8 sekunder.",
        "Gör 5 mini-hopp som en fisk."
      ]
    },
    praise: [
      "Havsteamet säger: toppenfokus.",
      "Nora säger: du var lugn och stark.",
      "Timo säger: fint följt instruktionerna."
    ],
    palette: {
      bg1: "#dff7ff",
      bg2: "#e8fff8",
      shapeA: "#8bd6ff",
      shapeB: "#8de2cf",
      dance1: "#eaf8ff",
      dance2: "#e6fff9",
      guideBg: "#f2fdff"
    }
  },
  playland: {
    label: "Lekland",
    heroName: "Livi Lek",
    buddyName: "Max Studs",
    heroRole: "banbyggare",
    breakText: "Vila kroppen och ladda för nästa bana.",
    idleText: "Livi Lek och Max Studs leder passet.",
    prompts: {
      draw: [
        "Rita en tunnel och en rutschkana.",
        "Rita Livi Lek på en studsmatta.",
        "Rita en hinderbana med tre hinder.",
        "Rita en bollgrop med glada prickar."
      ],
      dance: [
        "Studsa lätt på tårna i 8 sekunder.",
        "Vrid kroppen som i en tunnel.",
        "Klappa över huvudet och under knäna."
      ],
      play: [
        "Kryp under en osynlig tunnel.",
        "Gör sidosteg som mellan hinder.",
        "Hoppa och landa mjukt 5 gånger."
      ]
    },
    praise: [
      "Leklandsteamet säger: wow vilket fokus.",
      "Livi säger: superinsats.",
      "Max säger: du klarade banan fint."
    ],
    palette: {
      bg1: "#ffe1d3",
      bg2: "#eef2ff",
      shapeA: "#ffb195",
      shapeB: "#cfc8ff",
      dance1: "#fff0e7",
      dance2: "#edf0ff",
      guideBg: "#fff8f2"
    }
  }
};

const SOUND_PATTERNS = {
  jungle: [329.63, 392.0, 523.25],
  ocean: [261.63, 329.63, 392.0],
  playland: [392.0, 523.25, 659.25]
};

const VOICE_STYLES = {
  adultWarm: {
    rate: 0.88,
    pitch: 1.04
  },
  adultBright: {
    rate: 0.94,
    pitch: 1.08
  },
  adultCalm: {
    rate: 0.8,
    pitch: 0.98
  }
};

const AI_IDEA_BANK = {
  follow: {
    draw: [
      "Rita en cirkel, lägg till två ögon och ge figuren ett namn.",
      "Rita tre små former i ordning: prick, streck, hjärta."
    ],
    dance: [
      "Klappa två gånger, pausa, och ta ett långsamt steg fram.",
      "Sträck armarna upp, ner och ut åt sidan i samma ordning."
    ],
    play: [
      "Gå till en punkt, nudda golvet och kom tillbaka lugnt.",
      "Hoppa två gånger, stå stilla och räkna till tre."
    ]
  },
  calm: {
    draw: [
      "Rita en lugn plats med en sol och en mjuk väg.",
      "Rita fem långsamma vågor från vänster till höger."
    ],
    dance: [
      "Gunga långsamt som en våg och andas ut på varje sväng.",
      "Rör händerna mjukt upp och ner som moln."
    ],
    play: [
      "Gå tyst på tå i en liten cirkel.",
      "Sitt stilla, sträck armarna framåt och släpp ner axlarna."
    ]
  },
  switch: {
    draw: [
      "Rita snabbt tre prickar och rita sedan långsamt en ring runt dem.",
      "Byt mellan korta streck och långa linjer tills pappret har ett mönster."
    ],
    dance: [
      "Gör tre snabba klappar och en långsam snurr.",
      "Växla mellan små steg och stora steg när vuxen säger byt."
    ],
    play: [
      "Gå snabbt till väggen och smyg långsamt tillbaka.",
      "Hoppa högt en gång och gå sedan långsamt fyra steg."
    ]
  },
  create: {
    draw: [
      "Rita en egen kompis som hjälper till när fokus känns svårt.",
      "Rita en fantasibana med start, pausplats och mål."
    ],
    dance: [
      "Hitta på en rörelse för glad, lugn och stolt.",
      "Gör en egen mini-dans med tre rörelser."
    ],
    play: [
      "Bygg en osynlig bana och välj själv tre hinder.",
      "Hitta på en snäll superkraft och visa den med kroppen."
    ]
  }
};

const state = {
  running: false,
  phase: "idle",
  elapsedSec: 0,
  phaseRemainingSec: 0,
  intervalId: null,
  cleanupActivity: null,
  currentActivity: "",
  sessionStickers: 0,
  sessionActivityCounts: {
    draw: 0,
    dance: 0,
    play: 0
  },
  aiDraftIdeas: [],
  rewardClaimed: false,
  audioCtx: null,
  ambientTimerId: null,
  speechVoices: [],
  voicesReady: false,
  pendingSpeechText: "",
  pendingSpeechTimerId: null
};

const els = {
  phaseLabel: document.getElementById("phaseLabel"),
  sessionTimer: document.getElementById("sessionTimer"),
  sessionProgress: document.getElementById("sessionProgress"),
  phaseProgress: document.getElementById("phaseProgress"),
  sessionPlan: document.getElementById("sessionPlan"),
  childNameBadge: document.getElementById("childNameBadge"),
  dailyGoalText: document.getElementById("dailyGoalText"),
  dailyGoalProgress: document.getElementById("dailyGoalProgress"),
  achievementList: document.getElementById("achievementList"),
  activityLibrary: document.getElementById("activityLibrary"),
  librarySummary: document.getElementById("librarySummary"),
  startBtn: document.getElementById("startBtn"),
  stopBtn: document.getElementById("stopBtn"),
  activityTitle: document.getElementById("activityTitle"),
  activityStage: document.getElementById("activityStage"),
  rewardBtn: document.getElementById("rewardBtn"),
  stickerCount: document.getElementById("stickerCount"),
  sessionsDone: document.getElementById("sessionsDone"),
  focusMinutes: document.getElementById("focusMinutes"),
  streakDays: document.getElementById("streakDays"),
  summaryDialog: document.getElementById("summaryDialog"),
  summaryText: document.getElementById("summaryText"),
  closeSummary: document.getElementById("closeSummary"),
  parentDialog: document.getElementById("parentDialog"),
  parentEntry: document.getElementById("parentEntry"),
  pinInput: document.getElementById("pinInput"),
  pinError: document.getElementById("pinError"),
  unlockBtn: document.getElementById("unlockBtn"),
  closeParentPanel: document.getElementById("closeParentPanel"),
  parentPanel: document.getElementById("parentPanel"),
  childNameSetting: document.getElementById("childNameSetting"),
  dailyGoal: document.getElementById("dailyGoal"),
  motionMode: document.getElementById("motionMode"),
  activityDuration: document.getElementById("activityDuration"),
  breakDuration: document.getElementById("breakDuration"),
  sessionDuration: document.getElementById("sessionDuration"),
  soundMode: document.getElementById("soundMode"),
  voiceStyle: document.getElementById("voiceStyle"),
  voiceName: document.getElementById("voiceName"),
  testVoiceBtn: document.getElementById("testVoiceBtn"),
  soundTheme: document.getElementById("soundTheme"),
  themeMode: document.getElementById("themeMode"),
  energyMode: document.getElementById("energyMode"),
  pinCodeSetting: document.getElementById("pinCodeSetting"),
  toggleDraw: document.getElementById("toggleDraw"),
  toggleDance: document.getElementById("toggleDance"),
  togglePlay: document.getElementById("togglePlay"),
  aiFocusArea: document.getElementById("aiFocusArea"),
  aiActivityKind: document.getElementById("aiActivityKind"),
  generateAiIdeasBtn: document.getElementById("generateAiIdeasBtn"),
  saveAiIdeasBtn: document.getElementById("saveAiIdeasBtn"),
  aiIdeaList: document.getElementById("aiIdeaList"),
  aiStatus: document.getElementById("aiStatus"),
  aiIdeaCount: document.getElementById("aiIdeaCount"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  themeBadge: document.getElementById("themeBadge"),
  themeFriends: document.getElementById("themeFriends")
};

let settings = loadStored(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
let stats = loadStored(STORAGE_KEYS.stats, DEFAULT_STATS);

boot();

function boot() {
  warmSpeechVoices();
  applyEnergyMode(settings.energyMode);
  applyThemeMode(settings.themeMode);
  applyMotionMode(settings.motionMode);
  syncSettingsUi();
  renderThemeMeta();
  renderSessionPlan();
  renderActivityLibrary();
  renderAchievements();
  renderAiLabUi();
  syncStatsUi();
  renderIdle();
  updateTimersUi();
  wireEvents();
  resetRewardButton(false);
}

function wireEvents() {
  els.startBtn.addEventListener("click", startSession);
  els.stopBtn.addEventListener("click", () => endSession(true));
  els.rewardBtn.addEventListener("click", claimReward);
  els.closeSummary.addEventListener("click", () => closeDialog(els.summaryDialog));

  els.parentEntry.addEventListener("click", () => {
    els.pinInput.value = "";
    els.pinError.textContent = "";
    openDialog(els.parentDialog);
  });

  els.unlockBtn.addEventListener("click", unlockParentPanel);
  els.closeParentPanel.addEventListener("click", lockParentPanel);
  els.testVoiceBtn.addEventListener("click", previewVoice);
  els.generateAiIdeasBtn.addEventListener("click", generateAiIdeas);
  els.saveAiIdeasBtn.addEventListener("click", saveAiIdeas);
  els.saveSettingsBtn.addEventListener("click", saveSettingsFromUi);
}

function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return structuredClone(fallback);
    const parsed = JSON.parse(raw);
    return deepMerge(structuredClone(fallback), parsed);
  } catch (error) {
    return structuredClone(fallback);
  }
}

function saveStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function deepMerge(base, source) {
  if (!source || typeof source !== "object") return base;
  Object.keys(source).forEach((key) => {
    const srcValue = source[key];
    const baseValue = base[key];
    if (Array.isArray(srcValue)) {
      base[key] = srcValue.slice();
    } else if (srcValue && typeof srcValue === "object" && baseValue && typeof baseValue === "object") {
      base[key] = deepMerge(baseValue, srcValue);
    } else {
      base[key] = srcValue;
    }
  });
  return base;
}

function startSession() {
  if (state.running) return;

  state.running = true;
  state.phase = "activity";
  state.elapsedSec = 0;
  state.phaseRemainingSec = settings.activityDurationSec;
  state.sessionStickers = 0;
  state.sessionActivityCounts = { draw: 0, dance: 0, play: 0 };
  state.rewardClaimed = false;

  clearActiveActivity();
  startActivityPhase();
  updateButtonsUi();
  updateTimersUi();
  syncStatsUi();
  startAmbientTheme();
  speak("Nu börjar fokuspasset med " + getTheme().heroName + ".");

  state.intervalId = setInterval(tick, 1000);
}

function tick() {
  if (!state.running) return;

  state.elapsedSec += 1;
  state.phaseRemainingSec = Math.max(0, state.phaseRemainingSec - 1);

  const sessionRemaining = Math.max(0, settings.sessionDurationSec - state.elapsedSec);
  if (sessionRemaining <= 0) {
    endSession(false);
    return;
  }

  if (state.phaseRemainingSec <= 0) {
    transitionPhase();
  }

  updateTimersUi();
}

function transitionPhase() {
  if (!state.running) return;
  if (state.phase === "activity") {
    startBreakPhase();
    return;
  }
  startActivityPhase();
}

function startActivityPhase() {
  state.phase = "activity";
  state.phaseRemainingSec = settings.activityDurationSec;
  state.rewardClaimed = false;
  resetRewardButton(true);
  renderRandomActivity();
  updateTimersUi();
  playCue("phase");
}

function startBreakPhase() {
  state.phase = "break";
  state.phaseRemainingSec = settings.breakDurationSec;
  state.rewardClaimed = false;
  resetRewardButton(false);
  clearActiveActivity();
  renderBreak();
  speak(getTheme().breakText);
  playCue("break");
  updateTimersUi();
}

function endSession(manualStop) {
  if (!state.running && !manualStop) return;

  const elapsed = state.elapsedSec;
  clearInterval(state.intervalId);
  state.intervalId = null;
  stopAmbientTheme();
  clearActiveActivity();
  state.running = false;
  state.phase = "idle";
  state.elapsedSec = 0;
  state.phaseRemainingSec = 0;

  stats.totalFocusSec += elapsed;
  stats.totalStickers += state.sessionStickers;
  mergeActivityCounts(state.sessionActivityCounts);

  if (!manualStop) {
    stats.sessionsCompleted += 1;
    updateStreak();
  }

  saveStored(STORAGE_KEYS.stats, stats);

  const focusMin = Math.max(1, Math.round(elapsed / 60));
  const summary = manualStop
    ? "Passet avslutades. Ni hann med " + focusMin + " min fokustid och " + state.sessionStickers + " klistermärken."
    : "Pass klart. Ni samlade " + state.sessionStickers + " klistermärken på " + focusMin + " min.";

  state.sessionStickers = 0;
  resetRewardButton(false);
  renderIdle();
  updateTimersUi();
  updateButtonsUi();
  renderActivityLibrary();
  renderAchievements();
  syncStatsUi();
  showSummary(summary);
}

function updateStreak() {
  const today = dateKey(new Date());
  if (!stats.lastSessionDate) {
    stats.streakDays = 1;
    stats.lastSessionDate = today;
    return;
  }

  if (stats.lastSessionDate === today) {
    return;
  }

  const previous = new Date(stats.lastSessionDate + "T00:00:00");
  const now = new Date(today + "T00:00:00");
  const diffDays = Math.round((now - previous) / 86400000);
  stats.streakDays = diffDays === 1 ? stats.streakDays + 1 : 1;
  stats.lastSessionDate = today;
}

function dateKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function renderThemeMeta() {
  const theme = getTheme();
  els.themeBadge.textContent = "Tema: " + theme.label;
  els.childNameBadge.textContent = "Profil: " + settings.childName;
  els.themeFriends.textContent = theme.heroName + " och " + theme.buddyName;
}

function renderSessionPlan() {
  const activityNames = {
    draw: "Rita",
    dance: "Dansa",
    play: "Lekbana"
  };
  const active = enabledActivities();
  const phaseMin = Math.max(1, Math.round(settings.activityDurationSec / 60));
  const breakText = Math.round(settings.breakDurationSec) + " sek paus";
  const items = active.slice(0, 3).map((kind, index) => {
    const label = activityNames[kind] || "Aktivitet";
    return "<li><strong>" + (index + 1) + "</strong><span>" + label + " - " + phaseMin + " min, sedan " + breakText + "</span></li>";
  });
  els.sessionPlan.innerHTML = items.join("");
}

function renderIdle() {
  const theme = getTheme();
  const sessionMin = Math.max(1, Math.round(settings.sessionDurationSec / 60));
  els.activityTitle.textContent = "Välkommen";
  els.activityStage.innerHTML = [
    "<p class='prompt'>" + escapeHtml(settings.childName) + " gör passet med " + escapeHtml(theme.heroName) + " och " + escapeHtml(theme.buddyName) + ".</p>",
    "<div class='welcome-board'>",
    "<article class='welcome-tile'><strong>" + sessionMin + " min</strong><span>kort äventyr</span></article>",
    "<article class='welcome-tile'><strong>" + Math.round(settings.activityDurationSec / 60) + " min</strong><span>lek i taget</span></article>",
    "<article class='welcome-tile'><strong>" + Math.round(settings.breakDurationSec) + " sek</strong><span>mjuk paus</span></article>",
    "</div>"
  ].join("");
}

function renderBreak() {
  const theme = getTheme();
  els.activityTitle.textContent = "Paus";
  els.activityStage.innerHTML = [
    "<div class='break-card'>",
    guideCard(theme.heroName, theme.heroRole, theme.breakText),
    "<div class='breath-ring' aria-hidden='true'></div>",
    "<p class='label'>Vi börjar ny aktivitet snart.</p>",
    "</div>"
  ].join("");
}

function renderRandomActivity() {
  clearActiveActivity();
  const pool = enabledActivities();
  state.currentActivity = randomFrom(pool);

  if (state.currentActivity === "draw") {
    renderDrawActivity();
    speak(getTheme().heroName + " säger: nu ritar vi.");
    return;
  }

  if (state.currentActivity === "dance") {
    renderDanceActivity();
    speak(getTheme().buddyName + " säger: nu dansar vi.");
    return;
  }

  renderPlayActivity();
  speak("Nu kör vi en liten lekbana.");
}

function enabledActivities() {
  const keys = [];
  if (settings.enabledActivities.draw) keys.push("draw");
  if (settings.enabledActivities.dance) keys.push("dance");
  if (settings.enabledActivities.play) keys.push("play");
  if (!keys.length) return ["draw", "dance", "play"];
  return keys;
}

function promptPool(kind) {
  const theme = getTheme();
  const custom = customPromptsFor(kind);
  return BASE_PROMPTS[kind].concat(theme.prompts[kind] || [], custom);
}

function customPromptsFor(kind) {
  const custom = settings.customPrompts || {};
  return Array.isArray(custom[kind]) ? custom[kind] : [];
}

function renderDrawActivity() {
  const theme = getTheme();
  const prompts = promptPool("draw");
  const firstPrompt = randomFrom(prompts);
  els.activityTitle.textContent = "Rita";
  els.activityStage.innerHTML = [
    guideCard(theme.heroName, theme.heroRole, "Visa vad ni ska rita tillsammans."),
    "<p id='drawPrompt' class='prompt'>" + escapeHtml(firstPrompt) + "</p>",
    "<div class='canvas-wrap'><canvas id='drawCanvas'></canvas></div>",
    "<div class='mini-actions'>",
    "<button id='newDrawPrompt' class='ghost-btn' type='button'>Ny idé</button>",
    "<button id='clearCanvas' class='ghost-btn' type='button'>Rensa</button>",
    "</div>"
  ].join("");

  const promptEl = document.getElementById("drawPrompt");
  const canvas = document.getElementById("drawCanvas");
  const clearBtn = document.getElementById("clearCanvas");
  const newPromptBtn = document.getElementById("newDrawPrompt");

  setupCanvas(canvas);
  newPromptBtn.addEventListener("click", () => {
    promptEl.textContent = randomFrom(prompts);
    speak("Ny ritidé.");
    playCue("phase");
  });
  clearBtn.addEventListener("click", () => clearCanvas(canvas));
}

function setupCanvas(canvas) {
  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.scale(dpr, dpr);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#1b4f5d";
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, rect.width, rect.height);

  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function start(event) {
    drawing = true;
    const p = pointerPos(canvas, event);
    lastX = p.x;
    lastY = p.y;
  }

  function draw(event) {
    if (!drawing) return;
    const p = pointerPos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", draw);
  canvas.addEventListener("pointerup", stop);
  canvas.addEventListener("pointerleave", stop);

  state.cleanupActivity = () => {
    canvas.removeEventListener("pointerdown", start);
    canvas.removeEventListener("pointermove", draw);
    canvas.removeEventListener("pointerup", stop);
    canvas.removeEventListener("pointerleave", stop);
  };
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, rect.width, rect.height);
}

function pointerPos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function renderDanceActivity() {
  const theme = getTheme();
  const prompts = promptPool("dance");
  let frozen = false;
  const prompt = randomFrom(prompts);
  els.activityTitle.textContent = "Dansa";
  els.activityStage.innerHTML = [
    guideCard(theme.buddyName, "danskompis", "Rör kroppen i lugn takt."),
    "<div class='dance-pad'>",
    "<p id='dancePrompt' class='prompt'>" + escapeHtml(prompt) + "</p>",
    "<div id='pulseCircle' class='pulse' aria-hidden='true'></div>",
    "<p id='freezeText' class='label'>Rör kroppen till rytmen.</p>",
    "<div class='mini-actions'>",
    "<button id='nextDancePrompt' class='ghost-btn' type='button'>Ny dansrörelse</button>",
    "</div>",
    "</div>"
  ].join("");

  const promptEl = document.getElementById("dancePrompt");
  const pulseEl = document.getElementById("pulseCircle");
  const freezeText = document.getElementById("freezeText");
  const nextPromptBtn = document.getElementById("nextDancePrompt");

  nextPromptBtn.addEventListener("click", () => {
    promptEl.textContent = randomFrom(prompts);
    playCue("phase");
  });

  let timerId = null;
  function toggleFreeze() {
    frozen = !frozen;
    if (frozen) {
      pulseEl.classList.add("freeze");
      freezeText.textContent = "Frys! Håll stilla i 3 sekunder.";
      speak("Frys.");
      playCue("break");
    } else {
      pulseEl.classList.remove("freeze");
      freezeText.textContent = "Bra! Rör kroppen till rytmen igen.";
      playCue("phase");
    }
    scheduleToggle();
  }

  function scheduleToggle() {
    timerId = setTimeout(toggleFreeze, 2800 + Math.round(Math.random() * 2200));
  }

  scheduleToggle();
  state.cleanupActivity = () => clearTimeout(timerId);
}

function renderPlayActivity() {
  const theme = getTheme();
  const tasks = shuffled(promptPool("play")).slice(0, 3);
  let idx = 0;

  els.activityTitle.textContent = "Lekbana";
  els.activityStage.innerHTML = [
    guideCard(theme.heroName, "bancoach", "Följ stegen i ordning."),
    "<p id='playTask' class='prompt'>" + escapeHtml(tasks[idx]) + "</p>",
    "<ul class='playlist'>",
    tasks.map((task, i) => "<li>" + (i + 1) + ". " + escapeHtml(task) + "</li>").join(""),
    "</ul>",
    "<div class='mini-actions'>",
    "<button id='nextPlayStep' class='ghost-btn' type='button'>Nästa steg</button>",
    "</div>"
  ].join("");

  const taskEl = document.getElementById("playTask");
  const nextBtn = document.getElementById("nextPlayStep");

  nextBtn.addEventListener("click", () => {
    idx += 1;
    if (idx < tasks.length) {
      taskEl.textContent = tasks[idx];
      speak("Bra. Nästa steg.");
      playCue("phase");
      return;
    }

    taskEl.textContent = "Fantastiskt. Du klarade hela banan.";
    nextBtn.disabled = true;
    speak("Du klarade banan.");
    playCue("reward");
  });
}

function claimReward() {
  if (!state.running || state.phase !== "activity") return;
  if (state.rewardClaimed) return;

  state.rewardClaimed = true;
  state.sessionStickers += 1;
  if (state.currentActivity && state.sessionActivityCounts[state.currentActivity] !== undefined) {
    state.sessionActivityCounts[state.currentActivity] += 1;
  }
  resetRewardButton(false);
  renderActivityLibrary();
  renderAchievements();
  syncStatsUi();
  speak(randomFrom(getTheme().praise));
  playCue("reward");
}

function resetRewardButton(active) {
  if (active) {
    els.rewardBtn.disabled = false;
    els.rewardBtn.textContent = "Klar aktivitet";
    return;
  }
  els.rewardBtn.disabled = true;
  els.rewardBtn.textContent = "Klart för denna aktivitet";
}

function updateTimersUi() {
  const sessionRemain = state.running ? Math.max(0, settings.sessionDurationSec - state.elapsedSec) : settings.sessionDurationSec;
  els.sessionTimer.textContent = asClock(sessionRemain);

  if (!state.running) {
    els.phaseLabel.textContent = "Tryck Starta pass";
    els.sessionProgress.value = 0;
    els.phaseProgress.value = 0;
    return;
  }

  if (state.phase === "activity") {
    els.phaseLabel.textContent = "Aktivitet: " + asClock(state.phaseRemainingSec);
    const progress = 100 - (state.phaseRemainingSec / settings.activityDurationSec) * 100;
    els.phaseProgress.value = clamp(progress, 0, 100);
  } else {
    els.phaseLabel.textContent = "Paus: " + asClock(state.phaseRemainingSec);
    const progress = 100 - (state.phaseRemainingSec / settings.breakDurationSec) * 100;
    els.phaseProgress.value = clamp(progress, 0, 100);
  }

  const sessionProgress = (state.elapsedSec / settings.sessionDurationSec) * 100;
  els.sessionProgress.value = clamp(sessionProgress, 0, 100);
}

function updateButtonsUi() {
  els.startBtn.disabled = state.running;
  els.stopBtn.disabled = !state.running;
}

function syncStatsUi() {
  const totalStickers = stats.totalStickers + state.sessionStickers;
  const goal = Math.max(1, Number(settings.dailyGoalStickers) || 3);
  els.stickerCount.textContent = String(totalStickers);
  els.dailyGoalText.textContent = state.sessionStickers + " / " + goal;
  els.dailyGoalProgress.value = clamp((state.sessionStickers / goal) * 100, 0, 100);
  els.sessionsDone.textContent = String(stats.sessionsCompleted);
  els.focusMinutes.textContent = String(Math.round(stats.totalFocusSec / 60)) + " min";
  els.streakDays.textContent = String(stats.streakDays) + " dagar";
}

function syncSettingsUi() {
  els.childNameSetting.value = settings.childName;
  els.dailyGoal.value = String(settings.dailyGoalStickers);
  els.motionMode.value = settings.motionMode;
  els.activityDuration.value = String(settings.activityDurationSec);
  els.breakDuration.value = String(settings.breakDurationSec);
  els.sessionDuration.value = String(settings.sessionDurationSec);
  els.soundMode.value = settings.soundMode;
  renderVoiceOptions();
  els.voiceStyle.value = VOICE_STYLES[settings.voiceStyle] ? settings.voiceStyle : DEFAULT_SETTINGS.voiceStyle;
  els.voiceName.value = voiceNameExists(settings.voiceName) ? settings.voiceName : DEFAULT_SETTINGS.voiceName;
  els.soundTheme.value = settings.soundTheme;
  els.themeMode.value = settings.themeMode;
  els.energyMode.value = settings.energyMode;
  els.pinCodeSetting.value = settings.pinCode;
  els.toggleDraw.checked = !!settings.enabledActivities.draw;
  els.toggleDance.checked = !!settings.enabledActivities.dance;
  els.togglePlay.checked = !!settings.enabledActivities.play;
}

function saveSettingsFromUi() {
  const next = {
    childName: cleanChildName(els.childNameSetting.value),
    dailyGoalStickers: Number(els.dailyGoal.value),
    motionMode: els.motionMode.value,
    activityDurationSec: Number(els.activityDuration.value),
    breakDurationSec: Number(els.breakDuration.value),
    sessionDurationSec: Number(els.sessionDuration.value),
    soundMode: els.soundMode.value,
    voiceStyle: els.voiceStyle.value,
    voiceName: els.voiceName.value,
    soundTheme: els.soundTheme.value,
    themeMode: els.themeMode.value,
    energyMode: els.energyMode.value,
    pinCode: els.pinCodeSetting.value.trim() || settings.pinCode,
    enabledActivities: {
      draw: els.toggleDraw.checked,
      dance: els.toggleDance.checked,
      play: els.togglePlay.checked
    },
    customPrompts: normalizeCustomPrompts(settings.customPrompts)
  };

  if (!next.enabledActivities.draw && !next.enabledActivities.dance && !next.enabledActivities.play) {
    next.enabledActivities.draw = true;
  }

  if (!THEME_PACKS[next.themeMode]) {
    next.themeMode = settings.themeMode;
  }

  if (!SOUND_PATTERNS[next.soundTheme] && next.soundTheme !== "theme") {
    next.soundTheme = "theme";
  }

  if (!VOICE_STYLES[next.voiceStyle]) {
    next.voiceStyle = DEFAULT_SETTINGS.voiceStyle;
  }

  if (!voiceNameExists(next.voiceName)) {
    next.voiceName = DEFAULT_SETTINGS.voiceName;
  }

  if (!/^\d{4}$/.test(next.pinCode)) {
    next.pinCode = settings.pinCode;
    els.pinCodeSetting.value = settings.pinCode;
  }

  settings = next;
  applyEnergyMode(settings.energyMode);
  applyThemeMode(settings.themeMode);
  applyMotionMode(settings.motionMode);
  renderThemeMeta();
  renderSessionPlan();
  renderActivityLibrary();
  renderAiLabUi();
  saveStored(STORAGE_KEYS.settings, settings);
  syncSettingsUi();
  updateTimersUi();

  if (!state.running) {
    renderIdle();
  } else if (settings.soundMode === "on") {
    startAmbientTheme();
  } else {
    stopAmbientTheme();
  }

  if (state.running && state.phase === "activity") {
    speak("Inställningar sparade. Aktiviteten fortsätter.");
  } else {
    speak("Inställningar sparade.");
  }
}

function previewVoice() {
  const nextStyle = els.voiceStyle.value;
  if (VOICE_STYLES[nextStyle]) {
    settings.voiceStyle = nextStyle;
  }
  if (voiceNameExists(els.voiceName.value)) {
    settings.voiceName = els.voiceName.value;
  }
  warmSpeechVoices();
  speak("Hej, jag heter FokusKompis. Nu låter rösten lite mjukare och lugnare.", { force: true });
}

function generateAiIdeas() {
  const focus = els.aiFocusArea.value;
  const selectedKind = els.aiActivityKind.value;
  const kinds = selectedKind === "mixed" ? ["draw", "dance", "play"] : [selectedKind];
  const theme = getTheme();

  state.aiDraftIdeas = kinds.map((kind, index) => {
    const pool = AI_IDEA_BANK[focus]?.[kind] || AI_IDEA_BANK.follow[kind];
    const prompt = pool[index % pool.length];
    return {
      kind,
      text: adaptIdeaToTheme(prompt, kind, theme)
    };
  });

  els.aiStatus.textContent = "Förslag skapade för vuxen granskning.";
  renderAiLabUi();
  playCue("phase");
}

function saveAiIdeas() {
  if (!state.aiDraftIdeas.length) return;

  const nextCustom = normalizeCustomPrompts(settings.customPrompts);
  state.aiDraftIdeas.forEach((idea) => {
    const list = nextCustom[idea.kind] || [];
    if (!list.includes(idea.text)) {
      list.unshift(idea.text);
    }
    nextCustom[idea.kind] = list.slice(0, 8);
  });

  settings.customPrompts = nextCustom;
  state.aiDraftIdeas = [];
  saveStored(STORAGE_KEYS.settings, settings);
  renderActivityLibrary();
  renderAiLabUi();
  els.aiStatus.textContent = "Förslagen ligger nu i aktivitetsbanken.";
  speak("Nya övningar sparade.");
}

function renderAiLabUi() {
  const custom = normalizeCustomPrompts(settings.customPrompts);
  const savedCount = Object.values(custom).reduce((sum, list) => sum + list.length, 0);
  els.aiIdeaCount.textContent = String(savedCount);
  els.saveAiIdeasBtn.disabled = state.aiDraftIdeas.length === 0;

  if (!state.aiDraftIdeas.length) {
    els.aiIdeaList.innerHTML = "<li>Inga nya förslag ännu.</li>";
    return;
  }

  const labels = { draw: "Rita", dance: "Dansa", play: "Lekbana" };
  els.aiIdeaList.innerHTML = state.aiDraftIdeas.map((idea) => {
    return [
      "<li>",
      "<strong>" + labels[idea.kind] + "</strong>",
      "<span>" + escapeHtml(idea.text) + "</span>",
      "</li>"
    ].join("");
  }).join("");
}

function adaptIdeaToTheme(prompt, kind, theme) {
  if (kind === "draw") {
    return prompt + " Låt " + theme.heroName + " vara med i bilden.";
  }

  if (kind === "dance") {
    return prompt + " " + theme.buddyName + " håller takten.";
  }

  return prompt + " " + theme.heroName + " visar första steget.";
}

function unlockParentPanel() {
  const code = els.pinInput.value.trim();
  if (code !== settings.pinCode) {
    els.pinError.textContent = "Fel pinkod.";
    return;
  }
  closeDialog(els.parentDialog);
  els.pinError.textContent = "";
  els.parentPanel.classList.remove("hidden");
  els.parentPanel.setAttribute("aria-hidden", "false");
}

function lockParentPanel() {
  els.parentPanel.classList.add("hidden");
  els.parentPanel.setAttribute("aria-hidden", "true");
}

function applyEnergyMode(mode) {
  const root = document.documentElement;
  if (mode === "high") {
    root.style.setProperty("--accent", "#f0552e");
    root.style.setProperty("--accent-2", "#f3a51f");
    return;
  }
  if (mode === "medium") {
    root.style.setProperty("--accent", "#e06a35");
    root.style.setProperty("--accent-2", "#2f9ab7");
    return;
  }
  root.style.setProperty("--accent", "#ef7c42");
  root.style.setProperty("--accent-2", "#25a27c");
}

function cleanChildName(value) {
  const cleaned = String(value || "").trim().replace(/\s+/g, " ");
  return cleaned || DEFAULT_SETTINGS.childName;
}

function normalizeCustomPrompts(customPrompts) {
  const next = structuredClone(DEFAULT_SETTINGS.customPrompts);
  if (!customPrompts || typeof customPrompts !== "object") return next;

  Object.keys(next).forEach((kind) => {
    const list = Array.isArray(customPrompts[kind]) ? customPrompts[kind] : [];
    next[kind] = list
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .slice(0, 8);
  });

  return next;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mergeActivityCounts(counts) {
  stats.activityCounts = deepMerge(structuredClone(DEFAULT_STATS.activityCounts), stats.activityCounts || {});
  Object.keys(DEFAULT_STATS.activityCounts).forEach((key) => {
    stats.activityCounts[key] += counts[key] || 0;
  });
}

function combinedActivityCounts() {
  const base = deepMerge(structuredClone(DEFAULT_STATS.activityCounts), stats.activityCounts || {});
  Object.keys(base).forEach((key) => {
    base[key] += state.sessionActivityCounts[key] || 0;
  });
  return base;
}

function renderActivityLibrary() {
  const labels = { draw: "Rita", dance: "Dansa", play: "Lekbana" };
  const descriptions = {
    draw: "Tränar lugn start, finmotorik och att följa en enkel idé.",
    dance: "Ger rörelsepauser med rytm, stopp och omstart.",
    play: "Bygger instruktioner i flera steg med kroppen."
  };
  const counts = combinedActivityCounts();
  const active = enabledActivities();
  const aiCount = Object.values(normalizeCustomPrompts(settings.customPrompts)).reduce((sum, list) => sum + list.length, 0);
  const aiText = aiCount ? " " + aiCount + " AI-förslag sparade." : "";
  els.librarySummary.textContent = active.map((key) => labels[key]).join(", ") + " är aktiva." + aiText;
  els.activityLibrary.innerHTML = ["draw", "dance", "play"].map((key) => {
    const examples = promptPool(key).slice(0, 4).map((prompt) => "<li>" + escapeHtml(prompt) + "</li>").join("");
    const status = active.includes(key) ? "Aktiv" : "Pausad";
    const customCount = customPromptsFor(key).length;
    const customText = customCount ? " " + customCount + " AI-förslag finns sparade." : "";
    return [
      "<article class='library-card'>",
      "<header><h3>" + labels[key] + "</h3><span class='library-count'>" + counts[key] + "</span></header>",
      "<p>" + descriptions[key] + " " + status + "." + customText + "</p>",
      "<ul>" + examples + "</ul>",
      "</article>"
    ].join("");
  }).join("");
}

function renderAchievements() {
  const totalStickers = stats.totalStickers + state.sessionStickers;
  const counts = combinedActivityCounts();
  const items = [
    { label: "Första passet", done: stats.sessionsCompleted > 0 || state.running },
    { label: "3 klistermärken", done: totalStickers >= 3 },
    { label: "Alla aktiviteter", done: counts.draw > 0 && counts.dance > 0 && counts.play > 0 },
    { label: "Tre dagars streak", done: stats.streakDays >= 3 }
  ];
  els.achievementList.innerHTML = items.map((item) => {
    return "<li class='" + (item.done ? "is-complete" : "") + "'><span>" + (item.done ? "✓" : "·") + "</span><span>" + item.label + "</span></li>";
  }).join("");
}

function applyMotionMode(mode) {
  document.documentElement.dataset.motion = mode === "reduced" ? "reduced" : "full";
}

function applyThemeMode(mode) {
  const root = document.documentElement;
  const theme = THEME_PACKS[mode] || THEME_PACKS.jungle;
  root.style.setProperty("--bg-1", theme.palette.bg1);
  root.style.setProperty("--bg-2", theme.palette.bg2);
  root.style.setProperty("--shape-a", theme.palette.shapeA);
  root.style.setProperty("--shape-b", theme.palette.shapeB);
  root.style.setProperty("--dance-1", theme.palette.dance1);
  root.style.setProperty("--dance-2", theme.palette.dance2);
  root.style.setProperty("--guide-bg", theme.palette.guideBg);
}

function getTheme() {
  return THEME_PACKS[settings.themeMode] || THEME_PACKS.jungle;
}

function activeSoundTheme() {
  if (settings.soundTheme === "theme") return settings.themeMode;
  return settings.soundTheme;
}

function startAmbientTheme() {
  stopAmbientTheme();
  if (settings.soundMode !== "on") return;
  playCue("start");
  state.ambientTimerId = setInterval(() => {
    if (state.running) playCue("ambient");
  }, 7000);
}

function stopAmbientTheme() {
  if (state.ambientTimerId) {
    clearInterval(state.ambientTimerId);
    state.ambientTimerId = null;
  }
}

function playCue(kind) {
  if (settings.soundMode !== "on") return;
  const key = activeSoundTheme();
  const notes = SOUND_PATTERNS[key] || SOUND_PATTERNS.jungle;

  if (kind === "reward") {
    playPattern([notes[0], notes[1], notes[2], notes[2] * 1.18], 0.17, 0.12, 0.032, "triangle");
    return;
  }

  if (kind === "break") {
    playPattern([notes[0] * 0.75, notes[1] * 0.75], 0.2, 0.18, 0.018, "sine");
    return;
  }

  if (kind === "start") {
    playPattern([notes[0], notes[1], notes[2]], 0.18, 0.14, 0.024, "triangle");
    return;
  }

  if (kind === "ambient") {
    playPattern([notes[0], notes[2]], 0.22, 0.46, 0.012, "sine");
    return;
  }

  playPattern([notes[1], notes[2]], 0.14, 0.12, 0.022, "triangle");
}

function playPattern(notes, durationSec, gapSec, volume, waveType) {
  const ctx = ensureAudioContext();
  if (!ctx) return;

  let t = ctx.currentTime + 0.02;
  notes.forEach((frequency) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveType;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + durationSec + 0.01);
    t += gapSec;
  });
}

function ensureAudioContext() {
  if (!("AudioContext" in window) && !("webkitAudioContext" in window)) return null;
  if (!state.audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new Ctor();
  }
  if (state.audioCtx.state === "suspended") {
    state.audioCtx.resume().catch(() => {});
  }
  return state.audioCtx;
}

function speak(text, options = {}) {
  if (settings.soundMode !== "on" && !options.force) return;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;

  warmSpeechVoices();
  if (!state.voicesReady) {
    state.pendingSpeechText = text;
    clearTimeout(state.pendingSpeechTimerId);
    state.pendingSpeechTimerId = window.setTimeout(() => {
      if (state.pendingSpeechText === text) {
        speakNow(text);
        state.pendingSpeechText = "";
      }
      state.pendingSpeechTimerId = null;
    }, 700);
    return;
  }

  speakNow(text);
}

function speakNow(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickFriendlyVoice();
  const style = VOICE_STYLES[settings.voiceStyle] || VOICE_STYLES.adultWarm;
  const energyRateBoost = settings.energyMode === "high" ? 0.05 : settings.energyMode === "medium" ? 0.025 : 0;

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "sv-SE";
  } else {
    utterance.lang = "sv-SE";
  }

  utterance.rate = clamp(style.rate + energyRateBoost, 0.74, 1.0);
  utterance.pitch = clamp(style.pitch, 0.94, 1.12);
  utterance.volume = 0.96;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function warmSpeechVoices() {
  if (!("speechSynthesis" in window)) return;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    state.speechVoices = voices;
    state.voicesReady = true;
    renderVoiceOptions();
  }

  window.speechSynthesis.onvoiceschanged = () => {
    state.speechVoices = window.speechSynthesis.getVoices();
    state.voicesReady = state.speechVoices.length > 0;
    renderVoiceOptions();

    if (state.pendingSpeechText) {
      const text = state.pendingSpeechText;
      state.pendingSpeechText = "";
      clearTimeout(state.pendingSpeechTimerId);
      state.pendingSpeechTimerId = null;
      speakNow(text);
    }
  };
}

function pickFriendlyVoice() {
  const voices = state.speechVoices.length ? state.speechVoices : window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const selected = selectedVoice(voices);
  if (selected) return selected;

  return voices
    .slice()
    .sort((a, b) => voiceScore(b) - voiceScore(a))[0] || null;
}

function selectedVoice(voices) {
  if (!settings.voiceName || settings.voiceName === "auto") return null;
  return voices.find((voice) => voiceId(voice) === settings.voiceName || voice.name === settings.voiceName) || null;
}

function renderVoiceOptions() {
  if (!els.voiceName) return;

  const currentValue = voiceNameExists(settings.voiceName) ? settings.voiceName : DEFAULT_SETTINGS.voiceName;
  const voices = state.speechVoices.length ? state.speechVoices : window.speechSynthesis?.getVoices?.() || [];
  const sortedVoices = voices.slice().sort((a, b) => voiceScore(b) - voiceScore(a));

  els.voiceName.textContent = "";

  const autoOption = document.createElement("option");
  autoOption.value = "auto";
  autoOption.textContent = "Automatiskt bästa röst";
  els.voiceName.appendChild(autoOption);

  sortedVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voiceId(voice);
    option.textContent = voiceLabel(voice);
    els.voiceName.appendChild(option);
  });

  els.voiceName.value = voiceNameExists(currentValue) ? currentValue : DEFAULT_SETTINGS.voiceName;
}

function voiceNameExists(value) {
  if (!value || value === "auto") return true;
  const voices = state.speechVoices.length ? state.speechVoices : window.speechSynthesis?.getVoices?.() || [];
  return voices.some((voice) => voiceId(voice) === value || voice.name === value);
}

function voiceId(voice) {
  return (voice.name || "voice") + "||" + (voice.lang || "");
}

function voiceLabel(voice) {
  const natural = /natural|neural|online/i.test(voice.name || "") ? " - naturligare" : "";
  return (voice.name || "Röst") + " (" + (voice.lang || "okänt språk") + ")" + natural;
}

function voiceScore(voice) {
  const name = String(voice.name || "").toLowerCase();
  const lang = String(voice.lang || "").toLowerCase();
  let score = 0;

  if (lang === "sv-se") score += 120;
  else if (lang.startsWith("sv")) score += 100;

  if (name.includes("natural")) score += 44;
  if (name.includes("neural")) score += 38;
  if (name.includes("online")) score += 24;
  if (name.includes("desktop")) score -= 14;
  if (voice.localService) score += 2;

  ["sofie", "sofia", "hillevi", "hedvig", "elin", "alva", "astrid", "anna", "amanda", "maria"].forEach((friendlyName) => {
    if (name.includes(friendlyName)) score += 80;
  });

  ["jenny", "sara", "emma", "aria", "sonia", "susan", "zira", "ava", "mia", "lisa"].forEach((friendlyName) => {
    if (name.includes(friendlyName)) score += 35;
  });

  ["bengt", "mattias", "magnus", "gunnar", "david", "mark", "guy"].forEach((deeperName) => {
    if (name.includes(deeperName)) score -= 95;
  });

  return score;
}

function clearActiveActivity() {
  if (typeof state.cleanupActivity === "function") {
    state.cleanupActivity();
  }
  state.cleanupActivity = null;
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function" && !dialog.open) {
    dialog.showModal();
  }
}

function closeDialog(dialog) {
  if (dialog.open) {
    dialog.close();
  }
}

function showSummary(text) {
  els.summaryText.textContent = text;
  openDialog(els.summaryDialog);
}

function guideCard(name, role, prompt) {
  return [
    "<div class='guide-card'>",
    "<p class='label'>Figurguide</p>",
    "<p class='guide-name'>" + escapeHtml(name) + "</p>",
    "<p class='guide-role'>" + escapeHtml(role) + " - " + escapeHtml(prompt) + "</p>",
    "</div>"
  ].join("");
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffled(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function asClock(totalSec) {
  const safe = Math.max(0, Math.floor(totalSec));
  const m = String(Math.floor(safe / 60)).padStart(2, "0");
  const s = String(safe % 60).padStart(2, "0");
  return m + ":" + s;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

