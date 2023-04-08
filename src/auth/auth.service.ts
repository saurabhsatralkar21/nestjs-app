import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    @InjectRepository(User) private readonly userRepository: Repository<User>;
    // @InjectRepository(User) private jwtService: JwtService;

    constructor(private readonly jwtService: JwtService) {}


    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.userRepository.create({ username, password: hashedPassword });
        try{
            await this.userRepository.save(user);
        }
        catch(error){
            console.log('error', error);
            if(error.code == "23505")
                throw new ConflictException("Username exists")
            else
                throw new InternalServerErrorException();   
            }
        return user;
    }
  
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.createUser(authCredentialsDto);
    }
 
    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}>{
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ where: {username: username}});

        if(user && (await bcrypt.compare(password, user.password))){
            // Create token
            const paylod = {username};
            const accessToken = await this.jwtService.sign(paylod);
            return {accessToken}
        }else {
            throw new UnauthorizedException("login failed");
        }
            
    }
}
