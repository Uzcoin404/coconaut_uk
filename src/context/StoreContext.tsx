import * as React from 'react';
import * as ShopifyBuy from 'shopify-buy';

const client = ShopifyBuy.buildClient({
  // eslint-disable-next-line no-undef
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  // eslint-disable-next-line no-undef
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
});

interface StoreContextInterface {
  client: ShopifyBuy.Client;
  checkout: ShopifyBuy.Cart;
  cart: ShopifyBuy.LineItem[];
  isOpen: boolean;
  loading: boolean;
  didJustAddToCart: boolean;
  addVariantToCart: (variantId: string, quantity: number) => void;
  removeLineItem: (checkoutID: any, lineItemID: any) => void;
  updateLineItem: (checkoutID: any, lineItemID: any, quantity: any) => void;
}

const defaultValues: StoreContextInterface = {
  cart: [],
  isOpen: false,
  loading: false,
  didJustAddToCart: false,
  client: client,
  checkout: null,
  addVariantToCart: function (variantId: any, quantity: any): void {
    // console.log(`variantId: ${variantId}, quantitiy: ${quantity}`);
  },
  removeLineItem: function (checkoutID: any, lineItemID: any): void {
    // console.log(`checkoutID: ${checkoutID}, lineItemId: ${lineItemID}`);
  },
  updateLineItem: function (
    checkoutID: any,
    lineItemID: any,
    quantity: any
  ): void {
    // console.log(
    //   `checkoutID : ${checkoutID}, lineItemID: ${lineItemID}, quantity: ${quantity}`
    // );
  },
};

export const StoreContext = React.createContext(defaultValues);

const isBrowser = typeof window !== 'undefined';
const localStorageKey = `shopify_checkout_id`;

export const StoreProvider = (props: { children: React.ReactNode }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout);
  const [loading, setLoading] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id);
    }

    setCheckout(checkout);
  };

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          );
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);

  const addVariantToCart = (variantId: string, quantity: number) => {
    setLoading(true);

    const checkoutID = checkout.id;

    const lineItemsToUpdate: ShopifyBuy.LineItemToAdd[] = [
      {
        variantId,
        quantity,
      },
    ];

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
        setDidJustAddToCart(true);
        setTimeout(() => setDidJustAddToCart(false), 3000);
      });
  };

  const removeLineItem = (checkoutID: string | number, lineItemID: string) => {
    setLoading(true);

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  const updateLineItem = (
    checkoutID: string | number,
    lineItemID: any,
    quantity: string
  ) => {
    setLoading(true);

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ];

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
