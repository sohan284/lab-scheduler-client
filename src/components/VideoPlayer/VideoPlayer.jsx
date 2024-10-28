import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/videos');
                console.log('Fetched videos:', response.data);
                setVideos(response.data);
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load videos');
            }
        };

        fetchVideos();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
            <div className="grid gap-4">
                {videos.map((video) => (
                    <div key={video._id} className="border p-4 rounded">
                        <h2 className="text-xl mb-2">{video.title}</h2>
                        <video 
                            controls 
                            className="w-full"
                            key={video._id}
                        >
                            <source 
                                src={`http://localhost:5000/video/${video._id}`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvancedVideoPlayer;
