// lib/uploadthing/uploadthing-provider.jsx
"use client";

import { UploadthingContextProvider } from "../../lib/uploadthing/uploadthing-context";

export function UploadthingProvider({ children }) {
  return (
    <UploadthingContextProvider>
      {children}
    </UploadthingContextProvider>
  );
}