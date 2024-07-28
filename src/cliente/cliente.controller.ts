import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PaginationDto } from '../common';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @MessagePattern({ cmd: 'create_cliente' })
  async create(@Payload() createClienteDto: CreateClienteDto) {
    //return createClienteDto;
    return await this.clienteService.create(createClienteDto);
  }

  @MessagePattern({ cmd: 'find_all_clientes' })
  async findAll(@Payload() paginationDto: PaginationDto) {
    return await this.clienteService.findAll(paginationDto);
  }
  //Si transformo el id de string a number clientId va dentro del payload()
  //async findOne(@Payload('clienteId',ParseIntPipe) clienteId: string)
  @MessagePattern({ cmd: 'find_one_cliente' })
  async findOne(@Payload('identificacion') identificacion: string) {
    return await this.clienteService.findOne(identificacion);
  }

  @MessagePattern({ cmd: 'update_cliente' })
  //en UpdateClienteDto si es obligatorio que venga la identificacion
  async update(@Payload() updateClienteDto: UpdateClienteDto) {
    return await this.clienteService.update(updateClienteDto);
  }
  @MessagePattern({ cmd: 'delete_cliente' })
  async delete(@Payload('clienteId', ParseUUIDPipe) clienteId: string) {
    await this.findOne(clienteId);
    return await this.clienteService.delete(clienteId);
  }
  async findAll2() {
    return await this.clienteService.findAll2();
  }
}
