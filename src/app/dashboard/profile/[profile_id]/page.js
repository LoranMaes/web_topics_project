"use client";
import HeaderDashboard from "@/ui/molecules/HeaderDashboard";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getClient } from "@/firebase/firestore/getData";
import { useAuthContext } from "@/context/AuthContext";

export default function Page({ params }) {
  const { user } = useAuthContext();
  let [first, setFirst] = useState(true);
  const router = useRouter();

  const [clientInfo, setClientInfo] = useState(null);
  const handleClient = async () => {
    const { result, error } = await getClient(
      "users",
      user.uid,
      params.profile_id
    );
    setClientInfo(result);
    return result;
  };

  React.useEffect(() => {
    const f = async () => {
      await handleClient();
      console.log(clientInfo);
      if (
        clientInfo &&
        (clientInfo.character_id !== "C1" ||
          clientInfo.character_id !== "C2" ||
          clientInfo.character_id !== "C3")
      ) {
        return router.push(`./dressingroom`, params.profile_id);
      }
      router.push(`./${params.profile_id}/tasks`, params.profile_id);
      console.log(clientInfo.character_id);
    };
    f();
  }, []);

  return (
    <React.Fragment>
      <HeaderDashboard></HeaderDashboard>

      <main>
        {/* Als er een char id is geen character kiezen, als die er wel is activities tonen */}
        {clientInfo?.character_id ? (
          <div>Show</div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </main>
    </React.Fragment>
  );
}
