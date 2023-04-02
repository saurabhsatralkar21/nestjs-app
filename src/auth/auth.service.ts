import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    
    @InjectRepository(User) private readonly userRepository: Repository<User>;

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;

        const user = await this.userRepository.create({ username, password });
        await this.userRepository.save(user);

        return user;
    }
  
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.createUser(authCredentialsDto);
    }
 

}
