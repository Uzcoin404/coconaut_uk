import { Button, Centered, Typography } from '@components/Global';
import { LineProduct } from '@components/Cart/LineProduct';
import * as React from 'react';
import * as ShopifyBuy from 'shopify-buy';
import styled from 'styled-components';

const StyledCartInfo = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const StyledTable = styled.table`
  th,
  td {
    padding: 0.5rem 1rem;
    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
    }
  }
`;

const StyledTotal = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;

  p {
    padding: 0 1rem;
  }
`;

const StyledTh = (props: { children: React.ReactNode }) => (
  <th>
    <Typography bold>{props.children}</Typography>
  </th>
);

interface cartInfoProps {
  checkout: ShopifyBuy.Cart;
}

export const CartInfo = ({ checkout }: cartInfoProps) => {
  return (
    <StyledCartInfo>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Product</StyledTh>
            <StyledTh>Total</StyledTh>
          </tr>
        </thead>

        <tbody>
          {checkout.lineItems.map((lineItem, i) => (
            <LineProduct key={i} item={lineItem} />
          ))}
        </tbody>
      </StyledTable>

      <div>
        <StyledTotal>
          <Typography>Total price</Typography>
          <Typography>£&nbsp;{checkout.subtotalPrice.amount}</Typography>
        </StyledTotal>
        <Centered onBoth>
          <Button href={checkout.webUrl}>Checkout</Button>
        </Centered>
      </div>
    </StyledCartInfo>
  );
};
