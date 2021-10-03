import { Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { SummaryField } from '../Summary';
import EditDistributionForm from '../../forms/EditDistributionForm';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { TaskStatus, User } from '.prisma/client';
import { EnrichedRelease, EventType } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.distribution?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={releaseData?.distribution?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={releaseData.distribution?.status as TaskStatus} />,
    },
    {
      name: 'Distributor',
      content: <Text fontSize="sm">{releaseData.distribution?.distributor?.name}</Text>,
    },
    {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: (
        <Text fontSize="sm">{dayjs.utc(releaseData.distribution?.dueDate).format('LL')}</Text>
      ),
    },
  ];
};

const Distribution = ({ releaseData }: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(['UPDATE_RELEASES'], teams?.[currentTeam]);

  return (
    <>
      <ReleaseTaskCard
        heading={'💿 Distribution'}
        onEditClick={onOpen}
        fields={buildFields(releaseData)}
        taskType={EventType.DISTRIBUTION}
        data={releaseData.distribution}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditDistributionForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Distribution;
