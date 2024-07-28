import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(`Cliente Service`);
  async onModuleInit() {
    await this.$connect();
    this.logger.log(`ClienteDB Online`);
  }
  async create(createClienteDto: CreateClienteDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contrasena, ...rest } = await this.cliente.create({
        data: {
          ...createClienteDto,
          contrasena: bcrypt.hashSync(createClienteDto.contrasena, 10),
        },
      });
      return { ...rest };
    } catch (error) {
      //console.log(error.code);
      const msg =
        error.code === 'P2002'
          ? `Cliente con identificacion ${createClienteDto.identificacion} ya existe`
          : `Error al grabar`;
      throw new RpcException({
        message: msg,
        status: HttpStatus.BAD_REQUEST,
      });
      //P2002
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    //Total clientes
    const totalRegistros = await this.cliente.count({
      where: { estado: true },
    });
    //Total de paginas
    const lastPage = Math.ceil(totalRegistros / limit);
    //Retornar la data mas meta: total,pagina actual, ultima pagina
    return {
      data: await this.cliente.findMany({
        where: { estado: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalRegistros,
        page,
        lastPage,
      },
    };
  }

  async findOne(identificacion: string) {
    try {
      return await this.cliente.findUniqueOrThrow({
        where: { estado: true, identificacion: identificacion },
      });

      //con findUnique()
      // if ( !product ) {
      //   throw new RpcException({
      //     message: `Product with id #${ id } not found`,
      //     status: HttpStatus.BAD_REQUEST
      //   });
      // }
    } catch (error) {
      throw new RpcException({
        message: `Cliente con id #${identificacion} no encontrado`,
        status: HttpStatus.NOT_FOUND,
      });
    }
  }

  async update(updateClienteDto: UpdateClienteDto) {
    const {
      identificacion,
      contrasena = undefined,
      ...data
    } = updateClienteDto;

    if (contrasena) {
      data[contrasena] = bcrypt.hashSync(contrasena, 10);
    }

    await this.findOne(identificacion);
    return await this.cliente.update({
      where: { identificacion: identificacion },
      //la identificacion ya no esta en la data
      data: data,
    });
  }

  async delete(identificacion: string) {
    await this.findOne(identificacion);
    return await this.cliente.update({
      where: { identificacion: identificacion },
      data: { estado: false },
    });
  }
  async findAll2() {
    return ['OK'];
  }
}
