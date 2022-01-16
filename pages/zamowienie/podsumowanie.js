import { useEffect } from "react";
import { useCard, ACTION } from "../../context/card.context";

const FinishingOrder = () => {
  const { state, dispatch } = useCard();

  const getInfoAboutPayment = async () => {
    console.log(state.checkout);
    const session = await fetch("/api/details", {
      method: "POST",
      body: state.checkout.id,
    });
    const sessionData = await session.json();
    console.log("sessionData", sessionData);
    dispatch({
      type: ACTION.SET_STRIPE_PUCHARSED_ITEMS,
      payload: sessionData.items,
    });
    console.log("podsumowanie state", state.checkout);
  };

  useEffect(() => {
    return getInfoAboutPayment();
  });

  return <p>gitara</p>;
};

export default FinishingOrder;
