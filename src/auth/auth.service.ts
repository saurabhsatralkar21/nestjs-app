import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
 

}
