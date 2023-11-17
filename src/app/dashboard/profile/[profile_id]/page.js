"use client";
import HeaderDashboard from "@/app/ui/molecules/headerDashboard";
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
  };

  React.useEffect(() => {
    const f = async () => {
      await handleClient();
      if (!clientInfo.character_id) {
        return router.push(
          `./${params.profile_id}/dressingroom`,
          params.profile_id
        );
      }
      router.push(`./${params.profile_id}/tasks`);
      console.log(clientInfo.character_id);
    };
    f();
  }, [clientInfo]);

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
