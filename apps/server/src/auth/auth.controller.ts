import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    const registerInfo = await this.authService.register({
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
    });
    if (registerInfo.isRegisterSuccess) {
      return registerInfo;
    } else {
      throw new HttpException(registerInfo, HttpStatus.CONFLICT);
    }
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const loginInfo = await this.authService.login(loginDto);
    return loginInfo;
  }
}
