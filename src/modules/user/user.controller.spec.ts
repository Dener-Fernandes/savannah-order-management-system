import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterface } from './interfaces';

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
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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
});
