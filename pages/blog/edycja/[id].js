import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Cookies from "js-cookie";
import db from "../../../db/db";
import Post from "../../../models/Post";

const EditPost = ({ post }) => {
  const router = useRouter();
  const { header, body, categorys, _id } = post;

  const Editor = useMemo(() => {
    return dynamic(() => import("../../../components/TextEditor"), {
      ssr: false,
    });
  }, []);

  const addPostHandler = async () => {
    const body = Cookies.get("blog_post");
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        header,
        categorys,
        body,
      }),
    })
      .then((data) => data.json())
      .then((response) => alert(response.message))
      .then(Cookies.remove("blog_post"))
      .catch(
        (err) => new Error({ message: "Błąd podczas dodawania posta" }, err)
      )
      .finally(() => router.push("/blog"));
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nagłówek</Form.Label>
          <Form.Control
            type="text"
            value={header}
            placeholder="Nagłówek nowego postu"
            onChange={(e) => setHeader(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Kategorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="IT, Programowanie"
            value={categorys}
            multiple
            onChange={(e) => setCategorys(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Post</Form.Label>
          <Editor value={body} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>

        <Button variant="primary" onClick={() => addPostHandler()}>
          Wyślij
        </Button>
      </Form>
    </Container>
  );
};
export default EditPost;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  await db.connect();
  const data = JSON.stringify(await Post.findOne({ _id: id }));
  await db.disconnect();
  const post = JSON.parse(data);
  return {
    props: {
      post,
    },
  };
}
