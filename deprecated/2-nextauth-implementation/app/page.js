"use client"
import Image from 'next/image'
import Navbar from './components/Navbar'
import DashboardCard from './components/DashboardCard'
import ArticleCard from './components/ArticleCard'
import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import { signIn, signOut, useSession } from "next-auth"

export default function Home() {
  const handleProof = useCallback((result) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 3000);
        // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  }, []);

  const onSuccess = (result) => {
      console.log(result);
  };

  return (
    <div>
      <Navbar />
      <DashboardCard />
      <ArticleCard />
      {/* Add the rest of your home page content */}
      <h1>Welcome to the Home Page!</h1>
      {/* Additional content */}

      <div>
        <div className="container">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                  <IDKitWidget
                      action="my_action"
                      signal="my_signal"
                      onSuccess={onSuccess}
                      handleVerify={handleProof}
                      app_id="app_f0125cbd47bd047ec18c80603b7479a2"
                      walletConnectProjectId="e17f404fcad13e2596e3971475c1dc37"
                  >
                      {({ open }) => <button onClick={open}>Click me</button>}
                  </IDKitWidget>
              </div>
          </div>
      </div>

    </div>
  )
}
