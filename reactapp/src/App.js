import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {Navbar, Alert, NavbarBrand} from "reactstrap";
import {MDBContainer, MDBNavbar, MDBNavbarBrand} from "mdb-react-ui-kit";
// import image from "./stability-ai-stable-diffusion_orig.png"

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (

    <ChakraProvider>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img
              src={require("./stability-ai-stable-diffusion_orig.png")}
              style={{height:"50px", width:"50px",}}
              loading='lazy'
            />
      <h2
      style={{marginTop: "-2.7rem",
    marginLeft: "4rem"}}>Stable Diffusion App</h2>
    </a>
  </div>
</nav>
        <Alert color="dark" style={{display:"flex", maxWidth:"80%", marginLeft:"10%", marginTop:"3%", marginBottom:"3%"}}><h4>This react application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model.</h4>
        </Alert>

        <Wrap marginBottom={"10px"} style={{marginLeft:"30%"}}>
            <div className="input-group">
              <div className="form-outline">
                <input
                style={{
                  width:"30rem",
                  height:"3rem",
                  color:"grey"
                }}
                    value={prompt}
                onChange={(e) => updatePrompt(e.target.value)}
                width={"350px"} className="form-control"/>
              </div>
              <button
                  style={{width:"10rem"}}
                  type="button" onClick={(e) => generate(prompt)} className="btn btn-primary">
                Generate
              </button>
            </div>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
              <div style={{display:"flex", marginLeft:"27%", padding:"4%"}}>
                <img
                    src={`data:image/png;base64,${image}`}
                    className="img-fluid rounded"
                    alt="Townhouses and Skyscrapers"
                />
              </div>
        ) : null}

    </ChakraProvider>
  );
};

export default App;