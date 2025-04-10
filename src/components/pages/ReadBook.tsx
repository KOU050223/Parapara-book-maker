import { useState, useEffect, useRef } from 'react';
import { Container, Text, Button, Box, Flex, Heading, Input } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface LocationState {
  readText: string;
}

const ReadBook = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const readText = state?.readText || "サンプルテキストです。速読の練習をしましょう。";
  
  const [isReading, setIsReading] = useState(false);
  const [currentChar, setCurrentChar] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(300); // 文字/分
  const intervalRef = useRef<number | null>(null);

  // 速度を調整する関数
  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    if (isReading) {
      stopReading();
      startReading();
    }
  };

  // 読書開始の処理
  const startReading = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsReading(true);
    setCurrentIndex(0);
    
    // 速度に基づいてインターバルを計算 (ミリ秒)
    const interval = 60000 / speed; // 1分 = 60000ミリ秒
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex >= readText.length - 1) {
          stopReading();
          return 0;
        }
        return prevIndex + 1;
      });
    }, interval);
  };

  // 読書停止の処理
  const stopReading = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsReading(false);
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 現在の文字を更新
  useEffect(() => {
    if (currentIndex < readText.length) {
      setCurrentChar(readText[currentIndex]);
    }
  }, [currentIndex, readText]);

  // 読書開始/停止ボタンのハンドラー
  const handleSubmit = () => {
    if (isReading) {
      stopReading();
    } else {
      startReading();
    }
  };

  return (
    <Container centerContent maxW="container.lg" py={8} height="100vh">
      {/* 戻るボタン */}
      <Link to="/">
        <Button
          colorScheme="blue"
          width="100%"
          height="50px"
          mb={4}
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
        >
          Back
        </Button>
      </Link>
      
      {/* 読書画面 */}
      <Heading as="h1" size="xl" mb={8}>Speed Reading</Heading>
      
      {/* 速度調整 */}
      <Flex width="100%" mb={8} alignItems="center">
        <Text mr={4}>速度: {speed} 文字/分</Text>
        <Input
          type="range"
          value={speed}
          min={100}
          max={1000}
          step={50}
          onChange={(e) => handleSpeedChange(Number(e.target.value))}
          width="70%"
        />
      </Flex>
      
      {/* 文字表示エリア */}
      <Box
        width="100%"
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mb={8}
        bg="gray.50"
      >
        <Text fontSize="6xl" fontWeight="bold">
          {isReading ? currentChar : "開始するには下のボタンをクリック"}
        </Text>
      </Box>
      
      {/* 進捗バー */}
      <Box width="100%" height="10px" bg="gray.200" mb={8} borderRadius="full">
        <Box
          height="100%"
          width={`${(currentIndex / readText.length) * 100}%`}
          bg="blue.500"
          borderRadius="full"
        />
      </Box>
      
      <Button
        colorScheme={isReading ? "red" : "blue"}
        onClick={handleSubmit}
        width="100%"
        height="50px"
        _hover={{ bg: isReading ? "red.600" : "blue.600" }}
        _active={{ bg: isReading ? "red.700" : "blue.700" }}
      >
        {isReading ? "停止" : "読書開始"}
      </Button>
    </Container>
  );
};

export default ReadBook
