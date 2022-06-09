import React, { FC } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Login: FC = () => {
    return (
        <Wrapper>
            <Form className='w-50 m-auto p-4 rounded'>
                <h5 className='text-center mb-3'>Log In</h5>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Enter your Id</Form.Label>
                    <Form.Control type='string' placeholder='Enter your Id' />
                </Form.Group>

                <div className='d-flex'>
                    <Button variant='primary' className='px-5 me-auto' type='submit'>
                        Login
                    </Button>
                    <Button variant='secondary' className='px-4 text-light' type='submit'>
                        Create A New ID
                    </Button>
                </div>
            </Form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    form {
        background-color: #293b46;
        color: white;
    }
`;
