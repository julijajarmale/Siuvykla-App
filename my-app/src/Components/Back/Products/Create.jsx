import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import getBase64 from "../../../Functions/getBase64";

import BackContext from "../BackContext";


function Create() {
 
const {setCreateProducts} = useContext(BackContext)

const [type, setType] = useState("");
const [color, setColor] = useState("");
const [hexColor, setHexColor] = useState("#000000");
const [price, setPrice] = useState("");

const fileInput = useRef();
  const [picture, setPicture] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(picture => setPicture(picture))
    .catch(_ => {
        // tylim
    })
  }
const handleCreate = () => {
    const data = { 
      type, 
      picture: picture,
      color,
      hexColor,
      price: parseFloat(price),
     };
    setCreateProducts(data);
    setType("");
    setPicture(null);
    setColor("");
    setHexColor("#000000");
    setPrice("");
   
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Add new product</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter product type"
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
              />
            </div>
            <div className="form-row">
              <input
                type="color"
                className="input"
                placeholder="Enter Color"
                onChange={(e) => setHexColor(e.target.value)}
                value={hexColor}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div className="form-row">
                    <label>Upload Product Picture</label>
                    <input ref={fileInput} type="file" className="input" onChange={doPhoto}/>
                </div>
                {
                    picture ? <div className="photo-bin"><img src={picture} alt="nice"/></div> : null
                }
            <button
              type="button"
              className="btn"
              onClick={handleCreate}
            >
              Create
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Create;