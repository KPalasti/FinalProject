import { Address } from "./address";
import { Business } from "./business";
import { Problem } from "./problem";
import { Solution } from "./solution";
import { User } from "./user";

export class ServiceCall {
  id: number;
  address: Address | undefined;
  // problem: Problem;
  problem: Problem = new Problem();
  solution: Solution = new Solution();
  // solution: Solution;
  problemDescription: string | undefined;
  dateCreated: Date | undefined;
  dateScheduled: Date | undefined;
  completed: boolean;
  totalCost: number | undefined;
  estimate: boolean | undefined;
  hoursLabor: number | undefined;
  contractorNotes: string | undefined;
  business: Business | undefined;
  user: User | undefined;
  customerRating: number | undefined;
  customerRatingComment: string | undefined;

  constructor(
    id: number = 0,
    address?: Address,
    problem?: Problem,
    solution?: Solution,
    problemDescription?: string,
    dateCreated?: Date,
    dateScheduled?: Date,
    completed: boolean  = false,
    totalCost?: number,
    estimate?: boolean,
    hoursLabor?: number,
    contractorNotes?: string,
    business?: Business,
    user?: User,
    customerRating?: number,
    customerRatingComment?: string
    ){
      this.id = id;
      this.address = address;
      this.problem = problem? problem: new Problem();
      this.solution = solution? solution : new Solution();
      this.problemDescription = problemDescription;
      this.dateCreated = dateCreated;
      this.dateScheduled = dateScheduled;
      this.completed = completed;
      this.totalCost = totalCost;
      this.estimate = estimate;
      this.hoursLabor = hoursLabor;
      this.contractorNotes = contractorNotes;
      this.business = business;
      this.user = user;
      this.customerRating = customerRating;
      this.customerRatingComment = customerRatingComment;

    }

}
