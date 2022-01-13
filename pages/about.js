import { useEffect } from "react";

const About = () => {

const env = process.env.NODE_ENV

  const stripeData = async () => {
    const req = await fetch("./api/stripe-webhook");
    const data = await req.json();
    console.log(data);
  };

  useEffect(() => {
    stripeData();
    return stripeData();
  }, []);

  return <div>About, env: {env}</div>;
};

export default About;
