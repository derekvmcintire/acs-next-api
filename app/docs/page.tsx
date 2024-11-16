"use client";

import dynamic from "next/dynamic";
import openapiJson from "../../public/openapi.json"; // Adjust the path based on the location of your JSON file
import React from "react";
import './theme.css';

const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  { ssr: false },
);

const ApiDocs = () => {
  return (
    <div className="swagger-container">
      <h1>API Documentation</h1>
      <SwaggerUI
        spec={openapiJson}
      />
    </div>
  );
};

export default ApiDocs;
