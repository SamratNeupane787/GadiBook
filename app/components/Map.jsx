"use client";
import React, { useEffect, useRef } from "react";
import { Map, Marker, flyTo } from "react-map-gl";
import { useContext } from "react";
import { UserLocationContext } from "../../context/UserLocationContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUser } from "@clerk/nextjs";
import Markers from "./Markers";
import { SourceCoordiContext } from "../../context/SourceCoordiContext";
import { DestinationCordiContext } from "../../context/DestiCoordiContext";
import { uuid } from "uuidv4";
import { DirectionDataContext } from "../../context/DirectionDataContext";
import MapboxRoute from "./MapboxRoute";
import DistanceTime from "./DistanceTime";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const session_token = uuid();
console.log(session_token);
function MapField() {
  const mapRef = useRef();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates } = useContext(SourceCoordiContext);
  const { destinationCoordinates } = useContext(DestinationCordiContext);
  const data = useUser();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
      });
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
      });
    }
    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCoordinates.lng +
        "," +
        destinationCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    setDirectionData(result);
  };
  return (
    <div className=" p-5">
      <h2 className=" text-[20px] font-semibold">Map</h2>
      <div className=" rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes ? (
              <MapboxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className=" h-[2rem] absolute bottom-[40px] z-20 right-[20px] hidden md:block text-center">
        <DistanceTime />
      </div>
    </div>
  );
}

export default MapField;
