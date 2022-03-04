import { ArtistResponse } from 'types/common';

export const testArtist = (extraFields: Partial<ArtistResponse>): ArtistResponse => {
  return {
    id: 'test-artist-id',
    name: 'Test Artist',
    legalName: 'Test Artist Legal Name',
    spotifyUrl: null,
    instagramUrl: null,
    workspaceId: 'test-workspace-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    releases: [],
    ...extraFields,
  };
};
