// src/layouts/AuthLayout.tsx
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
    {children}
  </div>
);

export default AuthLayout;
