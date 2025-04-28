// lib/uploadthing/uploadthing-context.jsx
"use client";

import { createContext, useContext } from "react";
import { generateReactHelpers } from "@uploadthing/react"; 
// import { generateReactHelpers } from "@uploadthing/react";
import { ourFileRouter } from "../../lib/uploadthing";

const { UploadButton, UploadDropzone, useUploadThing } = generateReactHelpers(ourFileRouter);

const UploadthingContext = createContext({
  UploadButton,
  UploadDropzone,
  useUploadThing,
});

export function UploadthingContextProvider({ children }) {
  return (
    <UploadthingContext.Provider
      value={{
        UploadButton,
        UploadDropzone,
        useUploadThing,
      }}
    >
      {children}
    </UploadthingContext.Provider>
  );
}

export function useUploadthingContext() {
  return useContext(UploadthingContext);
}