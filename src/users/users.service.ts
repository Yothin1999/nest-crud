import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find(
        {
          select:
            [
              'firstName', 'lastName',
            ],
          order:{
            id: 'DESC'
          }
        }
      );
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne(
      {select:
        [
          'firstName', 
          'lastName',
        ], 
        where: {id: id}
      });
    return user;
  }

  async findOneby(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user == null) {
      return null;
    }
    return await this.usersRepository.delete(id);
  }
}
