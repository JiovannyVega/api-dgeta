import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const { password_hash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: user.user_id, username: user.username, role_id: user.role_id };
        return {
            access_token: this.jwtService.sign(payload),
            user: { user_id: user.user_id, username: user.username, email: user.email, role_id: user.role_id }
        };
    }

    async register(dto: any) {
        dto.password_hash = await bcrypt.hash(dto.password_hash, 10);
        const user = await this.userService.create(dto);
        const payload = { sub: user.user_id, username: user.username, role_id: user.role_id };
        return {
            access_token: this.jwtService.sign(payload),
            user: { user_id: user.user_id, username: user.username, email: user.email, role_id: user.role_id }
        };
    }
}
