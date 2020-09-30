import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  height: 91vh;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #E3F0FF;

  form {
    display: flex;
    flex-direction: column;

    padding: 50px;
  }
`

export const Button = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  background-color: #3f51b5;
  border: 0;
  border-radius: 10px;
  margin-bottom: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.3, '#3f51b5')};
  }
`