import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import TabNav from "../../Shared/TabNav";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import baseUrl from "../../api/apiConfig";
import AuthToken from "../../utils/AuthToken";

const Tutorials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [durations, setDurations] = useState({});
  const [search, setSearch] = useState("");
  const [machines, setMachines] = useState([]);
  const token = AuthToken();

  const fetchMachines = async () => {
    try {
      const response = await axios.get(`${baseUrl.machines}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const machinesData = Array.isArray(response.data) ? response.data : response.data.data || [];

      // Sort machines alphabetically by title
      machinesData.sort((a, b) => a.title.localeCompare(b.title));

      setMachines(machinesData);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setMachines([]);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleOpenModal = (videoUrl) => {
    if (!videoUrl) {
      console.error("Invalid video URL!");
      return;
    }
    setCurrentVideoUrl(videoUrl);
    setIsOpen(true);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDuration = (duration, videoUrl) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [videoUrl]: formatDuration(duration),
    }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMachines = machines
    .filter((machine) => machine?.title?.toLowerCase().includes(search.toLowerCase()) && machine?.tutorials?.length > 0) || [];


  return (
    <div className="min-h-screen">
      <TabNav />
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Machine Tutorials
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-full md:w-2/5">
            <input
              type="text"
              placeholder="Search machines..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              onChange={handleSearch}
            />
            <div className="absolute right-4 top-3.5 text-gray-400">
              <CiSearch className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {filteredMachines.map((machine) => (
            <div
              key={machine._id || Math.random()}
              className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">
                {machine.title}
              </h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {machine.tutorials?.map((tutorial, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
                    style={{ width: '100%', aspectRatio: '4 / 3' }} // Larger preview with 4:3 aspect ratio
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-semibold text-gray-700">
                        Tutorial {index + 1}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {durations[tutorial.url]}
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleOpenModal(tutorial.url)}
                        className="w-full relative group"
                      >
                        <ReactPlayer
                          url={tutorial.url}
                          width="100%"
                          height="200px" // Adjust height to make preview larger
                          controls={false}
                          onDuration={(duration) =>
                            handleDuration(duration, tutorial.url)
                          }
                          light={true}
                          className="rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredMachines.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No machines found matching your search.
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        center
        classNames={{
          modal: 'rounded-lg overflow-hidden lg:w-full ',
          overlay: 'bg-black'
        }}
      >
        <div className="aspect-video flex justify-center items-center">
          <ReactPlayer
            url={currentVideoUrl}
            controls
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Tutorials;
