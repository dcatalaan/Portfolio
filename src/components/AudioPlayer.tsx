import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Verificar si el archivo existe
      const audio = new Audio();
      const audioPath = '/playback.mp3.mp3';
      console.log('Intentando cargar audio desde:', audioPath);
      audio.src = audioPath;
      
      audio.addEventListener('canplaythrough', () => {
        setError(null);
        console.log('Audio cargado correctamente');
      });

      audio.addEventListener('error', (e) => {
        const errorMessage = `No se pudo cargar el archivo de audio. Por favor, asegúrate de que el archivo playback.mp3.mp3 esté en la carpeta public.`;
        setError(errorMessage);
        console.error('Error al cargar el audio:', e);
        console.error('Ruta del audio:', audioPath);
      });

      // Intentar cargar el audio
      audio.load();
      console.log('Audio cargando...');

      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            setError('Error al reproducir el audio: ' + error.message);
            console.error("Error al reproducir el audio:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (error) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-64 p-4 bg-red-500/80 backdrop-blur-lg rounded-xl text-white text-sm">
        {error}
      </div>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/playback.mp3.mp3"
        loop
        preload="auto"
      />
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isExpanded
            ? 'w-64 h-32 rounded-xl'
            : 'w-16 h-8 rounded-full'
        } bg-black/90 backdrop-blur-lg border border-white/20 shadow-lg overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className="w-full h-full cursor-pointer relative z-10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-xs truncate px-2">
                VUELVE CANDY B
              </span>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">VUELVE CANDY B</h3>
                <span className="text-white/60 text-sm">Bad Bunny</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <FaPause className="text-white" />
                  ) : (
                    <FaPlay className="text-white" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-white" />
                  ) : (
                    <FaVolumeUp className="text-white" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer; 