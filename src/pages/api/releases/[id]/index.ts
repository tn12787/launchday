import {
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseType } from '@prisma/client';
import { NextApiRequest } from 'next';

import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class SingleReleaseHandler {
  @Get()
  async singleRelease(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    if (!id) throw new NotFoundException();

    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['VIEW_RELEASES'], releaseTeam?.teamId);

    const release = await prisma.release.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        tasks: {
          include: {
            assignees: true,
            artworkData: true,
            distributionData: { include: { distributor: true } },
            marketingData: { include: { links: true } },
            musicVideoData: true,
            masteringData: true,
          },
        },
      },
    });

    if (!release) throw new NotFoundException();

    return transformReleaseToApiShape(release);
  }

  @Put()
  async updateRelease(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateReleaseDto,
    @PathParam('id') id: string
  ) {
    if (!id) throw new NotFoundException();

    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const result = await prisma.release.update({
      where: {
        id,
      },
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
      },
    });
    return result;
  }

  @Delete()
  async deleteRelease(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['DELETE_RELEASES'], releaseTeam?.teamId);

    const result = await prisma.release.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(SingleReleaseHandler);
