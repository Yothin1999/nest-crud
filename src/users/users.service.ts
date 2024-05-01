import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    ) {}

    async create(createUserDto: CreateUserDto){
        const users = this.usersRepository.create(createUserDto);
        const user = await this.usersRepository.findOneBy({ email:users.email });
        if(user){
            throw new HttpException(`มีอีเมลซ้ำไม่สามารถเพิ่มข้อมูลได้: ${user.email}`,HttpStatus.BAD_REQUEST)
        }
        await this.usersRepository.save(users);
        return users;
    }
    async createall(createUserDto: CreateUserDto[]) {
        const DupEmails: string[] = [];
        for (const user of createUserDto) {
            const existingUser = await this.usersRepository.findOneBy({ email: user.email });
            if (existingUser) {
                DupEmails.push(user.email);
            } else {
                await this.usersRepository.create(user);
            }
        }
    
        if (DupEmails.length > 0) {
            throw new HttpException(`มีอีเมลซ้ำไม่สามารถเพิ่มข้อมูลได้: ${DupEmails.join(", ")}`, HttpStatus.BAD_REQUEST);
        } else {
            const users = await this.usersRepository.save(createUserDto);
            return users;
        }
    }
    

    async findAll(): Promise<User[]> {
        return this.usersRepository.find(
            // { select: ['firstName', 'lastName',] }
        );
    }
    async findAllSQL(): Promise<User[]> {
        // return this.usersRepository.createQueryBuilder().select("*").where("firstName = :id",{id:'Yothin'}).getRawOne();
        return this.usersRepository.createQueryBuilder().select("*").getRawMany();
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ select: ['firstName', 'lastName',], where: { id: id } });
        if (!user) {
            throw new HttpException('ไม่พบข้อมูล', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findOneby(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('ไม่พบข้อมูล', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('ไม่สามารถอัปเดตข้อมูลได้ เนื่องจากไม่พบข้อมูล', HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: string) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('ไม่สามารถลบข้อมูลได้ เนื่องจากไม่พบข้อมูล', HttpStatus.NOT_FOUND);
        }
        return await this.usersRepository.delete(id);
    }
}
