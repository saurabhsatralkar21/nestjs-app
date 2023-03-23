
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";


@EntityRepository()
export class BoardRepository extends Repository<Board>
{

}

