import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { DIIdentifiers, IPlateauRepository } from '../../interfaces';
import { CreatePlateauCommand } from './create-plateau.command';
import { CreatePlateauHandler, CreatePlateauErrors } from './create-plateau.handler';
import { Plateau, PlateauDimension } from './../../../domain/models';

describe('CreatePlateauHandler', () => {
  const repoMock = mock<IPlateauRepository>();

  describe("New", () => {
    let publisher: EventPublisher;  
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      publisher = moduleRef.get<EventPublisher>(EventPublisher);
    }); 
    
    it('should be defined', () => {
      expect(new CreatePlateauHandler(repoMock, publisher)).toBeDefined();
    });
  });  


  describe("Execute - Success", () => {
    let commandHandler: CreatePlateauHandler;
    let publisher: EventPublisher;

    const mockedValues = {
      id: 'plateau1',
      dimension: { height: 5, width: 5 }
    }
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<CreatePlateauHandler>(CreatePlateauHandler);
      publisher = moduleRef.get<EventPublisher>(EventPublisher);      
    }); 
    
    it('should create a plateau with valid id and dimension', async () => {
      const { id, dimension } = mockedValues;
      const mockedPlateau = createPlateauMock(id, dimension);
      const commitSpy = jest.spyOn(mockedPlateau, 'commit');
      const publishMergeObjectContextSpy = jest.spyOn(publisher, 'mergeObjectContext');

      repoMock
        .insert
        .mockReturnValue(Promise.resolve(mockedPlateau));

      const plateau = await commandHandler
        .execute(new CreatePlateauCommand(id, dimension));
      
      expect(plateau).toBeDefined();
      expect(plateau.id).toEqual(id);
      expect(plateau.dimension).toEqual(dimension);
      expect(publishMergeObjectContextSpy).toBeCalled();
      expect(commitSpy).toBeCalled();
      expect(repoMock.insert).toBeCalledWith(createPlateauMock(id, dimension));
    });

    it('should call findById method of IPlateauRepository with rightfully id param', () => {
      const { id, dimension } = mockedValues;

      repoMock
        .insert
        .mockReturnValue(Promise.resolve(createPlateauMock(id, dimension)));

      commandHandler
        .execute(new CreatePlateauCommand(id, dimension));
      
      expect(repoMock.findById).toHaveBeenCalledWith(id);
    });

    it('should call insert method of IPlateauRepository with rightfully Plateau param', () => {
      const { id, dimension } = mockedValues;

      repoMock
        .insert
        .mockReturnValue(Promise.resolve(createPlateauMock(id, dimension)));
      
      commandHandler
        .execute(new CreatePlateauCommand(id, dimension));
      
      const mockedPlateau = createPlateauMock(id, dimension);
      expect(repoMock.insert).toHaveBeenCalledWith(mockedPlateau);
    });
    
    it('should call publish method of EventPublisher', async () => {
      const { id, dimension } = mockedValues;      
      const mockedPlateau = createPlateauMock(id, dimension);
      
      const spy = jest
        .spyOn(publisher, 'mergeObjectContext')
        .mockReturnValue(mock<Plateau>());
      
      repoMock
        .insert
        .mockReturnValue(Promise.resolve(mockedPlateau));      
      
      await commandHandler.execute(new CreatePlateauCommand(id, dimension));
      
      expect(spy).toHaveBeenCalledWith(mockedPlateau);
    });        
  });
  
  describe("Execute - Validations", () => {
    let commandHandler: CreatePlateauHandler;

    const mockedValues = {
      id: 'plateau1',
      dimension: { height: 5, width: 5 }
    }
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<CreatePlateauHandler>(CreatePlateauHandler);
    });

    it('should throw validation plateau already exists for the given id', async () => {
      const { id, dimension } = mockedValues;
      
      repoMock
        .findById
        .mockReturnValue(Promise.resolve(createPlateauMock(id, dimension)));

      commandHandler
        .execute(new CreatePlateauCommand(id, dimension))
        .catch(error => expect(error.message)
          .toEqual(CreatePlateauErrors.PlateauAlreadyExist))      
    });      
  });
  
});

const createPlateauMock = (id: string, dimension: any) => {
  return new Plateau({  
    id, dimension: new PlateauDimension(dimension)
  });
}
