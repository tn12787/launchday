import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

interface EmailSignInData {
  email: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { bodySub } = useAppColors();

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/overview', undefined, { shallow: false });
    }
  }, [status, router]);

  const signInWithGoogle = async () => {
    await signIn('google', { callbackUrl: router.query.callbackUrl as string });
  };

  const signInWithEmail = async ({ email }: EmailSignInData) => {
    await signIn('email', { email, callbackUrl: router.query.callbackUrl as string });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailSignInData>();

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Sign in" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Heading fontWeight="semibold" fontSize="3xl">
          Log in to Launchday
        </Heading>
        <GoogleButton onClick={signInWithGoogle} />
        <Stack
          w="100%"
          direction={'row'}
          justifyContent="center"
          alignItems={{ base: 'center', md: 'center' }}
        >
          <Divider orientation="horizontal"></Divider>
          <Text fontSize="sm" color={bodySub}>
            OR
          </Text>
          <Divider></Divider>
        </Stack>
        <Stack spacing={6} w="100%" as={'form'} onSubmit={handleSubmit(signInWithEmail)}>
          <Text fontWeight={'semibold'} fontSize="lg">
            Sign in with a magic link
          </Text>
          <FormControl name="email" isInvalid={!!errors.email}>
            <FormLabel fontSize={'sm'} htmlFor="email">
              Email address
            </FormLabel>
            <Input
              type="email"
              {...register('email', { required: 'Please enter your email address.' })}
              placeholder={'name@example.com'}
            ></Input>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" variant="outline">
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return { props: { session } };
};

export default LoginPage;
