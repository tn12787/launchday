import { createHandler, Post, Request, NotFoundException } from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class InviteAcceptanceHandler {
  @Post()
  async acceptInvite(@PathParam('inviteId') id: string, @Request() req: AuthDecoratedRequest) {
    if (!id) throw new NotFoundException();

    const acceptingUser = req.session.token?.email;

    const invite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!invite || acceptingUser !== invite.email) {
      throw new NotFoundException();
    }

    // create workspace member and delete invite
    const [newMembership] = await prisma.$transaction([
      prisma.workspaceMember.create({
        data: {
          workspace: {
            connect: {
              id: invite.workspaceId,
            },
          },
          user: {
            connect: {
              email: invite.email,
            },
          },
          roles: { connect: [{ id: invite.roleId }] },
        },
      }),
      prisma.invite.delete({
        where: {
          id,
        },
      }),
    ]);

    return newMembership;
  }
}

export default createHandler(InviteAcceptanceHandler);
