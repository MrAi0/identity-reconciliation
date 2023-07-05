import { Injectable, Logger } from '@nestjs/common';
import { IdentityRepository } from '../repository/identity.repository';
import { CreateContactReqDto, CreateContactResDto } from '../model/dto/contact.dto';
import { LinkPrecedenceEnum } from '../model/enum/contact.enums';

@Injectable()
export class IdentityService {

  private readonly logger = new Logger(IdentityService.name);

  constructor(private readonly identityRepository: IdentityRepository) { }

  /**
   * Create or update an identity
   */
  async createIdentity(data: CreateContactReqDto): Promise<CreateContactResDto> {
    this.logger.log(`Fetching primary contact with email: ${data.email} and phone number: ${data.phoneNumber}.`);
    const contacts = await this.identityRepository.getContact(data.email, data.phoneNumber);
    let id = contacts[0]?.id;

    this.logger.log(`Number of primary contacts present: ${contacts.length}`);

    // Updates the primary contact to secondary contact
    if (contacts.length > 1) {
      this.logger.log(`Updating primary contact ${contacts[1]} to secondary contact for ${contacts[0]}.`);
      await this.identityRepository.updateContact(contacts[1].id, LinkPrecedenceEnum.secondary, id);

      // Creates a secondary contact if email or phone number present as primary contact. If not present creates a primary contact with provided details.
    } else {
      this.logger.log(`Inserting new entry in database with email ${data.email} and phone number ${data.phoneNumber}.`);
      const precedence = contacts.length > 0 ? LinkPrecedenceEnum.secondary : LinkPrecedenceEnum.primary;
      const contactResp = await this.identityRepository.createContact(data.email, data.phoneNumber, precedence, id);
      id = contactResp.linkedId ? contactResp.linkedId : contactResp.id;
    }
    return this.constructResponse(id);
  }


  /**
   * Construct the response JSON
   */
  async constructResponse(primaryId: number): Promise<CreateContactResDto> {
    this.logger.log(`Fetching contact data using the primary id: ${primaryId}`);
    const contacts = await this.identityRepository.fetchContactById(primaryId);
    const data = new CreateContactResDto();
    const emailIds = new Set([]);
    const phoneNumbers = new Set([]);
    const secondaryIds = [];

    for (const item of contacts) {
      if (item.email) emailIds.add(item.email);
      if (item.phoneNumber) phoneNumbers.add(item.phoneNumber);
      if (item.linkedId) secondaryIds.push(item.id);
    }

    data.contact = {
      primaryContactId: primaryId,
      emails: [...emailIds],
      phoneNumbers: [...phoneNumbers],
      secondaryContactIds: secondaryIds
    }

    return data;
  }
}
