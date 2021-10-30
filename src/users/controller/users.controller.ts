import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ReadOnlyUserDto } from '../dto/readonly.user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignupRequestDto } from '../dto/signup.request.dto';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { AuthService } from '../../auth/service/auth.service';
import { CurrentUser } from '../../common/decorators/current.user.decorator';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({
    summary: '내 정보 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user) {
    return user;
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({
    summary: '회원가입',
  })
  @Post()
  async signUp(@Body() body: SignupRequestDto) {
    return await this.usersService.signUp(body);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
}
