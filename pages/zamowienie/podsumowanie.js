// import dynamic from "next/dynamic";
import { useEffect } from "react";

const FinishingOrder = () => {
  const getDataFromWebhook = async () => {
    const req = await fetch("/api/stripe-webhook", { method: "GET" });
    const data = await req.json();
    console.log("dane z webhooka", data);
  };

  useEffect(() => {
    getDataFromWebhook();
  }, []);

  return <p>gitara</p>;
};

export default FinishingOrder;

// export async function getStaticProps(req, res) {

// }
