import React from "react";
import { Svg } from "@soy-libs/uikit";
import { SvgProps } from "./types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 101 100" {...props}>
      <path d="M90.0709 0L50.1423 39.9286L10.2138 0L0.142334 10.0714L40.0709 50L0.142334 89.9286L10.2138 100L50.1423 60.0714L90.0709 100L100.142 89.9286L60.2138 50L100.142 10.0714L90.0709 0Z"/>
    </Svg>
  );
};

export default Icon;
