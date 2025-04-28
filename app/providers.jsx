// app/providers.jsx
"use client";

import { UploadthingProvider } from "../lib/uploadthing/uploadthing-provider";

export default function Providers({ children }) {
    return (
        <UploadthingProvider>
            {children}
        </UploadthingProvider>
    );
}