import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Put,
  Req,
  ValidationPipe,
} from 'next-api-decorators';

import { LinkReleaseTrackDto } from 'backend/models/tracks/update';
import type { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateReleaseTrackDto } from 'backend/models/tracks/create';

@requiresAuth()
class ReleaseTrackHandler {
  @Post()
  async createTrack(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateReleaseTrackDto,
    @PathParam('releaseId') id: string
  ) {
    const release = await prisma.release.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    if (!release) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], release?.workspaceId);

    await prisma.release.update({
      where: { id },
      data: {
        tracks: {
          create: {
            workspaceId: release?.workspaceId,
            name: body.name,
            lyrics: body.lyrics,
            mainArtists: {
              connect: body.mainArtists?.map((id) => ({ id })),
            },
            featuringArtists: {
              connect: body.featuringArtists?.map((id) => ({ id })),
            },
          },
        },
      },
    });
  }

  @Put()
  async linkTracks(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: LinkReleaseTrackDto,
    @PathParam('releaseId') id: string
  ) {
    const release = await prisma.release.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], release?.workspaceId);

    await prisma.release.update({
      where: { id },
      data: {
        tracks: {
          connect: body.ids.map((id) => ({ id })),
        },
      },
    });
  }
}

export default createHandler(ReleaseTrackHandler);
