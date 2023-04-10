import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
//import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class BoardsService {


    @InjectRepository(Board) private readonly boardRepository: Repository<Board>;


    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        await this.boardRepository.save(board);

        return board;
    }

    async getBoardById(id: number, user: User): Promise<Board> {
        // const found = await this.boardRepository.findOne({where:{id,}} );

        const options: FindOneOptions<Board> = {
            where: {
              id: 1,
              userId: user.id,
            },
          };

        const found = await this.boardRepository.findOne(options);

        if(!found)
        throw new NotFoundException(`Can't find board with ${id}`)
        
        
    return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find(board => board.id === id);
    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log(result);

        if(result.affected === 0)
            throw new NotFoundException(`Can't find the board with id: ${id}`)
        
    }

    async updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board> {
        const board = await this.getBoardById(id, user);
        board.status = status;

        await this.boardRepository.save(board);
        return board;
    }

}
