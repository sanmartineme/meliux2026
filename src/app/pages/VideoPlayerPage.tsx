import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowLeft,
  SkipBack,
  SkipForward,
  Settings,
  Share2,
  Subtitles,
} from 'lucide-react';
import { getContentById } from '../data/content';

export function VideoPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const content = getContentById(id || '');
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(7380); // 2h 3min in seconds
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const progressTimerRef = useRef<ReturnType<typeof setInterval>>();

  // Simulate playback progress
  useEffect(() => {
    if (playing && !showEndScreen) {
      progressTimerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          const pct = (next / duration) * 100;
          setProgress(pct);
          if (pct >= 100) {
            setPlaying(false);
            setShowEndScreen(true);
            clearInterval(progressTimerRef.current);
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(progressTimerRef.current);
    }
    return () => clearInterval(progressTimerRef.current);
  }, [playing, showEndScreen, duration]);

  // Navigate to recommend page once end screen is triggered
  useEffect(() => {
    if (showEndScreen && content?.id) {
      navigate(`/recomendar/${content.id}`);
    }
  }, [showEndScreen]);

  const hideControls = () => {
    clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    hideControls();
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
    setElapsed(Math.floor((pct / 100) * duration));
  };

  const handleSkip = (seconds: number) => {
    setElapsed((prev) => {
      const next = Math.max(0, Math.min(duration, prev + seconds));
      setProgress((next / duration) * 100);
      return next;
    });
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Contenido no encontrado</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onClick={() => setShowControls(true)}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Video background (simulated with image) */}
      <div className="absolute inset-0">
        <img
          src={content.heroImage}
          alt={content.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Center play/pause indicator */}
        {!playing && !showEndScreen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Pause size={36} className="text-white" fill="white" />
            </div>
          </div>
        )}

        {/* "Playing" indicator when playing */}
        {playing && (
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <div className="flex gap-0.5 items-end h-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-[#FFE600] rounded-full animate-bounce"
                  style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="text-white text-xs font-medium">Reproduciendo</span>
          </div>
        )}
      </div>

      {/* End screen */}
      {showEndScreen && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 px-6">
          <div className="w-16 h-16 bg-[#FFE600]/10 border-2 border-[#FFE600] rounded-full flex items-center justify-center mb-5">
            <Play size={28} className="text-[#FFE600]" fill="currentColor" />
          </div>
          <h2 className="text-white mb-2 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px' }}>
            {content.title}
          </h2>
          <p className="text-white/50 text-sm mb-8 text-center">Terminaste de ver este contenido.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => navigate(`/recomendar/${content.id}`)}
              className="w-full flex items-center justify-center gap-2 bg-[#FFE600] text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
            >
              <Share2 size={16} /> Recomendar
            </button>
            <button
              onClick={() => { setElapsed(0); setProgress(0); setPlaying(true); setShowEndScreen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-sm border border-white/25 hover:bg-white/20 transition-colors"
            >
              <Play size={16} fill="white" /> Ver de nuevo
            </button>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="mt-4 text-white/40 text-sm hover:text-white transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-6 bg-gradient-to-b from-black/70 to-transparent pb-16">
          <button
            onClick={() => navigate(`/contenido/${content.id}`)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full px-4 py-2 text-sm backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft size={14} /> {content.title}
          </button>
          <div className="flex items-center gap-3">
            <button className="text-white/60 hover:text-white transition-colors bg-black/30 rounded-full p-2 backdrop-blur-sm">
              <Subtitles size={20} />
            </button>
            <button className="text-white/60 hover:text-white transition-colors bg-black/30 rounded-full p-2 backdrop-blur-sm">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="px-6 pb-6 bg-gradient-to-t from-black/80 to-transparent pt-16">
          {/* Progress bar */}
          <div
            className="relative h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#FFE600] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#FFE600] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 7px)` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={() => setPlaying(!playing)}
                className="text-white hover:text-[#FFE600] transition-colors"
              >
                {playing ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
              </button>

              {/* Skip back */}
              <button
                onClick={() => handleSkip(-10)}
                className="text-white/70 hover:text-white transition-colors relative"
              >
                <SkipBack size={22} />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/40">10</span>
              </button>

              {/* Skip forward */}
              <button
                onClick={() => handleSkip(10)}
                className="text-white/70 hover:text-white transition-colors relative"
              >
                <SkipForward size={22} />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/40">10</span>
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={muted ? 0 : volume}
                  onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                  className="w-20 accent-[#FFE600]"
                />
              </div>

              {/* Time */}
              <span className="text-white/70 text-sm tabular-nums">
                {formatTime(elapsed)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/recomendar/${content.id}`)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="text-white/70 hover:text-white transition-colors"
              >
                {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}