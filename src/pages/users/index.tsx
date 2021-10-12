import Link from 'next/link';
import {
  Box, 
  Flex, 
  Heading, 
  Button, 
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useEffect } from 'react';

export default function UserList(){
  const {data, isLoading, isFetching ,error} = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json();

    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      }
    });

    return users;
  }, {
    staleTime: 1000 * 5 // 5 seconds,
  })  

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px={["4", "4", "6"]}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Link href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Create new
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Error when fetching user data.</Text>
            </Flex>
          ) : (
            <>  
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    { isWideVersion && <Th>Registration date</Th> }
                    { isWideVersion && <Th w="8"></Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="small" color="gray.300">{user.email}</Text>
                        </Box>                  
                      </Td>
                      { isWideVersion && <Td>{user.createdAt}</Td> }
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}