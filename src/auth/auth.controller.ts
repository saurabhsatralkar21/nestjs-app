import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

constructor(
    private authService: AuthService
){}

@Post('/signin')
signIn(@Body(ValidationPipe) authcredentials: AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.authService.signIn(authcredentials);
}

@Post("/signup")
signUp(
    @Body(ValidationPipe) authcredentials: AuthCredentialsDto): Promise<User>{
    return this.authService.signUp(authcredentials);
}

@Post("/auth")
authTest(@Req() req){
    console.log("req", req);
}
}