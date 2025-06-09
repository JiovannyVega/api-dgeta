import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const message = await this.messageService.findOne(+id);
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    const updated = await this.messageService.update(+id, updateMessageDto);
    if (!updated) throw new NotFoundException(`Message #${id} not found`);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.messageService.remove(+id);
    if (!deleted) throw new NotFoundException(`Message #${id} not found`);
    return { deleted: true };
  }

  @Get('receiver/:receiverId')
  async findByReceiverId(@Param('receiverId') receiverId: string) {
    return this.messageService.findByReceiverId(+receiverId);
  }

  @Get('sender/:senderId')
  async findBySenderId(@Param('senderId') senderId: string) {
    return this.messageService.findBySenderId(+senderId);
  }
}
