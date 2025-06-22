import { LoginUserUseCase } from '../../../../src/core/use-cases/auth/login-user.usecase';
import { AuthRepository } from '../../../../src/application/interfaces/auth-repository.interface';
import { User } from '../../../../src/core/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  const jwtSecret = process.env.JWT_SECRET || 'default-secret';

  beforeEach(() => {
    authRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    loginUserUseCase = new LoginUserUseCase(authRepositoryMock);
  });

  it('deve gerar um token válido para credenciais corretas', async () => {
    const password = 'senhaSegura123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User('123', 'teste@teste.com', hashedPassword);

    authRepositoryMock.findByEmail.mockResolvedValue(user);

    const result = await loginUserUseCase.execute('teste@teste.com', password);

    const decoded = jwt.verify(result.accessToken, jwtSecret) as any;

    expect(result).toHaveProperty('accessToken');
    expect(decoded.sub).toBe('123');
    expect(decoded.email).toBe('teste@teste.com');
    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith('teste@teste.com');
  });

  it('deve lançar erro se o usuário não existir', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue(null);

    await expect(
      loginUserUseCase.execute('naoexiste@teste.com', 'qualquerSenha'),
    ).rejects.toThrow('Usuário não encontrado');

    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith('naoexiste@teste.com');
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const hashedPassword = await bcrypt.hash('senhaCorreta', 10);
    const user = new User('123', 'teste@teste.com', hashedPassword);

    authRepositoryMock.findByEmail.mockResolvedValue(user);

    await expect(
      loginUserUseCase.execute('teste@teste.com', 'senhaIncorreta'),
    ).rejects.toThrow('Credenciais inválidas');

    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith('teste@teste.com');
  });
});