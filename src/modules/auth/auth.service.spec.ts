import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let userService: Partial<UserService>;
    let jwtService: Partial<JwtService>;

    beforeEach(async () => {
        userService = {
            findByUsername: jest.fn(),
            create: jest.fn(),
        };
        jwtService = {
            sign: jest.fn().mockReturnValue('mocked.jwt.token'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: userService },
                { provide: JwtService, useValue: jwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('register', () => {
        it('should register a user and return a token', async () => {
            const dto = {
                role_id: 1,
                username: 'testuser',
                password_hash: 'plaintext',
                email: 'test@demo.com',
                active: true,
            };
            const createdUser = {
                user_id: 1,
                ...dto,
                password_hash: await bcrypt.hash(dto.password_hash, 10),
            };
            (userService.create as jest.Mock).mockResolvedValue(createdUser);

            const result = await service.register({ ...dto });
            expect(result).toHaveProperty('access_token', 'mocked.jwt.token');
            expect(result.user).toMatchObject({
                user_id: 1,
                username: 'testuser',
                email: 'test@demo.com',
                role_id: 1,
            });
        });
    });

    describe('login', () => {
        it('should login a user and return a token', async () => {
            const user = {
                user_id: 1,
                username: 'testuser',
                password_hash: await bcrypt.hash('plaintext', 10),
                email: 'test@demo.com',
                role_id: 1,
                active: true,
            };
            (userService.findByUsername as jest.Mock).mockResolvedValue(user);

            const result = await service.login('testuser', 'plaintext');
            expect(result).toHaveProperty('access_token', 'mocked.jwt.token');
            expect(result.user).toMatchObject({
                user_id: 1,
                username: 'testuser',
                email: 'test@demo.com',
                role_id: 1,
            });
        });

        it('should throw UnauthorizedException for invalid credentials', async () => {
            (userService.findByUsername as jest.Mock).mockResolvedValue(null);
            await expect(service.login('nouser', 'badpass')).rejects.toThrow('Credenciales inválidas');
        });
    });
});
