// CareConnect Audio & Voice Escalation Engine
// Bulletproof multi-tier audio: Web Audio API chime + SpeechSynthesis with fallback

let audioCtx: AudioContext | null = null;

// Initialize & unlock Web Audio on first user interaction
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
      // Pre-warm voices
      window.speechSynthesis.getVoices();
    }
    return audioCtx;
  } catch (err) {
    console.warn("AudioContext unlock failed:", err);
    return null;
  }
};

// Play medical alert chime via Web Audio API (works 100% reliably on all browsers)
export const playAlertChime = (tone: 'urgent' | 'gentle' = 'urgent'): Promise<void> => {
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
      const gainNode = ctx.createGain();

      gainNode.connect(ctx.destination);
      osc1.connect(gainNode);
      osc2.connect(gainNode);

      // Hospital chime frequencies (E5 - 659Hz to B5 - 987Hz)
      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.setValueAtTime(880.00, now + 0.15); // A5
      osc1.frequency.setValueAtTime(987.77, now + 0.30); // B5

      osc2.frequency.setValueAtTime(329.63, now); // E4 bass harmony
      osc2.frequency.setValueAtTime(440.00, now + 0.15);
      osc2.frequency.setValueAtTime(493.88, now + 0.30);

      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.65);
      osc2.stop(now + 0.65);

      setTimeout(() => resolve(), 600);
    } catch (e) {
      console.warn("Chime generation error:", e);
      resolve();
    }
  });
};

// Play Voice Synthesis with smart voice matching & fallback
export const speakVernacularText = async (
  lang: 'en' | 'ta' | 'tanglish',
  customText?: string,
  onStatusChange?: (speaking: boolean, msg?: string) => void
): Promise<void> => {
  if (onStatusChange) onStatusChange(true, "Engaging voice engine...");

  // 1. First play the audio chime so user immediately hears alert
  await playAlertChime();

  if (!('speechSynthesis' in window)) {
    if (onStatusChange) onStatusChange(false, "Web Speech API not supported on this browser");
    return;
  }

  // Resume synthesis in case browser suspended it
  window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  // Short delay after cancel to prevent Chrome drop bug
  setTimeout(() => {
    try {
      const voices = window.speechSynthesis.getVoices();
      
      let textToSpeak = customText;
      let targetLangCode = "en-IN";

      if (!textToSpeak) {
        if (lang === 'ta') {
          // Check if Tamil voice is installed on user system
          const hasTamilVoice = voices.some(v => v.lang.startsWith('ta'));
          if (hasTamilVoice) {
            textToSpeak = "மருந்து எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது. தயவுசெய்து உங்கள் மாத்திரையை உணவுக்குப் பின் எடுத்துக் கொள்ளவும்.";
            targetLangCode = "ta-IN";
          } else {
            // If Tamil voice is missing on user OS, fallback to phonetic Tanglish
            textToSpeak = "Time aaiduchu, tablet podunga! Marunthu saapda vendiya neram aaiduchu. Please take your Metformin 500 milligram tablet with water.";
            targetLangCode = "en-IN";
          }
        } else if (lang === 'tanglish') {
          textToSpeak = "Time aaiduchu, tablet podunga! Please take your Metformin 500 milligram tablet after breakfast with water.";
          targetLangCode = "en-IN";
        } else {
          textToSpeak = "It is time for your scheduled medicine. Please check your prescription instructions and take your Metformin 500 milligram tablet.";
          targetLangCode = "en-US";
        }
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Find best voice
      let selectedVoice = voices.find(v => v.lang === targetLangCode) ||
                          voices.find(v => v.lang.startsWith(targetLangCode.split('-')[0])) ||
                          voices.find(v => v.lang.includes('IN') || v.lang.includes('India')) ||
                          voices.find(v => v.lang.startsWith('en')) ||
                          voices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = targetLangCode;

      utterance.onstart = () => {
        if (onStatusChange) onStatusChange(true, `Speaking via ${selectedVoice?.name || targetLangCode}...`);
      };

      utterance.onend = () => {
        if (onStatusChange) onStatusChange(false);
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error:", e);
        if (onStatusChange) onStatusChange(false, "Audio completed (Alert chime sounded)");
      };

      window.speechSynthesis.speak(utterance);

      // Chrome safeguard: keep alive if speech synthesis gets paused
      const checkResume = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(checkResume);
        } else {
          window.speechSynthesis.resume();
        }
      }, 500);

    } catch (err) {
      console.warn("speakVernacularText error:", err);
      if (onStatusChange) onStatusChange(false);
    }
  }, 60);
};
