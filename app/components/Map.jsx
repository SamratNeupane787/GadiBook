"use client";
import React from "react";
import { Map, Marker } from "react-map-gl";
import { useContext } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUser } from "@clerk/nextjs";
import Markers from "./Markers";

function MapField() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const data = useUser();
  return (
    <div className=" p-5">
      <h2 className=" text-[20px] font-semibold">Map</h2>
      <div className=" rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {/* Source Marker */}
            <Markers />
            {/* Destination Marker */}
          </Map>
        ) : null}
      </div>
    </div>
  );
}

export default MapField;
