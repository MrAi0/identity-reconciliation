import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IdentityService } from '../service/identity.service';
import { CreateContactReqDto } from '../model/dto/contact.dto';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) { }

  /**
   * Post request for creating a contact
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  createIdentity(@Body() body: CreateContactReqDto) {
    return this.identityService.createIdentity(body);
  }
}
