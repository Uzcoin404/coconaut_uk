import { Centered, Headline, Layout, SectionWrapper } from '@components/Global';
import { CartInfo } from '@components/Cart/CartInfo';
import { StoreContext } from '@context/StoreContext';
import * as React from 'react';

const EmptyCart = () => (
  <Centered>
    <Headline>Your cart is empty</Headline>
  </Centered>
);

const Cart = () => {
  const { checkout } = React.useContext(StoreContext);
  return (
    <Layout title='Shopping cart' description='Manage your shopping cart'>
      <SectionWrapper padded>
        {checkout && checkout.lineItems.length > 0 ? (
          <CartInfo checkout={checkout} />
        ) : (
          <EmptyCart />
        )}
      </SectionWrapper>
    </Layout>
  );
};

export default Cart;
