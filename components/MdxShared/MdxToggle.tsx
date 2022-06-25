import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { variantsState } from "state";
import { MdxToggleType } from "./types";
import { MdxToggleTrack, MdxToggleThumb, MdxToggleWrapper } from "./styles";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export const MdxToggle: FC<MdxToggleType> = ({ style, checked, label }) => {
  const variants = useRecoilValue(variantsState);
  const [isOn, setIsOn] = useState(checked);
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <MdxToggleWrapper
      as={motion.button}
      variants={variants}
      style={style}
      $isOn={isOn}
      onClick={toggleSwitch}
    >
      <MdxToggleTrack>
        <MdxToggleThumb as={motion.span} layout transition={spring} />
      </MdxToggleTrack>
      {label}
    </MdxToggleWrapper>
  );
};
