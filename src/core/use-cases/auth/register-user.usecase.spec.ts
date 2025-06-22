import { RegisterUserUseCase } from '../../../../src/core/use-cases/auth/register-user.usecase';
import { AuthRepository } from '../../../../src/application/interfaces/auth-repository.interface';
import { User } from '../../../../src/core/entities/user.entity';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    registerUserUseCase = new RegisterUserUseCase(authRepositoryMock);
  });

  it('deve criar um novo usuário com sucesso', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue(null);
    authRepositoryMock.create.mockImplementation(async (user: User) => {
      return new User('123', user.email, user.password);
    });

    const result = await registerUserUseCase.execute('teste@teste.com', 'senhaSegura123');

    expect(result).toBeDefined();
    expect(result.id).toBe('123');
    expect(result.email).toBe('teste@teste.com');
    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith('teste@teste.com');
    expect(authRepositoryMock.create).toHaveBeenCalled();
  });

  it('deve lançar erro se o email já estiver cadastrado', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue(
      new User('1', 'teste@teste.com', 'senhaQualquer'),
    );

    await expect(
      registerUserUseCase.execute('teste@teste.com', 'senhaSegura123'),
    ).rejects.toThrow('Email já cadastrado');

    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith('teste@teste.com');
    expect(authRepositoryMock.create).not.toHaveBeenCalled();
  });
});