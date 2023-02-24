import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setLoading(false);
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    if (
      pics.type === "image/jpg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg"
    ) {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", "inno-talks");
      formData.append("cloud_name", "dbtmpjsd6");
      fetch("https://api.cloudinary.com/v1_1/dbtmpjsd6/image/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      return navigate("/chats", { replace: true });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          type="name"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email2" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password2" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          value={confirmpassword}
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
