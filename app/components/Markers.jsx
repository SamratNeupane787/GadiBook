import { useContext } from "react";
import { Marker } from "react-map-gl";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCoordiContext } from "@/context/SourceCoordiContext";
import { DestinationCordiContext } from "@/context/DestiCoordiContext";
import "mapbox-gl/dist/mapbox-gl.css";

function Markers() {
  const { userLocation } = useContext(UserLocationContext);
  const { sourceCoordinates } = useContext(SourceCoordiContext);
  const { destinationCoordinates } = useContext(DestinationCordiContext);

  return (
    <div>
      {/* User Location Marker */}
      {userLocation && (
        <Marker
          longitude={userLocation?.lng}
          latitude={userLocation?.lat}
          anchor="bottom"
        >
          <img
            src={"/markerImage.png"}
            className="w-10 h-10 rounded-full"
            alt="User Marker"
          />
        </Marker>
      )}

      {/* Source Marker */}
      {sourceCoordinates?.lng && sourceCoordinates?.lat && (
        <Marker
          longitude={sourceCoordinates.lng}
          latitude={sourceCoordinates.lat}
          anchor="bottom"
        >
          <img
            src={"/markerImage.png"}
            className="w-10 h-10 rounded-full"
            alt="Source Marker"
          />
        </Marker>
      )}

      {/* Destination Marker */}
      {destinationCoordinates?.lng && destinationCoordinates?.lat && (
        <Marker
          longitude={destinationCoordinates.lng}
          latitude={destinationCoordinates.lat}
          anchor="bottom"
        >
          <img
            src={"/markerImage.png"}
            className="w-10 h-10 rounded-full"
            alt="Destination Marker"
          />
        </Marker>
      )}
    </div>
  );
}

export default Markers;
