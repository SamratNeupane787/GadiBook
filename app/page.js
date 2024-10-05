"use client";
import Image from "next/image";
import Header from "./components/Header";
import Carselect from "./components/Carselect";
import PaymentMethod from "./components/PaymentMethod";
import BookNow from "./components/BookNow";
import MapField from "./components/Map";
import { useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import { SourceCoordiContext } from "../context/SourceCoordiContext";
import { DestinationCordiContext } from "../context/DestiCoordiContext";
import { DirectionDataContext } from "../context/DirectionDataContext";
import { SelectedCarAmountContext } from "../context/SelectedCarAmount";
export default function Home() {
  const [userLocation, setUserLocation] = useState();
  const [sourceCoordinates, setSourceCoordinates] = useState({});
  const [destinationCoordinates, setDestinationCoordinates] = useState({});
  const [directionData, setDirectionData] = useState({});
  const [carAmount, setCarAmount] = useState({});
  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };
  return (
    <main className="py-8 flex items-center justify-center">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordiContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <SelectedCarAmountContext.Provider
                value={{ carAmount, setCarAmount }}
              >
                <div className="grid grid-cols-1 gap-24  place-items-center w-full px-4 md:grid-cols-3  md:max-w-7xl">
                  {/* Left column: Header, Carselect, and PaymentMethod */}
                  <div className="pt-6 bg-[#353A47] flex flex-col gap-4 rounded-lg w-full max-w-lg md:w-auto md:col-span-1">
                    <div>
                      <Header />
                    </div>
                    <div className="pt-4">
                      <Carselect />
                    </div>
                    <div>
                      <PaymentMethod />
                    </div>
                  </div>

                  {/* Right column: Map */}
                  <div className="col-span-1 w-full h-full md:col-span-2">
                    <MapField />
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCoordiContext.Provider>
      </UserLocationContext.Provider>
    </main>
  );
}
