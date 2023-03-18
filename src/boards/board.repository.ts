import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./board.entity";


@Injectable()
export class BoardRepository extends Repository<Board>
{

}
