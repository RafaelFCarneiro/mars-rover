import { Test, TestingModule } from '@nestjs/testing';
import { RoverDeployService } from './rover-deploy.service';

describe('RoverDeployService', () => {
  let service: RoverDeployService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoverDeployService],
    }).compile();

    service = module.get<RoverDeployService>(RoverDeployService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
