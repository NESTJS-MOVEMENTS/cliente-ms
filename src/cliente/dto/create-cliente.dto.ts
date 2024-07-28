// import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { persona } from '../../common';
export class CreateClienteDto extends persona {
  @IsString()
  @Length(8)
  public contrasena: string;
}
