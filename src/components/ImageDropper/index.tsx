import { Input } from '@chakra-ui/input';
import { Stack, Text } from '@chakra-ui/layout';
import { ChangeEventHandler } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import useAppColors from 'hooks/useAppColors';

type ImageDropzoneProps = DropzoneOptions & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  message?: string;
};

const ImageDropper = ({
  onChange,
  message = 'Drop an image or click here...',
  ...rest
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
  });

  const { bodySub } = useAppColors();

  return (
    <Stack
      {...getRootProps()}
      borderStyle="dashed"
      borderWidth={'1px'}
      minH="200px"
      flex={1}
      borderRadius="md"
      alignItems="center"
      cursor="pointer"
      justifyContent="center"
      p={2}
      w="100%"
    >
      <Text color={bodySub}>{message}</Text>
      <Input {...getInputProps({ onChange })} accept={'image/jpeg, image/png'} />
    </Stack>
  );
};

export default ImageDropper;
