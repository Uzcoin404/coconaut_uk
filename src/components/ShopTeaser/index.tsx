import { Buying } from './Buying';
import {
  SectionTwoCol,
  Headline,
  Subheadline,
  Centered,
  Typography,
} from '@components/Global';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import styled from 'styled-components';

const Price = styled.div`
  padding: 3rem 0;
`;

export const ShopTeaser = () => {
  const data = useStaticQuery(
    graphql`
      {
        shopifyProduct(id: { eq: "90bc0096-8909-5670-9165-e52a2cfaa015" }) {
          title
          description
          featuredImage {
            altText
            gatsbyImageData
          }
          variants {
            availableForSale
            price
            storefrontId
          }
        }
      }
    `
  );

  const product = data.shopifyProduct;
  const variant = product.variants[0];
  const [quantity, setQuantity] = React.useState(1);

  return (
    <SectionTwoCol
      id='shop'
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
          <Subheadline>Pure Young Coconut Water</Subheadline>
          <Typography>{product.description}</Typography>

          <Price>
            <Typography fontSize={4}>&pound;&nbsp;{variant.price}</Typography>
            <Typography>
              &pound;&nbsp;
              {(variant.price / 12).toFixed(2)}
              &nbsp;per can incl. VAT & shipping
            </Typography>
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
  );
};
