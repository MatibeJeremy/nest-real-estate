import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateBidsDto } from './data/dto/create-bids.dto';
import { BidsService } from './bids.service';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBidDto: CreateBidsDto,
  @CurrentUser() user: any,
  ): Promise<CreateBidsDto> {
    return this.bidsService.create(createBidDto, user);
  }
}
