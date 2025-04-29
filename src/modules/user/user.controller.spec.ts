import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterface } from './interfaces';
import { UpdateUserDto } from './dtos/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './dtos/create-user.dto';

let createdUser: Partial<UserInterface> = {
  id: 'ac3a0363-275e-40e6-a3b1-e4783380e89f',
  createdAt: new Date('2025-03-07T04:06:00.558Z'),
  updatedAt: new Date('2025-03-07T04:06:00.558Z'),
  userName: 'rick-deckard',
  firstName: 'Rick',
  lastName: 'Deckard',
  email: 'rickDeckard@gmail.com',
  active: true,
};

let userList: Partial<UserInterface>[] = [
  {
    id: 'ac3a0363-275e-40e6-a3b1-e4783380e89f',
    createdAt: new Date('2025-03-07T04:06:00.558Z'),
    updatedAt: new Date('2025-03-07T04:06:00.558Z'),
    userName: 'rick-deckard',
    firstName: 'Rick',
    lastName: 'Deckard',
    email: 'rickDeckard@gmail.com',
    active: true,
  },
];

describe('UserController', () => {
  let userController: UserController;
  let userSerivce: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdUser),
            findAll: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn().mockResolvedValue(userList[0]),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userSerivce = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userSerivce).toBeDefined();
  });

  it('should create an user successfully', async () => {
    const createUserPayload = {
      email: 'rickDeckard@gmail.com',
      userName: 'rick-deckard',
      password: '06102021',
      firstName: 'Rick',
      lastName: 'Deckard',
    };

    const result = await userController.create(createUserPayload);

    expect(result.email).toBe(createUserPayload.email);
    expect(userSerivce.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should return user list successfully', async () => {
    const result = await userController.findAll();

    expect(result).toEqual(userList);
    expect(userSerivce.findAll).toHaveBeenCalled();
  });

  it('should return an user by id successfully', async () => {
    let id = 'ac3a0363-275e-40e6-a3b1-e4783380e89f';

    const result = await userController.findOne(id);

    expect(result.id).toBe(id);
    expect(userSerivce.findOne).toHaveBeenCalled();
  });

  it('should update an user by id successfully', async () => {
    let id = 'ac3a0363-275e-40e6-a3b1-e4783380e89f';

    let updatedUser: UpdateUserDto = {
      firstName: 'Richard',
      active: false,
    };

    userList[0].firstName = 'Richard';
    userList[0].active = false;

    const result = await userController.update(id, updatedUser);

    expect(result.id).toBe(id);
    expect(result.firstName).toBe(updatedUser.firstName);
    expect(result.active).toBe(updatedUser.active);
    expect(userSerivce.update).toHaveBeenCalled();
  });

  it('should delete an user by id successfully', async () => {
    let id = 'ac3a0363-275e-40e6-a3b1-e4783380e89f';

    const result = await userController.remove(id);

    expect(result).toBeUndefined();
    expect(userSerivce.remove).toHaveBeenCalled();
  });

  it('should throw an error if was not able to find and user by id', async () => {
    const id = 'non-existent-id';

    userSerivce.findOne = jest.fn().mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(userController.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if was not able to delete and user by id', async () => {
    const id = 'non-existent-id';

    userSerivce.remove = jest.fn().mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(userController.remove(id)).rejects.toThrow(NotFoundException);
  });

  it('should validate successfully with valid data', async () => {
    const userDto = plainToInstance(CreateUserDto, {
      email: 'rickDeckard@gmail.com',
      userName: 'rick-deckard',
      password: '06102021',
      firstName: 'Rick',
      lastName: 'Deckard',
    });

    const errors = await validate(userDto);
    expect(errors.length).toBe(0);
  });

  it('should return error when email is invalid', async () => {
    const userDto = plainToInstance(CreateUserDto, {
      email: 'invalid-email',
      userName: 'rick-deckard',
      password: '06102021',
      firstName: 'Rick',
      lastName: 'Deckard',
    });

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('email');
  });

  it('should return error when required fields are not strings', async () => {
    const userDto = plainToInstance(CreateUserDto, {
      email: 123,
      userName: {},
      password: true,
      firstName: [],
      lastName: null,
    });

    const errors = await validate(userDto);
    const propertiesWithErrors = errors.map((e) => e.property);

    expect(propertiesWithErrors).toEqual(
      expect.arrayContaining([
        'email',
        'userName',
        'password',
        'firstName',
        'lastName',
      ]),
    );
  });
});
