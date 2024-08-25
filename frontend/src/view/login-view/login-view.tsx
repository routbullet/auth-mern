import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  min-width: 40vw;
  border-radius: 25px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px;
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 28px;
  color: #4a4a4a;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #6e8efb;
    outline: none;
    box-shadow: 0 0 5px rgba(110, 142, 251, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background-color: #6e8efb;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #4a69bd;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.div`
  margin-top: 25px;
  text-align: center;
`;

const FooterText = styled.h6`
  font-size: 14px;
  color: #787878;
`;

const StyledLink = styled(Link)`
  color: #6e8efb;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const tokenData = await response.json();
        Cookies.set("jwtToken", tokenData?.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        navigate("/user-view");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("An error occurred:", err);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Heading>Welcome Back!</Heading>

        <Form onSubmit={handleSubmit}>
          {/* <Form action="http://localhost:8000/login" method="POST" > */}
          <FormGroup>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <Input type="text" name="username" id="username" required />
          </FormGroup>
          <FormGroup>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <Input type="password" name="password" id="password" required />
          </FormGroup>
          <Button type="submit">Log In</Button>
        </Form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Footer>
          <FooterText>
            Don't have an account?{" "}
            <StyledLink to="/registration">Register</StyledLink>
          </FooterText>
        </Footer>
      </FormWrapper>
    </Container>
  );
};
