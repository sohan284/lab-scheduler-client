import React from "react";
import tiger from "./../../assets/tiger.gif"
import "./loader.css";
const Loader = ({ text }) => {
  return (
    <div className="min-h-screen overflow-hidden ">
      <p className=" text-center">{text ? text : ""}</p>
      <img src={tiger} alt="" className="w-[200px] mx-auto" />
    </div>
  );
};

export default Loader;
// import React from "react";
// import "./loader.css";
// const Loader = ({ text }) => {
//   return (
//     <div className="min-h-screen  ">
//       <div
//         aria-label="Orange  and tan hamster running in a metal wheel"
//         role="img"
//         class="wheel-and-hamster"
//       >
//         <div class="wheel"></div>
//         <div class="hamster">
//           <div class="hamster__body">
//             <div class="hamster__head">
//               <div class="hamster__ear"></div>
//               <div class="hamster__eye"></div>
//               <div class="hamster__nose"></div>
//             </div>
//             <div class="hamster__limb hamster__limb--fr"></div>
//             <div class="hamster__limb hamster__limb--fl"></div>
//             <div class="hamster__limb hamster__limb--br"></div>
//             <div class="hamster__limb hamster__limb--bl"></div>
//             <div class="hamster__tail"></div>
//           </div>
//         </div>
//         <div class="spoke"></div>
//       </div>
//       <p className=" text-center">{text ? text : ""}</p>
//     </div>
//   );
// };

// export default Loader;
