import { CreateBidsDto } from './data/dto/create-bids.dto';

export abstract class BidsService {
  abstract create(createBidsDto: CreateBidsDto, user: any): Promise<any>;
}
