import { DirectionDataContext } from "../../context/DirectionDataContext";
import React, { useContext } from "react";

function DistanceTime() {
  const { directionData } = useContext(DirectionDataContext);

  const distanceData = (
    directionData?.routes?.[0]?.distance * 0.000621371192
  ).toFixed(2);
  const kilometerDistance = (distanceData * 1.60934).toFixed(2);

  console.log(distanceData);
  const durationData = (directionData?.routes?.[0]?.duration / 60).toFixed(2);

  return (
    <>
      <div className=" bg-blue-700 flex items-center justify-center gap-6 mt-7 h-[3rem] mx-4 px-2 rounded-lg">
        <h2
          className={
            isNaN(distanceData) ? "hidden" : "flex items-center justify-center"
          }
        >
          Distance:{kilometerDistance} Km
        </h2>

        <h2
          className={
            isNaN(durationData) ? "hidden" : "flex items-center justify-center"
          }
        >
          Duration:{durationData} Min
        </h2>
      </div>
    </>
  );
}

export default DistanceTime;
