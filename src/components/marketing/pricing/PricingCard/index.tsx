import {
  Text,
  HStack,
  Button,
  Icon,
  useColorModeValue,
  Box,
  Stack,
  Link,
  Badge,
} from '@chakra-ui/react';
import React from 'react';
import { capitalize } from 'lodash';
import { BiCheck } from 'react-icons/bi';
import NextLink from 'next/link';

import Card from 'components/Card';
import { PricingStructure, BillingCycle } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';
import { EnrichedWorkspace } from 'types/common';
import { priceToString } from 'utils/billing';

type Props = {
  priceInfo: PricingStructure;
  billingCycle: BillingCycle;
  isHighlighted?: boolean;
  workspace?: EnrichedWorkspace;
  onPlanSelected?: (priceId: string) => void;
};

const PricingCard = ({
  workspace,
  onPlanSelected,
  isHighlighted,
  priceInfo,
  billingCycle,
}: Props) => {
  const { bodySub } = useAppColors();

  const accentColor = useColorModeValue(
    `${priceInfo.colorScheme}.500`,
    `${priceInfo.colorScheme}.200`
  );

  const selectedPrice = priceInfo.product?.prices[billingCycle];

  return (
    <Card
      p={5}
      spacing={6}
      w="100%"
      borderWidth={isHighlighted ? '2px' : 0}
      borderColor={accentColor}
    >
      <Stack spacing={4}>
        <Text fontSize="3xl" fontWeight={'black'}>
          {capitalize(priceInfo.name)}{' '}
          {isHighlighted && (
            <Badge variant="solid" alignSelf={'flex-start'} colorScheme={priceInfo.colorScheme}>
              Current Plan
            </Badge>
          )}
        </Text>
        <Box h={1} w="50px" bg={accentColor}></Box>
        <Text color={bodySub}>{priceInfo.flavorText}</Text>
        <Stack>
          <HStack>
            <Text fontSize="3xl" fontWeight={'medium'}>
              {selectedPrice ? `$${priceToString(selectedPrice)}` : 'Free'}
            </Text>
            <Text fontSize="sm" color={bodySub}>
              {selectedPrice ? `${priceInfo.isPerSeat ? 'per user/month' : 'per month'}` : ''}
            </Text>
          </HStack>
          <Text fontSize="sm" color={bodySub}>
            {selectedPrice
              ? `billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}`
              : 'No, really!'}
          </Text>
        </Stack>
        {workspace ? (
          <Button
            isDisabled={!workspace.subscription && isHighlighted}
            onClick={() => onPlanSelected?.(selectedPrice?.id ?? '')}
            colorScheme={priceInfo.colorScheme}
            alignSelf="flex-start"
          >
            {workspace ? (isHighlighted ? 'Manage' : 'Choose plan') : 'Get Started'}
          </Button>
        ) : (
          <NextLink href={'/signup'} passHref>
            <Button as={Link} colorScheme={priceInfo.colorScheme} alignSelf="flex-start">
              {'Get Started'}
            </Button>
          </NextLink>
        )}
      </Stack>
      <Stack spacing={3}>
        <Text fontSize="md" fontWeight={'semibold'}>
          What you get:
        </Text>
        {priceInfo.featureItems.map((feature) => (
          <HStack key={feature}>
            <Icon fontSize="xl" as={BiCheck} color={accentColor}></Icon>
            <Text fontSize="md">{feature}</Text>
          </HStack>
        ))}
      </Stack>
    </Card>
  );
};

export default PricingCard;
