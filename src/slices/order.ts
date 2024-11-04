import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//객체에 대한 타입핑
export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

interface InitialState {
  orders: Order[]; //odrers는 위에 Order[]의 배열임
  deliveries: Order[];
}
const initialState: InitialState = {
  orders: [], //오더 저장 -> acceptOrder,rejectOrder(취소시 배열에서 빠짐)
  deliveries: [],
};
const orderSlice = createSlice({
  name: 'order',
  initialState, //초기 상태
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId == action.payload);
      if (index > -1) {
        //initialState의 orders의 인덱스 값이 -1보다 크면 값이 존재하겠지요?
        state.deliveries.push(state.orders[index]); //deliveries에 추가하고,
        state.orders.splice(index, 1); //orders 배열에서 빼주기
      }
    },
    rejectOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId == action.payload);
      if (index > -1) {
        state.orders.splice(index, 1);
      }
      const delivery = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );
      if (delivery > -1) {
        state.deliveries.splice(delivery, 1);
      }
    },
  },
  extraReducers: builder => {},
});
export default orderSlice;
