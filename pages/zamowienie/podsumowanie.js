import { useEffect, useState } from "react";
import { useCard, ACTION } from "../../context/card.context";

const FinishingOrder = () => {
  const { state, dispatch } = useCard();
  const [session, setSession] = useState();

  const getInfoAboutPayment = async () => {
    const session = await fetch("/api/details", {
      method: "POST",
      body: JSON.stringify(state.checkout.id),
    });
    const sessionData = await session.json();
    console.log("sessionData", sessionData);
    dispatch({
      type: ACTION.SET_STRIPE_PUCHARSED_ITEMS,
      payload: sessionData.items,
    });
    setSession(JSON.stringify(sessionData.sessionDetails.shipping.address));
  };

  useEffect(() => {
    getInfoAboutPayment();
  }, []);

  return (
    <>
      <div>
        <h1>Twoje dane do wysyłki</h1>
        {session}
      </div>
      <div>
        <h1>Twoje zakupy</h1>
        {/* {state.checkout.pucharsedItems.map((item) => {
          <div key={item.id}>{item.name}</div>;
        })} */}
      </div>
    </>
  );
};

export default FinishingOrder;
