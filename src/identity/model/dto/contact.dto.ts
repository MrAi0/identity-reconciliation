import { IsEmail, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateContactReqDto {

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber?: string;
}

export class CreateContactResDto {
  contact: ContactDto
}


export class ContactDto {

  primaryContactId: number;

  emails: string[];

  phoneNumbers: string[];

  secondaryContactIds: number[];

}