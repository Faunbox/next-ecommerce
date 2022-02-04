import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [loading, setloading] = useState(false);
  useEffect(() => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      placeholder={"Treść posta"}
      toolbar={{
        image: {
          uploadEnabled: true,
          previewImage: true,
          uploadCallback: async () => await console.log("tak"),
        },
      }}
    />
  );
};

export default TextEditor;
