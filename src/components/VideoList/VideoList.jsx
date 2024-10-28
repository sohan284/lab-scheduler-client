import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/videos'); 
                setVideos(response.data); 
                setLoading(false);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <div>Loading videos...</div>;
    }

    return (
        <div>
            <h1>Video Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video._id} className="video-item">
                        <h2>{video.title}</h2>
                        <video controls width="300">
                            <source 
                                src={`http://localhost:5000/videoFile?path=${video.path}`} 
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

export default VideoList;
