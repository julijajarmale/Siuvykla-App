import { useEffect, useState, useContext, useRef } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalProduct, setEditProduct, setModalProduct } =
    useContext(BackContext);

  const [type, setType] = useState("");
  const fileInput = useRef();
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [hexColor, setHexColor] = useState("");

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((picture) => setPicture(picture))
      .catch((_) => {
        // tylim
      });
  };

  useEffect(() => {
    if (null === modalProduct) {
      return;
    }

    setType(modalProduct.type);
    setPicture(modalProduct.picture);
    setPrice(modalProduct.price);
    setColor(modalProduct.color);
    setHexColor(modalProduct.hexcolor);
  }, [modalProduct]);

  const handleEdit = () => {
    console.log("suveike");
    const data = {
      type,
      picture: picture,
      price: parseFloat(price),
      color,
      hexColor,
      
      id: modalProduct.id,
    };

    setEditProduct(data);
    setModalProduct(null);
  }

  if (null === modalProduct) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Edit Municipality Information</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalProduct(null)}
        ></button>
      </div>
      <div className="modal-body">
        <div className="form-row">
          <label>Update Name</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </div>
        
        <div className="form-row">
          <label>Update price</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

         
        <div className="form-row">
          <label>Update color</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
        </div>

        <div className="form-row">
          <label>Update Hexcolor</label>
          <input
            type="color"
            className="input"
            onChange={(e) => setHexColor(e.target.value)}
            value={hexColor}
          />
        </div>
        <div className="form-row">
          <label>Add new Picture</label>
          <input
            ref={fileInput}
            type="file"
            className="input"
            onChange={doPhoto}
          />
        </div>
        <div>
          {picture ? (
            <div className="herbas">
              <img src={picture} alt="nice" />
            </div>
          ) : null}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn2"
            onClick={() => setModalProduct(null)}
          >
            Close
          </button>
          <button type="button" className="btn btn3" onClick={handleEdit}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
