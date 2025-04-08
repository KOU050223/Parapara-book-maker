// ChakraUIをインポート
import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Container,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react';

// InputButtonFormコンポーネント
const InputButtonForm = () => {
  // テキスト入力を管理するためのstate
  const [inputValue, setInputValue] = useState('');
  // 送信した値を保存するstate
  const [submittedValue, setSubmittedValue] = useState('');
  // アラートメッセージのstate
  const [alertInfo, setAlertInfo] = useState({ show: false, status: '', message: '' });

  // 入力値が変更されたときのハンドラー
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  // ボタンがクリックされたときのハンドラー
  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      // 空の場合はアラートでエラーメッセージを表示
      setAlertInfo({
        show: true,
        status: 'error',
        message: 'テキストを入力してください'
      });
      return;
    }

    // 送信された値を保存
    setSubmittedValue(inputValue);
    
    // 成功メッセージを表示
    setAlertInfo({
      show: true,
      status: 'success',
      message: `「${inputValue}」が送信されました`
    });
    
    // 入力フィールドをクリア
    setInputValue('');

    // 3秒後にアラートを非表示にする
    setTimeout(() => {
      setAlertInfo({ show: false, status: '', message: '' });
    }, 3000);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack width="100%">
        <Heading as="h1" size="xl">ChakraUI フォーム</Heading>
        
        {/* {alertInfo.show && (
          <Alert status={alertInfo.status} borderRadius="md">
            {alertInfo.message}
          </Alert>
        )} */}
        
        <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <VStack>
            <Input
              placeholder="テキストを入力してください"
              value={inputValue}
              onChange={handleInputChange}
              size="md"
              // Enterキーで送信できるようにする
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            
            <Button 
              colorScheme="blue" 
              onClick={handleSubmit}
              width="100%"
            >
              送信
            </Button>
          </VStack>
        </Box>
        
        {submittedValue && (
          <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text>最後に送信された値: <strong>{submittedValue}</strong></Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default InputButtonForm;