import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { LinkPrecedenceEnum } from '../model/enum/contact.enums';

@Injectable()
export class IdentityRepository {
  constructor(private prisma: PrismaService) { }

  async getContact(email: string, phoneNumber: string) {
    return await this.prisma.contact.findMany({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
        linkPrecedence: 'primary',
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async createContact(email: string, phoneNumber: string, linkPrecedence: LinkPrecedenceEnum, linkedId?: number) {
    try {
      return await this.prisma.contact.create({
        data: {
          email: email,
          phoneNumber: phoneNumber,
          linkPrecedence: linkPrecedence,
          createdAt: new Date(),
          updatedAt: new Date(),
          linkedId: linkedId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new InternalServerErrorException('Email ID and Phone Number already present for this user')
      }
    }
  }

  async updateContact(id: number, linkPrecedence: LinkPrecedenceEnum, linkedId: number) {
    return await this.prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        linkPrecedence: linkPrecedence,
        updatedAt: new Date(),
        linkedId: linkedId,
      },
    });
  }

  async fetchContactById(primaryId: number) {
    return await this.prisma.contact.findMany({
      where: {
        OR: [{ id: primaryId }, { linkedId: primaryId }],
      },
    });
  }
}
