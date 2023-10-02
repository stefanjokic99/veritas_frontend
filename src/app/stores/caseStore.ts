import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { CourtCase } from "../../models/case";

export default class CaseStore {
  caseRegistry = new Map<string, CourtCase>();
  selectedCase: CourtCase | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadCases = async () => {
    this.setLoadingInitial(true);
    try {
      const cases =  [
        {
          Id: "1",
          Name: "Parnični predmet XYZ",
          Description: "Sudski predmet broj 1234567 odnosi se na spor između dviju kompanija, ABC Corporation i XYZ Inc. ABC Corporation tuži XYZ Inc. za navodnu povredu ugovora o isporuci robe. Slučaj uključuje složene pravne argumente i mnogo dokumentacije.",
          Status: "Aktivan",
          Type: {
            Id: "P",
            Name: "Parnični predmeti"
          },
          Department: {
            Id: "Trg",
            Name: "Trgovinsko pravo"
          }
        },
        {
          Id: "2",
          Name: "Krivični predmet ABC",
          Description: "Sudski predmet broj 7890123 odnosi se na krivičnu optužbu protiv Johna Doe-a zbog pronevjere sredstava u iznosu od 100.000 dolara. John Doe je optužen za zloupotrebu povjerenja i suočava se s kaznenim postupkom.",
          Status: "Zatvoren",
          Type: {
            Id: "K",
            Name: "Krivični predmeti"
          },
          Department: {
            Id: "Krim",
            Name: "Krivično pravo"
          }
        },
        {
          Id: "3",
          Name: "Privredni predmet 123",
          Description: "Sudski predmet broj 555555 odnosi se na spor između ABC Corporation i Smith Manufacturing zbog nesporazuma oko ugovora o isporuci opreme za proizvodnju. Strane se pokušavaju nagoditi putem medijacije.",
          Status: "Aktivan",
          Type: {
            Id: "Ps",
            Name: "Privredni predmeti"
          },
          Department: {
            Id: "Korp",
            Name: "Korporativno/pravo društava"
          }
        },
        {
          Id: "4",
          Name: "Izvršenje građansko",
          Description: "Sudski predmet broj 1111111 odnosi se na izvršenje građanskog sudskog naloga u korist Mary Smith protiv Johna Johnsona. Mary Smith je dobitnica sudske presude i traži izvršenje sudske odluke.",
          Status: "Aktivan",
          Type: {
            Id: "I",
            Name: "Izvršenje građansko"
          },
          Department: {
            Id: "Up",
            Name: "Upravno pravo"
          }
        },
        {
          Id: "5",
          Name: "Stečajni predmet DEF",
          Description: "Sudski predmet broj 987654 odnosi se na stečajni postupak kompanije DEF Holdings Inc. Kompanija je zatražila stečaj nakon financijskih problema. Sudski postupak uključuje prodaju imovine i namirenje vjerovnika.",
          Status: "Aktivan",
          Type: {
            Id: "St",
            Name: "Stečajni predmeti"
          },
          Department: {
            Id: "Fin",
            Name: "Financijsko pravo"
          }
        }
      ];
      
      
      cases.forEach((courtCase) => {
        this.setCase(courtCase);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  private setCase = (courtCase: CourtCase) => {
    this.caseRegistry.set(courtCase.Id, courtCase);
  };

  private getCase = (id: string) => {
    return this.caseRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createCase = async (courtCase: CourtCase) => {
    courtCase.Id = uuid();
    try {
      await agent.CourtCase.create(courtCase);
      this.setCase(courtCase);
      runInAction(() => {
        this.selectedCase = courtCase;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
