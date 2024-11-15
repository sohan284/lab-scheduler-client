import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import TabNav from "../../Shared/TabNav";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import baseUrl from "../../api/apiConfig";
import AuthToken from "../../utils/AuthToken";
import Loader from "../../components/Loader/Loader";

const Tutorials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [durations, setDurations] = useState({});
  const [search, setSearch] = useState("");
  const [machines, setMachines] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [expandedMachine, setExpandedMachine] = useState(null);
  const [viewMode, setViewMode] = useState("machines");
  const [loading, setLoading] = useState(false); // Loading state

  const token = AuthToken();

  const fetchMachines = async () => {
    setLoading(true); // Start loading when fetching begins
    try {
      const response = await axios.get(`${baseUrl.machines}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const machinesData = Array.isArray(response.data) ? response.data : response.data.data || [];
      machinesData.sort((a, b) => a.title.localeCompare(b.title));
      setMachines(machinesData);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setMachines([]);
    } finally {
      setLoading(false); // Stop loading when done fetching
    }
  };

  const fetchAllTutorials = async () => {
    setLoading(true); // Start loading when fetching begins
    try {
      const response = await axios.get(`${baseUrl.tutorials}`);
      setTutorials(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading when done fetching
    }
  };

  const handleToggleTutorials = (machineId) => {
    setExpandedMachine(expandedMachine === machineId ? null : machineId);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDuration = (duration, videoUrl) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [videoUrl]: formatDuration(duration),
    }));
  };

  const handleOpenModal = (videoUrl) => {
    if (!videoUrl) {
      console.error("Invalid video URL!");
      return;
    }
    setCurrentVideoUrl(videoUrl);
    setIsOpen(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMachines =
    machines.filter(
      (machine) =>
        machine?.title?.toLowerCase().includes(search.toLowerCase()) &&
        machine?.tutorials?.length > 0
    ) || [];

  useEffect(() => {
    if (viewMode === "machines") {
      fetchMachines();
    } else if (viewMode === "all") {
      fetchAllTutorials();
    }
  }, [viewMode]);

  return (
    <div className="min-h-screen">
      <TabNav />
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative w-full md:w-2/5">
            <input
              type="text"
              placeholder="Search for Tutorials..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ease-in-out duration-300"
              onChange={handleSearch}
            />
            <div className="absolute right-4 top-3.5 text-gray-400">
              <CiSearch className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start mb-10 gap-20">
          <button
            onClick={() => setViewMode("machines")}
            className={`text-xl bg-gray-200 w-fit px-5 py-4 rounded-xl font-bold text-gray-800 ${viewMode === "machines" ? "text-orange-500" : ""} hover:text-orange-400 transition-all duration-300`}
          >
            Machines
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`text-xl bg-gray-200 w-fit px-5 py-4 rounded-xl font-bold text-gray-800 ${viewMode === "all" ? "text-orange-500" : ""} hover:text-orange-400 transition-all duration-300`}
          >
            Others
          </button>
        </div>

        {/* Loader */}
        {loading && <Loader text={""} />}

        {/* Conditional rendering based on viewMode */}
        {!loading && (viewMode === "machines" ? (
          <div className=" flex flex-col gap-10">
            {filteredMachines.map((machine) => (
              <div
                key={machine._id || Math.random()}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6 cursor-pointer"
              >
                <h2
                  className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b cursor-pointer hover:text-orange-400"
                  onClick={() => handleToggleTutorials(machine._id)}
                >
                  {machine.title}
                </h2>

                {/* Toggle Tutorials Section */}
                {expandedMachine === machine._id && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {machine.tutorials?.map((tutorial, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleOpenModal(tutorial.url)}
                            className="w-full relative group"
                          >
                            <ReactPlayer
                              url={tutorial.url}
                              width="100%"
                              height="200px"
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
                )}
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
        ) : (
          <div className="  grid grid-cols-2 gap-10">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">{tutorial.title}</h2>
                <div className="relative rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleOpenModal(tutorial.url)}
                    className="w-full relative group"
                  >
                    <ReactPlayer
                      url={tutorial.url}
                      width="100%"
                      height="200px"
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
        ))}
      </div>

      {/* Modal to show video */}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        center
        classNames={{
          modal: "rounded-lg overflow-hidden lg:w-full",
          overlay: "bg-black bg-opacity-60",
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
