import { Test } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

describe('ClienteController', () => {
  let clienteController: ClienteController;
  let clienteService: ClienteService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [ClienteService],
    }).compile();

    clienteService = moduleRef.get<ClienteService>(ClienteService);
    clienteController = moduleRef.get<ClienteController>(ClienteController);
  });

  describe('findAllTest', () => {
    it('should return an array ', async () => {
      const result = ['test'];
      jest
        .spyOn(clienteService, 'findAll2')
        .mockImplementation(async () => result);

      expect(await clienteController.findAll2()).toBe(result);
    });

    it('Should return a Object', async () => {
      expect(await clienteController.findOne('0914387477')).toEqual(
        expect.objectContaining({
          clientid: expect.any(String),
          nombre: expect.any(String),
          genero: expect.any(String),
          edad: expect.any(Number),
          identificacion: expect.any(String),
          direccion: expect.any(String),
          telefono: expect.any(String),
          estado: expect.any(Boolean),
          contrasena: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });

    it('in case error', async () => {
      expect.assertions(2);
      try {
        await clienteController.findOne('0914387478');
      } catch (error) {
        expect(error.error.message).toEqual(
          `Cliente con id #0914387478 no encontrado`,
        );
        expect(error.error.status).toEqual(404);
      }
    });
  });
});
