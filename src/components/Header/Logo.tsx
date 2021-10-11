import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

interface LogoProps {
  windowWidth: number;
}

const Logo = (props: LogoProps): JSX.Element => {
  return props.windowWidth < 900 ? (
    <StaticImage src="../../images/logoMobile.svg" />
  ) : (
    <StaticImage src="../../images/logoDesktop.svg" width={200} />
  );
};

export default Logo;
