import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import Cookies from "js-cookie";

const TextEditor = ({ value }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [loading, setloading] = useState(true);

  const imageUpload = async (file) => {
    const formData = new FormData();
    //set image data
    formData.append("file", file);
    formData.append("upload_preset", "blog_images");
    formData.append("max_width", 500);
    formData.append("max_height", 500);

    //send to cloudinary
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/faunbox/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    //get url response
    const imageData = await response.json();
    const image = {
      data: { link: imageData.secure_url },
    };
    return image;
  };

  const setCookie = (body) => {
    Cookies.set("blog_post", body);
  };

  const getCookie = Cookies.get("blog_post");

  useEffect(() => {
    setloading(false);
  }, []);
  useEffect(() => {
    setCookie(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);
  return !loading ? (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      placeholder={"Treść posta"}
      toolbar={{
        image: {
          uploadEnabled: true,
          previewImage: true,
          uploadCallback: async (event) => await imageUpload(event),
          alt: { present: true, mendatory: true },
        },
      }}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default TextEditor;
