import * as React from 'react';
import { debounce } from 'lodash';
import { LineItem } from 'shopify-buy';
import { Quantity } from '@components/Shop/Quantity';
import { Subheadline, Typography } from '@components/Global';
import { StoreContext } from '@context/StoreContext';

interface lineItemProps {
  item: LineItem;
}

export const LineProduct = ({ item }: lineItemProps) => {
  const { checkout, removeLineItem, updateLineItem } =
    React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(item.quantity);

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  );
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), []);

  React.useEffect(() => debouncedUli(quantity), [quantity]);

  return (
    <tr>
      <td>
        <Subheadline>{item.title}</Subheadline>
        <Typography>{item.variant.price.amount}</Typography>
        <Quantity id={item.title} value={quantity} setValue={setQuantity} />
        <a onClick={handleRemove}>
          <Typography>remove</Typography>
        </a>
      </td>

      <td>
        <Typography>
          £&nbsp;{(item.quantity * item.variant.price.amount).toFixed(2)}
        </Typography>
      </td>
    </tr>
  );
};
