import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface CinematicIntroProps {
  onTransitionStart?: () => void;
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onTransitionStart,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [needsUserTap, setNeedsUserTap] = useState(false);
  const playbackTimerRef = useRef<number | null>(null);

  // Intro playback duration set to exactly 7 seconds
  const INTRO_DURATION_SECONDS = 7;

  // Cleanup timer and actively pause video when unmounting
  useEffect(() => {
    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Attempt autoplay immediately with forced mute attributes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict DOM mute enforcement for browser policy
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');

    const startPlayback = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setNeedsUserTap(false);
          })
          .catch((err) => {
            console.warn('Browser requires user interaction to play video:', err);
            setNeedsUserTap(true);
          });
      }
    };

    startPlayback();

    // Global listener so ANY click or touch on the screen immediately starts video
    const handleGlobalInteraction = () => {
      if (video.paused && !isExiting) {
        startPlayback();
      }
    };

    window.addEventListener('click', handleGlobalInteraction, { once: false });
    window.addEventListener('touchstart', handleGlobalInteraction, { once: false });
    window.addEventListener('keydown', handleGlobalInteraction, { once: false });

    return () => {
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
      window.removeEventListener('keydown', handleGlobalInteraction);
    };
  }, [isExiting]);

  const triggerTransition = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Cancel pending timer
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }

    // Actively pause the video so background playback does not continue
    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    onTransitionStart?.();

    // 1.1s coordinated curtain slide
    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  const startPlaybackTimer = () => {
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
    }
    const video = videoRef.current;
    const current = video ? video.currentTime : 0;
    const remainingMs = Math.max(0, (INTRO_DURATION_SECONDS - current) * 1000);

    playbackTimerRef.current = window.setTimeout(() => {
      triggerTransition();
    }, remainingMs);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;

    // Automatically transition immediately when video reaches 7 seconds
    if (current >= INTRO_DURATION_SECONDS && !isExiting) {
      triggerTransition();
    }
  };

  const handleUserTapPlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setNeedsUserTap(false);
        startPlaybackTimer();
      });
    }
  };

  return (
    <motion.div
      initial={{ x: '0%', scale: 1, opacity: 1 }}
      animate={{
        x: isExiting ? '-105%' : '0%',
        scale: isExiting ? 0.98 : 1,
        opacity: isExiting ? [1, 0.95, 0] : 1,
      }}
      transition={{
        duration: 1.1,
        ease: [0.76, 0, 0.24, 1], // Cinematic power-expo curve
      }}
      onClick={handleUserTapPlay}
      className="fixed inset-0 z-50 bg-[#070606] overflow-hidden select-none pointer-events-auto shadow-[30px_0_90px_rgba(0,0,0,0.98),15px_0_45px_rgba(200,16,46,0.6)] cursor-pointer"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Edge-to-Edge Pure Video Presentation */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        loop={false}
        disablePictureInPicture
        onPlaying={() => {
          setIsPlaying(true);
          setNeedsUserTap(false);
          startPlaybackTimer();
        }}
        onPause={() => {
          if (playbackTimerRef.current && !isExiting) {
            clearTimeout(playbackTimerRef.current);
            playbackTimerRef.current = null;
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerTransition}
        className="w-full h-full object-cover block border-0 outline-none"
      >
        <source src="./chiken-intro.mp4" type="video/mp4" />
        <source src="/chiken-intro.mp4" type="video/mp4" />
        <source src="./assets/aistudio/WhatsApp_Video_2026-11-09_at_7.25.50_PM_5c9c5279.mp4" type="video/mp4" />
        <source src="/assets/aistudio/WhatsApp_Video_2026-11-09_at_7.25.50_PM_5c9c5279.mp4" type="video/mp4" />
      </video>

      {/* Gentle interactive cue ONLY if browser strictly blocks autoplay without gesture */}
      <AnimatePresence>
        {needsUserTap && !isPlaying && !isExiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8102E] to-[#92051C] border-2 border-[#F5B82E] flex items-center justify-center text-white shadow-2xl animate-pulse mb-4">
              <Play className="w-8 h-8 fill-current text-[#F5B82E] ml-1" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl tracking-widest uppercase text-white drop-shadow-md">
              TAP TO PLAY CINEMATIC INTRO
            </p>
            <p className="font-sans text-xs text-[#F5B82E] tracking-wider uppercase mt-1">
              CHIKEN PREMIER EXPERIENCE
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trailing edge light accent visible during the slide transition */}
      {isExiting && (
        <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-b from-[#C8102E] via-[#F5B82E] to-[#92051C] shadow-[0_0_30px_#F5B82E] z-20 pointer-events-none" />
      )}

      {/* Skip Intro Button */}
      {!isExiting && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerTransition();
          }}
          className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-black/60 hover:bg-[#C8102E]/80 backdrop-blur-md border border-white/20 hover:border-[#F5B82E] text-white/80 hover:text-white font-heading text-xs tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer"
        >
          SKIP INTRO &rarr;
        </button>
      )}
    </motion.div>
  );
};
