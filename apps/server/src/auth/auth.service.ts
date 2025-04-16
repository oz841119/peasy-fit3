import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async isEmailExists(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return !!user;
  }

  async register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const info = {
      isEmailExists: false,
      isRegisterSuccess: false,
    };
    const isEmailExists = await this.isEmailExists(email);
    if (isEmailExists) {
      info.isEmailExists = true;
      return info;
    }
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        salt,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    if (user) {
      info.isRegisterSuccess = true;
      return info;
    }
    return info;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !user.password || !user.salt) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const hashedPassword = await bcrypt.hash(loginDto.password, user.salt);
    const isPasswordValid = hashedPassword === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
