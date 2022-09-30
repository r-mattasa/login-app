import React , {useContext,useState,useRef,useEffect} from 'react';
import  { AuthContext}  from './context/AuthContext';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Signup } from './AuthService';
import {  useNavigate, Link } from 'react-router-dom';



const SignupForm = () => {

  const { authUser, setAuthUser } = useContext(AuthContext);
  const { register, getValues,handleSubmit, formState: {errors} } = useForm();
    const [userEmail, setUserEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const errRef = useRef();
    const userRef = useRef();
    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setErrorMessage('');
    }, [userEmail, pwd]);

  const onSubmit = async (credentials) => {
        console.log("credentials:::", JSON.stringify(credentials));  
        try {
          const response = await Signup(credentials);
          console.log("response",response);

         if(response){
            setAuthUser(response);
            console.log("Authuser inside signup",authUser);
            navigate("/dashboard" );
          }          
        
        } catch (error) {
          console.error('error in response', error);
          setAuthUser('');
          setErrorMessage("Registration FAILED");
        }
        //loginUser(credentials);
        }

      const onError = (error) => {
        console.log("ERROR in form:::", error);
      };
      
      

    return (
    <>
      <Container> 
      <Row>
                    <Col lg={12} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg register">
                
                        <Form className='rounded5' onSubmit={handleSubmit(onSubmit, onError)}>
                        <Row >
                        <Col className='logo'></Col> 
                        </Row>
                        <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                        <Row >
                        <Col className='header'> Sign Up </Col> 
                        </Row>
                        <Row>
                          <Col className='newUserLabel'> Already Registered? <Link to='/'> signIn </Link> </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-3 text-input" controlId="formBasicEmail" ref={userRef}>
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
                            <Form.Group  className="mb-3 text-input" controlId="password">
                                <Form.Control type="password"  placeholder="password" onChange={e => setPwd( e.target.value )} 
                                 {...register("password",{ 
                                 required:"password is required",
                                 minLength:{value:6, message:"password must be atleast 6 long" },
                                 pattern: {value: /^(?=.*?[0-9])(?=.*[A-Z]).{6,}$/, message: "The password must contain atleast 1 upper case letter, 1 digit." }      
                                 })
                                }
                                 />
                                {errors.password && (
                                        <Form.Text className="text-danger">
                                        {errors.password.message}
                                        </Form.Text>
                                )} 
                            </Form.Group>

                            <Form.Group  className="mb-3 text-input" controlId="CPassword">
                                <Form.Control type="password"  placeholder="RepeatPassword" 
                                 {...register("cpassword", { validate: (value) => {
                                  const { password } = getValues();
                                  return password === value || "Passwords should match!";
                                 }
                                })
                              }
                                 />
                                {errors.cpassword && (
                                        <Form.Text className="text-danger">
                                        {errors.cpassword.message}
                                        </Form.Text>
                                )} 
                            </Form.Group>
                            </Col>
                        </Row>

                          <Row>
                            <Col>
                             <Button  className='button' type="submit">
                                Sign Up
                            </Button>
                            </Col>
                          </Row>
                          
                        <Row>
                        <Col lg={5} md={6} sm={12} className='newUserLabel'><span>By registering i accept the terms of confidentiality aggreement</span></Col> 
                        </Row>
                      
                            
                        </Form>
                    </Col>
                </Row>
      </Container>
    </>
  )

}

export default SignupForm
