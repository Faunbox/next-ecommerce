import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import db from "../../../db/db";
import Image from "next/image";
import Product from "../../../models/Product";
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
  Switch,
  Text,
} from "@nextui-org/react";

//getting signature for authorized image upload
export const getCloudinarySignature = async () => {
  const response = await fetch("/api/products/cloud");
  const data = await response.json();
  const { signature, timestamp, api } = data;
  return { signature, timestamp, api };
};

const AddProduct = ({ product }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setProducent] = useState("");
  const [countInStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState(" ");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");
  const [dataFetching, setDataFetching] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setName(product.name);
    setCategory(product.category);
    setProducent(product.brand);
    setInStock(product.count);
    setDescription(product.description);
    setSlug(product.slug);
    setImage(product.image.url);
    setPrice(product.price);
  }, []);

  const sendImageToCloudinary = async () => {
    const { signature, timestamp, api } = await getCloudinarySignature();
    const formData = new FormData();
    formData.append("file", imageToUpload[0]);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", api);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/faunbox/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const imageData = await response.json();

    return { url: imageData.secure_url, imageID: imageData.public_id };
  };

  const editProduct = async () => {
    setDataFetching(true);
    const id = product._id;
    if (imageToUpload) {
      const oldImageID = product.image.imageID;
      const productID = product.stripe.productID;
      const { url, imageID } = await sendImageToCloudinary();

      await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          id,
          brand,
          url,
          imageID,
          oldImageID,
          productID,
          countInStock,
          description,
          slug,
        }),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .then(() => setDataFetching(false))
        .catch(
          (err) =>
            new Error(
              "There was some issue when editing product. Error message -> ",
              err
            )
        )
        .finally(router.back());
    } else {
      await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          id,
          brand,
          price,
          countInStock,
          description,
          slug,
        }),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .then(() => setDataFetching(false))
        .catch((err) => new Error("Editing wasnt correct. Try again", err))
        .finally(() => router.push("/store"));
    }
  };

  return (
    <Container>
      <Card bordered="true">
        <Card.Header>
          <Text h3>Edit product</Text>
        </Card.Header>
        <Card.Body>
          <Grid.Container justify="center" gap={2}>
            <Grid>
              <Input
                type="text"
                placeholder="Szprej"
                label="Product name"
                onChange={(e) => setName(e.target.value)}
                value={!name ? product.name : name}
              />
            </Grid>

            <Grid>
              <Input
                type="text"
                placeholder="Szpreje"
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                value={!category ? product.category : category}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Producent"
                placeholder="Djupą"
                onChange={(e) => setProducent(e.target.value)}
                value={!brand ? product.brand : brand}
              />
            </Grid>
            <Grid>
              <Input
                type="number"
                placeholder="Actual price"
                label="New price"
                labelRight="PLN"
                onChange={(e) => setPrice(e.target.value)}
                value={!price ? product.price : price}
              />
            </Grid>
            <Grid>
              <Input
                type="number"
                placeholder="50000"
                label="Avaible quantity"
                onChange={(e) => setInStock(e.target.value)}
                value={!countInStock ? product.countInStock : countInStock}
              />
            </Grid>
            <Grid>
              <Input
                as={"textarea"}
                type="text"
                label="Description"
                placeholder="Szuper szprej, polecam"
                onChange={(e) => setDescription(e.target.value)}
                value={!description ? product.description : description}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Slug"
                placeholder="szuper-szprej"
                labelLeft="https://shop.com/"
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                value={!slug ? product.slug : slug}
              />
            </Grid>
            <Grid>
              <Container display="flex" justify="center">
                <Image
                  src={product?.image?.url}
                  alt={name}
                  width={200}
                  height={200}
                />
                {/* </Grid>
            <Grid> */}
                <Input
                  type="file"
                  label="Image"
                  accept=".jpg,.png"
                  onChange={(e) => {
                    setImageToUpload(e.target.files);
                  }}
                />
              </Container>
            </Grid>
            {/* TODO: zrobic upload screen */}
          </Grid.Container>
          <Container display="flex" justify="center" alignItems="center">
            {dataFetching && <div>Editing...</div>}
            <Button variant="primary" onClick={() => editProduct()}>
              Edit product
            </Button>
            <Spacer y={1} />
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.name;

  await db.connect();
  const data = JSON.stringify(await Product.findOne({ slug: slug }));
  await db.disconnect();
  const product = JSON.parse(data);

  return {
    props: {
      product,
    },
  };
}
