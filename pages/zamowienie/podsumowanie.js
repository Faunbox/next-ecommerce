import { useEffect } from "react";

const FinishingOrder = () => {
  const getDataFromWebhook = async () => {
    const req = await fetch("/api/stripe-webhook", { method: "POST" });
    const data = await req.json();
    console.log("dane z webhooka", data);
  };

  useEffect(() => {
    getDataFromWebhook();
    return getDataFromWebhook;
  }, []);

  return <p>gitara</p>;
};

export default dynamic(async () => FinishingOrder, { ssr: false });
