import { BidsService } from '../bids.service';
import { CreateBidsDto } from '../data/dto/create-bids.dto';
import { Utils } from '../../utils/utils';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BidsServiceImplementation extends BidsService {
  constructor(
    private readonly utils: Utils,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }
  async create(createBidsDto: CreateBidsDto, user: any): Promise<any> {
    const userDetails = await this.utils.validateUserPermissions(
      user,
      'CONTRACTOR',
    );
    const createdBid = await this.prismaService.bid.create({
      data: {
        ...createBidsDto,
        contractorId: userDetails.userId,
      },
    });
    return {
      status: 'success',
      message: 'Bid created successfully',
      bid: createdBid,
    };
  }
}
