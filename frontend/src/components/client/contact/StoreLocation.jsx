"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapComponent"), { ssr: false });

export default function StoreLocation() {
  const [geoData, setGeoData] = useState({ lat: 51.5072, lng: 0.1276 });
  return (
    <>
      <DynamicMap geoData={geoData} />
    </>
  );
}
