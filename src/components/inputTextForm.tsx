import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  Container,
  VStack,
  Heading,
  Text,
  Textarea,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// InputButtonFormコンポーネント
const InputButtonForm = () => {
  // テキスト入力を管理するためのstate
  const [inputValue, setInputValue] = useState('');
  // 送信した値を保存するstate
  const [submittedValue, setSubmittedValue] = useState('');
  const navigate = useNavigate();

  // 入力値が変更されたときのハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // ボタンがクリックされたときのハンドラー
  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      return;
    }

    // 送信された値を保存
    setSubmittedValue(inputValue);
    navigate('/ReadBook', { state: { readText: inputValue } });
    // 入力フィールドをクリア
    setInputValue('');
  };

  // キーボードショートカット（Ctrl+Enter で送信）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue]);

  return (
    <Container centerContent maxW="container.lg" py={8} height="100vh">
      <VStack width="100%" height="100%">
        <Heading as="h1" size="xl">読みたい文章をコピペしよう</Heading>
                
        <Box 
          width="100%" 
          p={6} 
          shadow="lg" 
          borderWidth="1px" 
          borderRadius="lg"
          flex="1"
          display="flex"
          flexDirection="column"
          height="50vh" // 画面の50%の高さ
        >
          <VStack height="100%">
            <Textarea
              placeholder="テキストを入力してください（Ctrl+Enter で送信）"
              value={inputValue}
              onChange={handleInputChange}
              size="md"
              resize="none"
              flex="1"
              height="calc(100% - 50px)" // ボタンの高さを考慮
              fontSize="md"
              borderColor="gray.300"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500"
              }}
            />
            
            <Flex width="100%">
              <Text fontSize="xs" color="gray.500">
                Ctrl+Enter で送信できます
              </Text>
              <Spacer />
              <Text fontSize="xs" color="gray.500">
                {inputValue.length} 文字
              </Text>
            </Flex>
            
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              width="100%"
              height="50px"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
                送信 
            </Button>
          </VStack>
        </Box>
        
        {submittedValue && (
          <Box 
            width="100%" 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md"
            bg="gray.50"
            maxHeight="30vh"
            overflow="auto"
          >
            <Text fontWeight="bold" mb={2}>最後に送信された内容:</Text>
            <Text whiteSpace="pre-wrap">{submittedValue}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default InputButtonForm;