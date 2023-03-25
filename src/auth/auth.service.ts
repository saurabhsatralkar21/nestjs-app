import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    
    @InjectRepository(User) private readonly userRepository: Repository<User>;

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = this.createUser({ username, password });
        await this.save(user);
    }
    save(user: Promise<void>) {
        throw new Error('Method not implemented.');
    }
 
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.createUser(authCredentialsDto);
    }
 

}
