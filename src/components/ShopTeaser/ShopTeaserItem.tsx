import * as React from 'react';
import { Buying } from './Buying';
import {
  SectionTwoCol,
  Centered,
  Headline,
  Subheadline,
  Typography,
} from '@components/Global';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const ShopTeaserItemStyle = styled.div`
  padding: 0 2rem;

  @media (min-width: 900px) {
    padding: 0 4rem;
  }
`;

const Description = styled.div`
  p,
  a {
    line-height: 1.8rem;
  }
  > p {
    padding: 0.8rem 0;
  }
  strong {
    font-weight: bolder;
  }
`;

const Price = styled.div`
  padding: 3rem 0;
`;

export const ShopTeaserItem = ({ product }: any) => {
  const variant = product.variants[0];
  const [quantity, setQuantity] = React.useState(1);

  return (
    <ShopTeaserItemStyle>
      <SectionTwoCol
        left={
          <Centered onMobile>
            <GatsbyImage
              alt={product.featuredImage.altText || product.title}
              image={product.featuredImage.gatsbyImageData}
            />
          </Centered>
        }
        right={
          <>
            <Headline>Coconaut</Headline>
            <Subheadline>{product.title}</Subheadline>
            <Description
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
            />

            <Price>
              <Typography fontSize={4}>&pound;&nbsp;{variant.price}</Typography>
              <Typography>incl. VAT & shipping</Typography>
            </Price>

            <div>
              <Typography bold>Quantity</Typography>
              <Buying
                title={product.title}
                variantId={variant.storefrontId}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </>
        }
      />
    </ShopTeaserItemStyle>
  );
};
