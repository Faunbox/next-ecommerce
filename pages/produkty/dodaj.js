import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

//getting signature for authorized image upload
export const getCloudinarySignature = async () => {
  const response = await fetch("/api/products/cloud");
  const data = await response.json();
  const { signature, timestamp, api } = data;
  return { signature, timestamp, api };
};

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]); //był pusty string
  const [price, setPrice] = useState("");
  const [brand, setProducent] = useState("");
  const [countInStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState(" ");
  const [imageToUpload, setImageToUpload] = useState("");
  const [dataFetching, setDataFetching] = useState(false);

  const router = useRouter();

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

  const addProductToShop = async () => {
    setDataFetching(true);
    const { url, imageID } = await sendImageToCloudinary();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        url,
        imageID,
        price,
        brand,
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
            "There was some issue while adding item to database. Error message ->",
            err
          )
      )
      .finally(() => router.push("/"));
  };

  return (
    <Container justify="center">
      <Card>
        <Card.Header>
          <Text h4>Add new product</Text>
        </Card.Header>
        <Card.Body controlId="formBasicEmail">
          <Grid.Container justify="center" gap={2}>
            <Grid>
              <Input
                type="text"
                label="Item name"
                placeholder="Szprej"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Category"
                placeholder="Szpreje"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="number"
                placeholder="400"
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Producent"
                placeholder="Djupą"
                onChange={(e) => setProducent(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Avaible quantity"
                placeholder="50000"
                onChange={(e) => setInStock(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Slug"
                placeholder="szuper-szprej"
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                label="Description"
                as="textarea"
                placeholder="Szuper szprej, polecam"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid>
              <Input
                type="file"
                label="Image"
                accept=".jpg,.png"
                onChange={(e) => {
                  setImageToUpload(e.target.files);
                }}
              />
            </Grid>
          </Grid.Container>
          <Container display="flex" justify="center" alignItems="center">
            <Button variant="primary" onClick={() => addProductToShop()}>
              Add to store
            </Button>
            <Spacer y={1} />
            {dataFetching && <div>Adding to database...</div>}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
