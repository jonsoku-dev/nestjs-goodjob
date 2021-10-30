import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.request.dto';
import { UsersRepository } from '../../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // * 해당하는 email 이 있는지 확인
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요. ');
    }

    // * 패스워드가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요. ');
    }

    const payload = { email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
