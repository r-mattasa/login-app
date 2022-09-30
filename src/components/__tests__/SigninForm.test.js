import {render,screen,cleanup, getByTestId} from '@testing-library/react';
import SiginForm from '../SiginForm';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Dashboard from '../SiginForm';

describe("Login", () => {

    test('test',() =>{
        expect(true).toBe(true);
    })

    test("Validate email - Email input field should accept email",()=>{
        render(<Router>
            <SiginForm />
        </Router>)
        const email = screen.getByPlaceholderText("Email");
        userEvent.type(email,"vapa")
        expect(email.value).not.toMatch("vapa@gmail.com");
    })

   test("Validate Password - password input type should have a type password",()=>{
        render(<Router>
            <SiginForm />
        </Router>)
        const pass = screen.getByPlaceholderText('password');
        expect(pass).toHaveAttribute("type","password");
    })


    test("Verify Successful login",()=>{
        render(<Router>
            <SiginForm />
            <Dashboard />
        </Router>)
        const submitButton = screen.getByTestId('submitbtn');
        const emailInput = screen.getByPlaceholderText("Email");
        const passInput = screen.getByPlaceholderText('password');
        userEvent.type(emailInput,"vapa@gmail.com")
        userEvent.type(passInput,"testuo3985");

        userEvent.click(submitButton);
        const userInfo = screen.getByText("Welcome User!")
        expect(userInfo).toBeInTheDocument();
    })

    test("Empty usename and password Should display error if email or password input is empty",()=>{
        render(<Router>
            <SiginForm />
        </Router>) 
        const emailInput = screen.getByPlaceholderText("Email");
        const passInput = screen.getByPlaceholderText('password');
        const submitButton = screen.getByTestId('submitbtn');
        userEvent.type(emailInput, '');
        userEvent.type(passInput, '');

        userEvent.click(submitButton);
        const userInfo = screen.toMatch("email is required")
        const passInfo = screen.toMatch("password is required")
        expect(userInfo).toBeInTheDocument();
        expect(passInfo).toBeInTheDocument();
    })


    test("Invalid user login - Should display error if incorrect email address is given",()=>{
        render(
            <Router><SiginForm /></Router>
            
        ) 
        const emailInput = screen.getByPlaceholderText("Email");
        const passInput = screen.getByPlaceholderText('password');
        const submitButton = screen.getByTestId('submitbtn');
        userEvent.type(emailInput,"vapa")
        userEvent.type(passInput,"testuo3985");

        userEvent.click(submitButton);
        const userInfo = screen.toMatch("Not valid email");
        expect(userInfo).toBeInTheDocument();
    })

    test("validate password Minimum 6 charecterslong", () => {
        render(
            <Router><SiginForm /></Router>
        ) 
        const passInput = screen.getByPlaceholderText('password');
        userEvent.type(passInput,"tyey23");    
        expect(passInput.length).toBeGreaterThanOrEqual(6);
    }); 

}

)