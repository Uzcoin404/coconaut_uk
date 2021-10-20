import * as React from 'react';
import { LineItem } from 'shopify-buy';
import { Quantity } from '@components/Shop/Quantity';
import { Subheadline } from '@components/Global';

interface lineItemProps {
  item: LineItem;
}

export const LineProduct = ({ item }: lineItemProps) => {
  const [quantity, setQuantity] = React.useState(item.quantity);
  console.log(item);

  return (
    <tr>
      <td>
        <Subheadline>{item.title}</Subheadline>
      </td>
      <td> {item.price}</td>
      <td>
        <Quantity value={quantity} setValue={setQuantity} />
      </td>
      <td>
        {item.quantity} * {item.price}
      </td>
    </tr>
  );
};
