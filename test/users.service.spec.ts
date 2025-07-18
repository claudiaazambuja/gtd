import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  let mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find user by email', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ Email: 'test@example.com' });
    let user = await service.findByEmail('test@example.com');
    expect(user).toHaveProperty('Email', 'test@example.com');
  });

  it('should create a new user', async () => {
    let data = { Email: 'a@a.com', PasswordHash: '123', Username: 'Test' };
    mockPrisma.user.create.mockResolvedValue(data);
    let created = await service.createUser(data.Email, data.PasswordHash);
    expect(created).toEqual(data);
  });

  it('should update password', async () => {
    let user = { IdUser: 1, PasswordHash: 'newHash' };
    mockPrisma.user.update.mockResolvedValue(user);
    let result = await service.updatePassword(user.IdUser, user.PasswordHash);
    expect(result).toEqual(user);
  });

  it('should throw error if ID is missing', async () => {
    await expect(service.updatePassword(undefined as any, '123')).rejects.toThrow(
      'IdUser is required to update password',
    );
  });
});
