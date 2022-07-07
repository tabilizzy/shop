import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function Alan() {
  const [alanInstance, setAlanInstance] = useState();

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        left: "15px",
        key: "8135b69a541bb038b48c29be381cdac02e956eca572e1d8b807a3e2338fdd0dc/stage",

        onCommand: (commandDate) => {
          console.log(commandDate);
        },
      })
    );
  }, []);

  return null;
}
