import React, { FC } from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { variantsState } from "state";
import {
  MdxSettingsTitle,
  MdxSettingsItems,
  MdxSettingsWrapper,
} from "./styles";

export const MdxSettings: FC = ({ children }) => {
  const variants = useRecoilValue(variantsState);

  return (
    <MdxSettingsWrapper>
      <MdxSettingsTitle as={motion.h1} variants={variants}>
        Настройки
      </MdxSettingsTitle>
      <MdxSettingsItems>{children}</MdxSettingsItems>
    </MdxSettingsWrapper>
  );
};
