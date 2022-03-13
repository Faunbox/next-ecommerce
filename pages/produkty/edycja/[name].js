import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import db from "../../../db/db";
import Image from "next/image";
import Product from "../../../models/Product";

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
          countInStock,
          description,
          slug,
        }),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .then(() => setDataFetching(false))
        .catch((err) => new Error("Editing wasnt correct. Try again", err));
    }

    // .finally(() => router.push("/"));
  };

  return (
    <Container>
      <Form as={Row}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szprej"
            onChange={(e) => setName(e.target.value)}
            value={!name ? product.name : name}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szpreje"
            onChange={(e) => setCategory(e.target.value)}
            value={!category ? product.category : category}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Producent</Form.Label>
          <Form.Control
            type="text"
            placeholder="Djupą"
            onChange={(e) => setProducent(e.target.value)}
            value={!brand ? product.brand : brand}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Avaible quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="50000"
            onChange={(e) => setInStock(e.target.value)}
            value={!countInStock ? product.countInStock : countInStock}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szuper szprej, polecam"
            onChange={(e) => setDescription(e.target.value)}
            value={!description ? product.description : description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            placeholder="szuper-szprej"
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            value={!slug ? product.slug : slug}
          />
        </Form.Group>

        <Image src={product.image.url} alt={name} width={200} height={200} />
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.png"
            onChange={(e) => {
              setImageToUpload(e.target.files);
            }}
          />
        </Form.Group>
        {/* TODO: zrobic upload screen */}
        {dataFetching && <div>Editing...</div>}
        <Button variant="primary" onClick={() => editProduct()}>
          Edit product
        </Button>
      </Form>
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
