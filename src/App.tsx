import { ChangeEvent, FormEventHandler, useState } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { GoodsItem } from "./components/GoodsItem/GoodsItem";
import { isValueValid } from "./utils/isValueValid";
import createAddGoodsAction, {
  AddGoods,
} from "./redux/actions/createAddGoodsAction";
import "./App.scss";

type Store = [
  {
    id: number;
    caption: string;
    amount: string;
  }
];

export const App = () => {
  const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;
  const [captionValue, setCaptionValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const goods = useTypedSelector((state) => state);
  const dispatch = useDispatch();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newGoods: AddGoods = {
      id: Date.now(),
      caption: captionValue,
      amount: amountValue,
    };

    dispatch(createAddGoodsAction(newGoods));
  };

  const changeHander = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (isValueValid({ value, name })) {
      name === "caption" ? setCaptionValue(value) : setAmountValue(value);
    }
  };

  return (
    <div className="app">
      <form className="form" onSubmit={submitHandler}>
        <div className="input-holder">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            value={captionValue}
            onChange={changeHander}
            name="caption"
            required
          />
        </div>
        <div className="input-holder">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amountValue}
            onChange={changeHander}
            name="amount"
            required
          />
        </div>
        <button className="add-button">Add</button>
      </form>
      <ul className="goods-list">
        {goods.map(({ caption, amount, id }) => (
          <GoodsItem caption={caption} amount={amount} id={id} key={id} />
        ))}
      </ul>
    </div>
  );
};
