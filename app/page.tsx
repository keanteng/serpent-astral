import {
  Box,
  Text,
  Heading,
  UnorderedList as List,
  ListItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { GlobeAsiaAustraliaIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className='min-h-screen p-4 flex flex-col'>
      <Box className='flex flex-row bg-gray-950 h-20 md:h-32 items-center px-4 rounded-lg'>
        <GlobeAsiaAustraliaIcon className='text-white h-10 w-10' />
        <Text className='text-white text-3xl ml-1'>
          Serpent Astral Shop
        </Text>
      </Box>

      <Box className='flex flex-col grow md:flex-row mt-4 gap-4'>
        <Box className='flex flex-col rounded-xl bg-gray-950 px-6 py-10 md:px-16 md:w-2/5 justify-center'>
          <Text className='text-xl text-white md:leading-normal'>
            Welcome to <strong>Serpent Astral</strong>. 
            The galactic's most trusted shop for all your astral needs.
          </Text> 

          <Link
          href='/dashboard'
          className='mt-4 bg-white hover:bg-yellow-500 hover:text-black self-start text-black font-bold py-2 px-6 rounded-xl flex flex-row items-center gap-3'
          >
            <span>Get Started</span><CogIcon className='h-6 w-6' />
          </Link>
        </Box>

        <Box className='flex flex-col p-6 md:w-3/5 bg-gray-950 rounded-xl py-10 px-10'>
          <Heading size='lg' className='text-white'>
            Vision
          </Heading>
          <Text className='text-lg text-white mt-3'>
            ⚡ Astral grade system to improve efficiency and reduce costs.
          </Text>

          <Heading size='lg' className='text-white mt-6'>
            Engine
          </Heading>
          <Text className='text-lg text-white mt-3'>
            💻 Powered by celetial grade inventory management system.
          </Text>

          <Heading size='lg' className='text-white mt-6'>
            Reviews 🔥
          </Heading>
          <List spacing={3} color='white'>
            <ListItem>
              <Text className='text-lg text-white mt-3 font-serif italic'>
                "I've been using Serpent Astral for years. It's the best!"
              </Text>
            </ListItem>
            <ListItem>
              <Text className='text-lg text-white mt-3 font-serif italic'>
                "I can't imagine my life without Serpent Astral."
              </Text>
            </ListItem>
            <ListItem>
              <Text className='text-lg text-white mt-3 font-serif italic'>
                "The best shop in the galaxy!"
              </Text>
            </ListItem>
          </List>
        </Box>
      </Box>
    </main>
  );
}
