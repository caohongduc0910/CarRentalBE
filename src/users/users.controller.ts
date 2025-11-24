import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    console.log(page, limit);
    return this.userService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
