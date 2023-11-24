import React from "react";

export const WebcamGridPanelCssStyleContext = React.createContext<{
  height_WebrtcConnectionAnchorRcomp: number | null;
  set_height_WebrtcConnectionAnchorRcomp: React.Dispatch<React.SetStateAction<number | null>> | null;
}>({
  height_WebrtcConnectionAnchorRcomp: null,
  set_height_WebrtcConnectionAnchorRcomp: null,
});