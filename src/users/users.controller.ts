import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ description: 'เพิ่มข้อมูลสำเร็จ' })
  async create(@Body() createUserDto: CreateUserDto) {
    try{
      const CreateData = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        StatusCode : HttpStatus.OK,
        message:'Create Data Successfully',
        data : CreateData
      });
    }catch(err){
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status : false ,
        message : "Error !!"
      });
    }
  }

  @Get()
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลทั้งหมด' })
  async findAll(@Res() response) {
    try {
      const UserData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        StatusCode : HttpStatus.OK,
        message: 'แสดงข้อมูลทั้งหมด', 
        UserData,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode : HttpStatus.BAD_GATEWAY,
        Message: "Server Error"
      });
    }
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลเดียว' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ status: 200, description: 'แก้ไขข้อมูลสำเร็จ' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'ลบข้อมูลสำเร็จ' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
