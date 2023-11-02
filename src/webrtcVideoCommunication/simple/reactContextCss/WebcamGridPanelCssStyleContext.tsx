import React from "react";

export const WebcamGridPanelCssStyleContext = React.createContext<{
  height_WebrtcConnectionPointRcomp: number | null;
  set_height_WebrtcConnectionPointRcomp: React.Dispatch<React.SetStateAction<number | null>> | null;
}>({
  height_WebrtcConnectionPointRcomp: null,
  set_height_WebrtcConnectionPointRcomp: null,
});