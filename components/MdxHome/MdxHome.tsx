import { MdxLink } from 'components/MdxShared';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { MdxHomeBrand } from './MdxHomeBrand';
import { MdxHomeCenter, MdxHomeDisclaimerWrapper, MdxHomeWrapper } from './styles';
import { MdxHomeType } from './types';

export const MdxHome: FC<MdxHomeType> = ({ disclaimer, linkText, linkUrl, style }) => {
  const brandControls = useAnimation();
  const disclaimerControls = useAnimation();
  const aboutControls = useAnimation();

  useEffect(() => {
    (async () => {
      await brandControls.start({
        pathLength: 1,
        transition: {
          duration: 2.8,
          ease: 'easeInOut',
        },
      });
      await brandControls.start({
        fillOpacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      });
      await disclaimerControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      });
      await aboutControls.start({ opacity: 1, transition: { duration: 0.3 } });
    })();
  }, [aboutControls, brandControls, disclaimerControls]);

  return (
    <MdxHomeWrapper
      as={motion.div}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
        },
      }}
      style={style}
    >
      <MdxHomeCenter>
        <MdxHomeBrand animate={brandControls} />
        <MdxHomeDisclaimerWrapper
          as={motion.div}
          initial={{ y: 15, opacity: 0 }}
          animate={disclaimerControls}
        >
          {disclaimer}
        </MdxHomeDisclaimerWrapper>
      </MdxHomeCenter>
      <motion.div initial={{ opacity: 0 }} animate={aboutControls}>
        <MdxLink url={linkUrl}>{linkText}</MdxLink>
      </motion.div>
    </MdxHomeWrapper>
  );
};
