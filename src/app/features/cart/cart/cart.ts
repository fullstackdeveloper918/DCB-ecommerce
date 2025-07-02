import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
 cartItems = [
    {
      name: 'TDW Hand Mixer Easy Mix',
      description: '260 Watt Motor | 7 Speed | Handheld',
      image: 'https://media.istockphoto.com/id/2195461294/photo/laptop-with-an-empty-blank-screen-cgi-render.jpg?s=1024x1024&w=is&k=20&c=_Mjfbm7HjFOPxJ6J4TPFsU8VvokDCnmw3LXWkH8YZoU=',
      price: 499,
      quantity: 1,
    },
    {
      name: 'Electric Kettle',
      description: '1.5L | Auto Shut Off',
      image: 'https://media.istockphoto.com/id/2195461294/photo/laptop-with-an-empty-blank-screen-cgi-render.jpg?s=1024x1024&w=is&k=20&c=_Mjfbm7HjFOPxJ6J4TPFsU8VvokDCnmw3LXWkH8YZoU=',
      price: 799,
      quantity: 2,
    },
  ];

  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  increaseQty(item: any) {
    item.quantity++;
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }
}
