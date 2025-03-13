import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { postSignIn } from '@/shared/auth';
import { useRouter } from 'next/router';

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const router = useRouter() 
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    try {
      setIsLoading(true);
      const response = await postSignIn(loginData);
      console.log(loginData);
      if (response.data.accessToken) {
        localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
        console.log("Login Success");
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("로그인에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <LoginSection 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    > 
      <LoginContainer 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.5 }} 
      > 
        <Title>Welcome Back</Title> 
        <Subtitle>Please login to continue</Subtitle>
        <LoginForm onSubmit={handleSubmit}> 
          <FormGroup> 
            <Label>ID</Label> 
            <Input 
              type="text" 
              placeholder="Enter your ID" 
              value={loginData.username} 
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} 
              required 
            /> 
          </FormGroup>
          <FormGroup> 
            <Label>Password</Label> 
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={loginData.password} 
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} 
              required 
            /> 
          </FormGroup>
          <StyledMotionButton 
            type="submit" 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
          > 
            Login 
          </StyledMotionButton> 
        </LoginForm> 
      </LoginContainer> 
    </LoginSection> 
  ); 
};

const LoginSection = styled(motion.section)`
  min-height: 100vh;   
  display: flex;   
  align-items: center;   
  justify-content: center;   
  padding: 20px;   
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);   
  box-sizing: border-box;
`;

const LoginContainer = styled(motion.div)`
  background: white;   
  padding: 40px;   
  border-radius: 20px;   
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);   
  width: 100%;   
  max-width: 400px;   
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;   
  font-weight: 700;   
  margin-bottom: 10px;   
  text-align: center;   
  background: linear-gradient(to right, #007bff, #00ff88);   
  -webkit-background-clip: text;   
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #666;   
  text-align: center;   
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
  display: flex;   
  flex-direction: column;   
  gap: 20px;
`;

const FormGroup = styled.div`
  position: relative;   
  width: 100%;   
  margin-bottom: 5px;
`;

const Label = styled.label`
  display: block;   
  margin-bottom: 8px;   
  color: #333;   
  font-weight: 500;   
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%; padding: 12px 15px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 1rem; transition: all 0.3s ease; background: #ffffff; box-sizing: border-box;
  &:focus { border-color: #007bff; box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1); outline: none; }
  &::placeholder { color: #aaa; } 
`;

const StyledMotionButton = styled(motion.button)`
  padding: 15px; 
  background: linear-gradient(135deg, #007bff, #00ff88); 
  color: white; 
  border: none; 
  border-radius: 8px; 
  font-size: 1rem; 
  font-weight: 600; 
  cursor: pointer; 
  margin-top: 20px; 
  transition: all 0.3s ease; 
  text-decoration: none;
  text-align: center;
  
  &:hover { 
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3); 
    transform: translateY(-1px); 
  } 
  &:active { 
    transform: translateY(1px); 
  } 
`;

export default Login;
