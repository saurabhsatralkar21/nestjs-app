import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

constructor(
    private authService: AuthService
){}

@Post("/signup")
signUp(
    @Body(ValidationPipe) authcredentials: AuthCredentialsDto): Promise<User>{
    return this.authService.signUp(authcredentials);
}
}