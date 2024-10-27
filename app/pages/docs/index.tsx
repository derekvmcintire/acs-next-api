"use client";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  { ssr: false },
);

const ApiDocs = () => {
  return (
    <div className="swagger-container">
      <h1>API Documentation</h1>
      <SwaggerUI
        url="/openapi.yaml"
        theme={{
          colors: {
            primaryColor: "#1d72b8",
            secondaryColor: "#f7f7f7",
          },
        }}
      />
    </div>
  );
};

export default ApiDocs;
