import { addWeeks, startOfToday } from 'date-fns';

import { midday } from './dates';

import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';

export const clientReleasePrepTasks = (release?: ClientRelease) =>
  [release?.artwork, release?.distribution, release?.mastering].filter(
    Boolean
  ) as ReleaseTaskWithAssignees[];

export const clientMarketingPrepTasks = (release?: ClientRelease) => release?.generic ?? [];

export const hasAllRequiredTasks = (release: ClientRelease) =>
  ['artwork', 'distribution', 'mastering'].every((item) => release.hasOwnProperty(item));

export const defaultReleaseDate = () => {
  return addWeeks(midday(startOfToday()), 5);
};
