import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
// import tutorialsJson from "./tutorials.json";
import TabNav from "../../Shared/TabNav";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import VideoLink from "../../assets/tutorials/wall_printing.mp4";
import './tutorial.css'
import { duration } from "@mui/material";
import baseUrl from "../../api/apiConfig";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Tutorials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [durations, setDurations] = useState({});
  const [search, setSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
 
const {
  isLoading,
  isError,
  data = [],
  error,
  refetch,
} = useQuery({
  queryKey: ["userOrders"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl.machines}`);
    return response.data.data;
  },
});
console.log(data);


  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDuration = (duration, videoUrl) => {
    setDurations((prevDurations) => ({
        ...prevDurations,
        [videoUrl] : formatDuration(duration),
    }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchButton = () => {
    setFilterSearch(search);
  }

  const filterTutorialsBySearch = data.filter((tutorial) => 
    tutorial.title.toLowerCase().includes(filterSearch.toLowerCase())
  );
  return (
    <>
      <TabNav /> 
      <div className="max-w-[1200px] mx-auto">
        <div className="text-xl font-bold text-[#515151] uppercase my-10 mx-4 xl:mx-0">
          Tutorials
        </div>
        <div className="flex gap-3 items-center justify-center mx-4 md:mx-0">
          <div className="relative mt-1 w-full md:w-2/5">
            <input
              type="text"
              id="password"
              className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors"
              onChange={handleSearch}
            />
            <div className="grid items-center w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
              <CiSearch />
            </div>
          </div>
          <div>
            <button className="px-5 py-[6px] bg-[#522c80] text-white rounded-lg" onClick={handleSearchButton}>
              Search
            </button>
          </div>
        </div>
        <div className="grid my-12 px-4">
  {filterTutorialsBySearch.filter(tutorial => tutorial.tutorials).map((tutorial) => (
    <div key={tutorial?.id} className="mt-12 md:mt-20 flex flex-col items-center">
    
      {tutorial.tutorials && (
        <div className="flex flex-col items-center">
          <div className="text-[15px] font-bold text-center overflow-hidden text-ellipsis text-blue-500 whitespace-nowrap w-full max-w-[300px]">
            {tutorial?.title}
          </div>
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
    {tutorial?.tutorials?.map((url)=> {
  return (
    <div className="mt-4 flex justify-center" key={url}>
      <div>
      <ReactPlayer
        url={url.url}
        width="100%"
        height="auto"
        controls={false}
        onDuration={(duration) => handleDuration(duration, url)}
        className="rounded-lg shadow-md cursor-pointer"
      /> 
      </div>
    </div>
  );
})}
      </div>

          
          
        </div>
      )}
    </div>
  ))}
</div>

      </div>

      {/* Modal Video */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} center>
        <ReactPlayer
          url={currentVideoUrl}
          controls
          width="100%"
          height="auto"
        />
      </Modal>
    </>
  );
};

export default Tutorials;
