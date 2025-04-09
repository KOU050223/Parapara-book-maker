import React from 'react'
import { Container, Text, Button } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

interface LocationState {
    readText: string;
  }

const ReadBook = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const readText = state.readText;
  
  return (
    <Container centerContent maxW="container.lg" py={8} height="100vh">
      <div>ReadBook</div>
      <Text>{readText}</Text>
      <Button>
        <a href="">Start</a>
      </Button>
    </Container>
  )
}

export default ReadBook
