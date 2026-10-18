// CareConnect Indian Vernacular Voice & Audio Escalation Engine
// Specifically engineered for authentic Indian English, Tamil, and Tanglish cadence

let audioCtx: AudioContext | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices cache and attach to onvoiceschanged
export const loadSystemVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };

    // Fallback if event doesn't fire promptly
    setTimeout(() => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    }, 200);
  });
};

// Immediate pre-warm
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadSystemVoices();
}

// Unlock audio context on user gesture
export const unlockAudio = (): AudioContext | null => {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      loadSystemVoices();
    }
    return audioCtx;
  } catch (err) {
    console.warn("Audio unlock notice:", err);
    return null;
  }
};

// Musical Indian temple/clinical alert chime via Web Audio API (warm Tanpura/Bansi-inspired 3-tier chime)
export const playAlertChime = (): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const ctx = unlockAudio();
      if (!ctx) {
        resolve();
        return;
      }

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      gainNode.connect(ctx.destination);
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      osc3.connect(gainNode);

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc3.type = 'sine';

      // Sa - Pa - Sa (C5: 523.25Hz, G5: 783.99Hz, C6: 1046.50Hz) - Classic soothing Indian tonic harmony
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(783.99, now + 0.16);
      osc1.frequency.setValueAtTime(1046.50, now + 0.32);

      osc2.frequency.setValueAtTime(261.63, now); // Sa bass
      osc2.frequency.setValueAtTime(392.00, now + 0.16); // Pa
      osc2.frequency.setValueAtTime(523.25, now + 0.32);

      osc3.frequency.setValueAtTime(659.25, now); // Ga harmony
      osc3.frequency.setValueAtTime(987.77, now + 0.16);
      osc3.frequency.setValueAtTime(1318.51, now + 0.32);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc1.stop(now + 0.75);
      osc2.stop(now + 0.75);
      osc3.stop(now + 0.75);

      setTimeout(() => resolve(), 700);
    } catch (e) {
      resolve();
    }
  });
};

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  isIndian: boolean;
  label: string;
}

// Filter and categorize voices specifically detecting Indian accents
export const getDetectedIndianVoices = async (): Promise<VoiceOption[]> => {
  const voices = await loadSystemVoices();

  return voices.map((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();

    // Check if voice is Indian
    const isIndian = 
      lang.includes('in') || // en-in, ta-in, hi-in, mr-in, etc.
      name.includes('india') ||
      name.includes('indian') ||
      name.includes('tamil') ||
      name.includes('hindi') ||
      name.includes('heera') ||
      name.includes('ravi') ||
      name.includes('rishi') ||
      name.includes('veena') ||
      name.includes('neerja') ||
      name.includes('prabhat') ||
      name.includes('kalpana') ||
      name.includes('kavya');

    let badge = 'Standard';
    if (lang.includes('ta') || name.includes('tamil')) badge = 'Tamil (India)';
    else if (lang.includes('hi') || name.includes('hindi')) badge = 'Hindi (India)';
    else if (isIndian) badge = 'Indian English';

    return {
      voice: v,
      isIndian,
      label: `${v.name} (${v.lang}) ${isIndian ? '🇮🇳 ' + badge : ''}`
    };
  });
};

// Find the best authentic Indian voice
export const selectBestIndianVoice = (
  voices: SpeechSynthesisVoice[], 
  lang: 'en' | 'ta' | 'tanglish',
  preferredVoiceURI?: string
): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) return null;

  // 1. If user explicitly selected a voice URI
  if (preferredVoiceURI) {
    const match = voices.find(v => v.voiceURI === preferredVoiceURI);
    if (match) return match;
  }

  // 2. If Tamil requested, search for native Tamil voice first
  if (lang === 'ta') {
    const tamilVoice = voices.find(v => {
      const l = (v.lang || '').toLowerCase().replace('_', '-');
      const n = (v.name || '').toLowerCase();
      return l.startsWith('ta') || n.includes('tamil') || n.includes('valluvar');
    });
    if (tamilVoice) return tamilVoice;
  }

  // 3. Search for Indian English voices (Google Indian English, Microsoft Heera/Ravi/Neerja, Rishi, Veena)
  const indianEnglishVoice = voices.find(v => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    const n = (v.name || '').toLowerCase();
    return (
      l === 'en-in' ||
      n.includes('india') ||
      n.includes('heera') ||
      n.includes('ravi') ||
      n.includes('rishi') ||
      n.includes('veena') ||
      n.includes('neerja') ||
      n.includes('prabhat')
    );
  });
  if (indianEnglishVoice) return indianEnglishVoice;

  // 4. Any Indian language voice (Hindi, Marathi, Telugu, etc.)
  const anyIndianVoice = voices.find(v => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    const n = (v.name || '').toLowerCase();
    return l.endsWith('-in') || n.includes('india');
  });
  if (anyIndianVoice) return anyIndianVoice;

  // 5. Friendly female English voice if no Indian voice found on device
  const friendlyEnglish = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (v.lang || '').startsWith('en') && (n.includes('female') || n.includes('zira') || n.includes('samantha') || n.includes('victoria'));
  });
  if (friendlyEnglish) return friendlyEnglish;

  // 6. Any English voice
  return voices.find(v => (v.lang || '').startsWith('en')) || voices[0] || null;
};

// Spoken text tailored to sound caring, natural, and authentically Indian
export const getAuthenticIndianSpokenText = (
  lang: 'en' | 'ta' | 'tanglish',
  patientName: string = "Priya",
  medicineName: string = "Metformin 500 milligram",
  hasIndianVoice: boolean = true
): string => {
  if (lang === 'ta') {
    return `வணக்கம் ${patientName} அம்மா! மருந்து எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது. தயவுசெய்து உங்கள் ${medicineName} மாத்திரையை உணவுக்குப் பின் தண்ணீரொடு எடுத்துக்கொள்ளவும்.`;
  }

  if (lang === 'tanglish') {
    if (hasIndianVoice) {
      // Natural spoken Tanglish with Indian voice cadence
      return `Vanakkam ${patientName} amma! Time aayiduchu, tablet podunga! Please take your ${medicineName} tablet after breakfast with warm water.`;
    } else {
      // Phonetic pronunciation tuned so an American/British voice doesn't sound funny!
      return `Vanakkam! Time eye-yee-doo-choo, thah-blet poh-dhoon-gah. Please take your ${medicineName} tablet with water now.`;
    }
  }

  // Warm Indian English phrasing (respectful, clear, compassionate)
  return `Good morning ${patientName}. It is time for your scheduled medicine. Please take your ${medicineName} tablet after your breakfast with a glass of water.`;
};

// Play Voice Synthesis with Indian voice selection, natural pacing and chime
export const speakVernacularText = async (
  lang: 'en' | 'ta' | 'tanglish',
  customText?: string,
  onStatusChange?: (speaking: boolean, msg?: string) => void,
  preferredVoiceURI?: string
): Promise<void> => {
  if (onStatusChange) onStatusChange(true, "Playing reminder chime...");

  // 1. Play serene Indian clinical alert chime first
  await playAlertChime();

  if (!('speechSynthesis' in window)) {
    if (onStatusChange) onStatusChange(false, "Web Speech API not supported on this browser");
    return;
  }

  // Pre-load voices
  const voices = await loadSystemVoices();

  // Resume synthesis in case browser suspended it
  window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  setTimeout(() => {
    try {
      const selectedVoice = selectBestIndianVoice(voices, lang, preferredVoiceURI);
      const isIndian = selectedVoice ? (
        selectedVoice.lang.toLowerCase().includes('in') ||
        selectedVoice.name.toLowerCase().includes('india') ||
        selectedVoice.name.toLowerCase().includes('heera') ||
        selectedVoice.name.toLowerCase().includes('ravi') ||
        selectedVoice.name.toLowerCase().includes('rishi') ||
        selectedVoice.name.toLowerCase().includes('veena')
      ) : false;

      let textToSpeak = customText;
      if (!textToSpeak) {
        textToSpeak = getAuthenticIndianSpokenText(lang, "Priya", "Metformin 500 milligram", isIndian);
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Authentic Indian healthcare cadence:
      // Slightly measured rate (0.88), warm pitch (1.04) ensures caring, clear Indian accent
      utterance.rate = 0.88;
      utterance.pitch = 1.04;
      utterance.volume = 1.0;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      }

      const voiceLabel = selectedVoice 
        ? `${selectedVoice.name} ${isIndian ? '(Indian Accent 🇮🇳)' : ''}` 
        : 'Indian English Engine';

      utterance.onstart = () => {
        if (onStatusChange) onStatusChange(true, `Speaking via ${voiceLabel}...`);
      };

      utterance.onend = () => {
        if (onStatusChange) onStatusChange(false);
      };

      utterance.onerror = (e) => {
        console.warn("Speech error:", e);
        if (onStatusChange) onStatusChange(false);
      };

      window.speechSynthesis.speak(utterance);

      // Background synthesis keepalive for Chromium
      const checkResume = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(checkResume);
        } else {
          window.speechSynthesis.resume();
        }
      }, 400);

    } catch (err) {
      console.warn("Voice speech error:", err);
      if (onStatusChange) onStatusChange(false);
    }
  }, 70);
};
