"use client";
import { v4 as uuidv4 } from "uuid";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useContext, useEffect, useState } from "react";
import { SourceCoordiContext } from "../../context/SourceCoordiContext";
import { DestinationCordiContext } from "../../context/DestiCoordiContext";

const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

export function PlaceholdersAndVanishInputDemo() {
  const [source, setSource] = useState(""); // Initialize with empty string
  const [des, setDes] = useState(""); // Initialize with empty string
  const [addressList, setAddressList] = useState([]);
  const [sourceChange, setSourceChange] = useState(false);
  const [destiChange, setDestiChange] = useState(false);

  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCoordiContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCordiContext
  );

  const [destinationList, setDestinationList] = useState([]);

  const sessionToken = uuidv4(); // Generate a unique session token

  const placeholders = [
    "Is your pickup location?",
    "Balkhu",
    "Kalimati",
    "New Road",
    "Balaju",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  // Fetching address list when the user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (sourceChange && source) {
        getAddressList();
      }
    }, 1000); // 1000ms delay for debouncing

    return () => clearTimeout(delayDebounceFn);
  }, [source, sourceChange]);

  // Fetching destination list when the user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destiChange && des) {
        getDestinationList();
      }
    }, 1000); // 1000ms delay for debouncing

    return () => clearTimeout(delayDebounceFn);
  }, [des, destiChange]);

  const getAddressList = async () => {
    const res = await fetch("/api/search-address?q=" + source, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressList(result);
  };

  const getDestinationList = async () => {
    const res = await fetch("/api/search-address?q=" + des, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setDestinationList(result);
  };

  const onSourceAddressClick = async (item) => {
    setSource(item.name);
    setAddressList([]);
    setSourceChange(false);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        sessionToken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setSourceCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  const onDesAddressClick = async (item) => {
    setDes(item.name);
    setDestinationList([]);
    setDestiChange(false);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        sessionToken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setDestinationCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  return (
    <div className="h-[15rem] flex flex-col justify-center items-center px-4">
      <h2 className="text-3xl font-semibold text-left pb-6">
        Set your Location
      </h2>
      <div className="flex gap-3 flex-col">
        {/* Source Location */}
        <div className="flex flex-col gap-2 items-center">
          <h2>From:</h2>
          <PlaceholdersAndVanishInput
            placeholders={source || placeholders}
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setSourceChange(true);
            }}
          />
          {addressList?.suggestions?.length > 0 &&
            addressList.suggestions.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap w-[20rem] items-center justify-center text-center rounded-full h-[3rem] py-4"
              >
                <h2
                  className="text-white hover:text-zinc-500 cursor-pointer duration-100"
                  onClick={() => {
                    onSourceAddressClick(item);
                  }}
                >
                  {index + 1}: {item.name}, {item.place_formatted}, NP
                </h2>
              </div>
            ))}
        </div>

        {/* Destination Location */}
        <div className="flex flex-col gap-1 items-center">
          <h2>To:</h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => {
              setDes(e.target.value);
              setDestiChange(true);
            }}
            value={des} // Controlled value
          />
          {destinationList?.suggestions?.length > 0 &&
            destinationList.suggestions.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap w-[20rem] items-center justify-center text-center rounded-full h-[3rem] py-4"
              >
                <h2
                  className="text-white hover:text-zinc-500 cursor-pointer duration-100"
                  onClick={() => {
                    onDesAddressClick(item);
                  }}
                >
                  {index + 1}: {item.name}, {item.place_formatted}, NP
                </h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
