import {Flex, Box, Text, Avatar} from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Viga</Text>
          <Text color="gray.300" fontSize="small">lucasviga12@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Lucas Viga" src="https://github.com/lucasviga.png" />
    </Flex>
  );
}