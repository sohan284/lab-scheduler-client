import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react';
import video from './../../assets/video.mp4'


const AdvancedVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const onLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const onEnded = () => {
    setIsPlaying(false);
  };

  const onFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.mozRequestFullScreen) {
        playerRef.current.mozRequestFullScreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        playerRef.current.webkitRequestFullscreen();
      } else if (playerRef.current.msRequestFullscreen) {
        playerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={playerRef} 
      className={`advanced-video-player w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl ${isFullscreen ? 'fixed inset-0 z-50 max-w-none' : ''}`}
    >
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-full cursor-pointer"
          src={video}
          onClick={togglePlay}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div
            ref={progressBarRef}
            className="progress-bar h-1 bg-gray-600 cursor-pointer mb-2"
            onClick={handleProgress}
          >
            <div
              className="progress-filled bg-red-500 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <button onClick={() => skip(-10)} className="p-1 hover:bg-gray-700 rounded">
                <SkipBack size={20} />
              </button>
              <button onClick={togglePlay} className="p-1 hover:bg-gray-700 rounded">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button onClick={() => skip(10)} className="p-1 hover:bg-gray-700 rounded">
                <SkipForward size={20} />
              </button>
              <div className="flex items-center space-x-1">
                <button onClick={toggleMute} className="p-1 hover:bg-gray-700 rounded">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="relative">
                <button 
                  className="p-1 hover:bg-gray-700 rounded"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={20} />
                </button>
                {showSettings && (
                  <div className="absolute right-0 bottom-full mb-2 bg-gray-800 rounded shadow-lg p-2">
                    <div className="text-sm font-semibold mb-1">Playback Speed</div>
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-2 py-1 rounded ${playbackRate === rate ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={toggleFullscreen} className="p-1 hover:bg-gray-700 rounded">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedVideoPlayer;