import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isValueValid } from "../../utils/isValueValid";
import createRemoveGoodsAction, {
  Remove,
} from "../../redux/actions/createRemoveGoodsAction";
import createUpdateItemAction, {
  Update,
} from "../../redux/actions/createUpdateItemAction";
import "./GoodsItem.scss";

type GoodsItemPrors = { caption: string; amount: string; id: number };

export const GoodsItem: React.FC<GoodsItemPrors> = ({
  caption,
  amount,
  id,
}) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [captionText, setCaptionText] = useState<string>(caption);
  const [amountValue, setAmountValue] = useState<string>(amount);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    const itemId: Remove = { id };

    dispatch(createRemoveGoodsAction(itemId));
  };

  const editHandler = () => {
    setEditMode(!isEditMode);

    const updatedItem: Update = {
      id,
      caption: captionText,
      amount: amountValue,
    };

    if (isEditMode) {
      dispatch(createUpdateItemAction(updatedItem));
    }
  };

  const changeHandler = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    if (isValueValid({ value, name })) {
      name === "caption" ? setCaptionText(value) : setAmountValue(value);
    }
  };

  return (
    <li className="goods-item">
      <div className="goods-item__caption">
        {isEditMode ? (
          <input
            type="text"
            onChange={changeHandler}
            value={captionText}
            className="goods-item__input"
            name="caption"
          />
        ) : (
          <span>{captionText.trim()}</span>
        )}
      </div>
      <div className="goods-item__amount">
        {isEditMode ? (
          <input
            type="number"
            onChange={changeHandler}
            value={amountValue}
            className="goods-item__input"
            name="amount"
          />
        ) : (
          <span>x{amountValue}</span>
        )}
      </div>
      <div className="goods-item__controls">
        <button className="goods-item__button" onClick={editHandler}>
          {isEditMode ? "Save" : "Edit"}
        </button>
        <button className="goods-item__button" onClick={deleteHandler}>
          X
        </button>
      </div>
    </li>
  );
};
