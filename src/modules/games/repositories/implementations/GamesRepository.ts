import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const retorno = await this.repository
    .createQueryBuilder('game').where('LOWER(game.title) like LOWER(:title)', { title: `%${param}%` }).getMany();

    return retorno;
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.userRepository
    .createQueryBuilder('user').leftJoin('user.games', 'game').where('game.id = :id', {id}).getMany();

    return users;
      // Complete usando query builder
  }
}
