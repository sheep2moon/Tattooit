import React from "react";
import Navbar from "../navigation/navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
