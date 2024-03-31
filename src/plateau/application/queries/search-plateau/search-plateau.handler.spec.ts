import { Test, TestingModule } from "@nestjs/testing";
import { DIIdentifiers, IPlateauRepository } from "../../interfaces";
import { CqrsModule } from "@nestjs/cqrs";
import { mock } from "jest-mock-extended";
import { SearchPlateauQuery } from "./search-plateau.query";
import { SearchPlateauHandler } from "./search-plateau.handler";

describe("SearchPlateauHandler", () => {
  const repoMock = mock<IPlateauRepository>();
  let handler: SearchPlateauHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        SearchPlateauHandler,
        { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
      ],
    }).compile();

    handler = module.get<SearchPlateauHandler>(SearchPlateauHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("should call the repository to get the plateau", async () => {
    const query: SearchPlateauQuery = { name: "some-name" };
    await handler.execute(query);
    expect(repoMock.search).toBeCalledWith(query);
  });
});
