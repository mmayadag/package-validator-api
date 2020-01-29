import {
  IsString,
  IsInt,
  IsEmail,
  IsDefined,
  IsNotEmpty,
  IsIn
} from "class-validator";

export default class repoDTO {
  readonly id: number;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public email: string;

  @IsDefined()
  @IsIn([6, 12, 24])
  @IsInt()
  readonly period: number;

  @IsNotEmpty()
  @IsString()
  readonly owner: string;

  @IsNotEmpty()
  @IsString()
  readonly repo: string;
}
