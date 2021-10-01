import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';

import { EnrichedRelease } from 'types';

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseArtist = ({ releaseData }: Props) => {
  return (
    <HStack align="center">
      <Icon fontSize="22px" as={FiUser} />
      <Text fontSize="sm">{releaseData.artist.name}</Text>
    </HStack>
  );
};

export default ReleaseArtist;
