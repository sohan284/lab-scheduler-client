import React from "react";
import { CiSearch } from "react-icons/ci";
import TabNav from "../../Shared/TabNav";
import { CiSearch } from 'react-icons/ci';
import tutorialsJson from './tutorials.json';
import '../../global.css'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import video from './../../assets/video.mp4'

const Tutorials = () => {
  return (
    <>
      <TabNav />
      <div className="max-w-[1200px] mx-auto">
        <div className="   ">
          <div className="text-xl font-bold text-[#515151] uppercase my-10 mx-4 md:mx-0">
            Tutorials
          </div>
          <div className="flex gap-3 items-center justify-center mx-4 md:mx-0">
            <div className="relative mt-1 w-full md:w-2/5">
              <input
                type="text"
                id="password"
                className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors"
              />
              <div className="grid items-center w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                <CiSearch />
              </div>
            </div>
            <div>
              <button className="px-5 py-[6px] bg-[#522c80] text-white rounded-lg">
                Search
              </button>
            </div>
          </div>
          {/* Custom scroll area */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  my-12 px-4">
            {tutorialsJson.map((tutorial) => (
              <div key={tutorial.id} className="mt-12 md:mt-20">
                <div className="grid justify-center">
                  <div className="flex justify-between">
                    <div className="text-[15px] font-bold text-gray-600">
                      {tutorial.name}
                    </div>
                    <div className="text-[15px] font-bold text-gray-600">
                      {tutorial.duration}
                    </div>
                  </div>
                  {/* video div */}
                  <div className="mt-4 flex justify-center">
                    <div
                      className="relative"
                      style={{ width: "100%", maxWidth: "300px" }}
                    >
                      <iframe
                        width="100%"
                        height="auto"
                        src="https://www.youtube.com/embed/BlLeQ-oWfiA?si=tf0TbjHsp8wikVQX"
                        allowFullScreen
                        className="rounded-lg shadow-md"
                        style={{ aspectRatio: "16 / 9" }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorials;
