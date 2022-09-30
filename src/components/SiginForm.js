import React, { useState, useEffect ,useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {  useNavigate, Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather';
import { eyeOff } from 'react-icons-kit/feather';
import { LoginUser } from './AuthService';
import { AuthContext } from './context/AuthContext';


const SiginForm = () =>{

  const { register, handleSubmit, formState: {errors} } = useForm();
    const [userEmail, setUserEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [icon, setIcon]=useState(eyeOff);
    const {setAuthUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const errRef = useRef();
    const userRef = useRef();  
   
    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setErrorMessage('');
    }, [userEmail, pwd]);

    const onError = (error) => {
        console.log("ERROR:::", error);
      };

     const onSubmit = async (credentials) => {
        console.log("credentials:::", JSON.stringify(credentials));  
        try {
          const response = await LoginUser(credentials);
          console.log("response",response);
         if(response.token){
            setAuthUser(response);
            navigate("/dashboard" );
          }
          console.log("After Navigate");
        } catch (error) {
          console.error('error in response', error);
          setAuthUser('');
          setErrorMessage("LOGIN FAILED: Invalid user");
        }
        }

   const handleToggle=()=>{    
    setShowPassword(!showPassword);
    showPassword? setIcon(eye) : setIcon(eyeOff)

        } 
  return (
    
    <>
      <Container> 
      <Row>
                    <Col lg={12} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg register">
                        <Form className='rounded5' onSubmit={handleSubmit(onSubmit, onError)} data-testid="siginin">
                        <Row >
                        <Col className='logo'></Col> 
                        </Row>
                        <Row >
                        <Col  ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage} </Col> 
                        </Row>
                        <Row >
                        <Col className='header'> Sigin In </Col> 
                        </Row>
                        <Row >
                            <Col>
                            <Form.Group className="mb-3 text-input" controlId="formEmail" ref={userRef}>
     
                                <Form.Control 
                                type="text"
                                 placeholder="Email"
                                 onChange={e => setUserEmail( e.target.value )}        
                                 
                                  {...register("email",
                                            { required: "email is required",
                                              pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                                              message:"Not valid email" }
                                            }
                                            )} />
                                {errors.email && (
                                        <Form.Text className="text-danger">
                                        {errors.email.message}
                                        </Form.Text>
                    
                                )}    
                                
                            </Form.Group>
                            <Form.Group  className="mb-3 text-input" controlId="formBasicPassword">
                              <InputGroup className="mb-3">
                              
                              <Form.Control type={showPassword ? "text" : "password"}  placeholder="password" onChange={e => setPwd( e.target.value )} 
                                 {...register("password", { 
                                 required:"password is required",
                                 minLength:{value:6, message:"password must be atleast 6 long" },
                                 pattern: {value: /^(?=.*?[0-9])(?=.*[A-Z]).{6,}$/, message: "The password must contain atleast 1 upper case letter, 1 digit." }
                                 })
                                }
                                /> 
                                 <InputGroup.Text id="basic-addon" onClick={handleToggle}><Icon icon={icon} size={12} className="Icon" /></InputGroup.Text>                              
                                  </InputGroup>                            
                               
                                {errors.password && (
                                        <Form.Text className="text-danger">
                                        {errors.password.message}
                                        </Form.Text>
                                )} 
                            </Form.Group>       
                            
                            </Col>
                        </Row> 

                        <Row>
                        <Col lg={12} md={6} sm={12} className='forgotPassword'><span>Forgot Password ?</span></Col> 
                        </Row>   
                        <Row>
                        <Col lg={12} md={6} sm={12}>
                        <Button  data-testid='submitbtn' className='button' type="submit">
                                Sign In
                            </Button>
                          </Col> 
                          </Row>                       

                            <Row>
                              <Col className='newUserLabel'> Are you a new User?<Link to='/signup'> signup </Link> </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
      </Container>
    </>
  )
}

export default SiginForm;
