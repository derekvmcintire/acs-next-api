"use client";

import dynamic from "next/dynamic";
import React from "react";
import "swagger-ui-react/swagger-ui.css"; // Correct path for the CSS
// import './theme.css';

const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  { ssr: false },
);

const ApiDocs = () => {
  return <SwaggerUI url="/openapi.json" />;
};

export default ApiDocs;
