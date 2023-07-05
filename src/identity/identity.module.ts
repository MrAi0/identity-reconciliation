import { Logger, Module } from '@nestjs/common';
import { IdentityService } from './service/identity.service';
import { IdentityController } from './controller/identity.controller';
import { IdentityRepository } from './repository/identity.repository';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [IdentityService, IdentityRepository, PrismaService, Logger],
  controllers: [IdentityController],
})
export class IdentityModule { }
