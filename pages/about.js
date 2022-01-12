import { useEffect } from "react";

const About = () => {
  const stripeData = async () => {
    const req = await fetch("./api/stripe-webhook");
    const data = await req.json();
    console.log(data);
  };

  useEffect(() => {
    stripeData();
    return stripeData();
  }, []);

  return <div>About</div>;
};

export default About;
