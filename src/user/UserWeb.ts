import { v4 as uuidv4 } from 'uuid';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import * as prismaClientNs from '@prisma/client';
// import { default as prismaClientNs } from '@prisma/client';


declare const UserWebIdSymbol: unique symbol;
/** Do i really want to couple UserId with Auth0? no?.. */
export type UserWebId = string & { [UserWebIdSymbol]: never };

declare const UserAuth0IdSymbol: unique symbol;
export type UserAuth0Id = string & { [UserAuth0IdSymbol]: never };

// aga ok then that pb seems just sync the class .. & inheritance maybe ... (that see
export class UserWeb implements prismaClientNs.UserWeb {
  public readonly userWebId: UserWebId = uuidv4() as UserWebId;
  public readonly userAuth0Id: UserAuth0Id | null; // hum the prisma force use of null
  public username: string;
  public readonly email: string;
  @Type(() => Date)
  public readonly creationTime: Date = new Date();
  @Type(() => Date)
  public lastLoginTime: Date | null;
  public rank: number | null;
  public det_Anonymous: boolean;
  public seq_debug: number | null;

  constructor(userAuth0Id: UserAuth0Id | null, username: string, email: string, lastLoginTime: Date | null, rank: number | null, det_Anonymous: boolean, seq_debug?: number) {
    this.userAuth0Id = userAuth0Id;
    this.username = username;
    this.email = email;
    this.lastLoginTime = lastLoginTime;
    this.rank = rank;
    this.det_Anonymous = det_Anonymous;
    this.seq_debug = seq_debug ?? null;
  }

  // // said uncertain the place of the Map ... the manage of ConnSession (& vs xstate .. t em
  // // t ; b ref format ... conveni sttttttt
  // /**
  //  * said data will be stored in Server, this just temp
  //  */
  // // actually the userWeb is serialized from server -- it wont have all those message .... // t design & those hibernate fk side design
  // @Type(() => Map<UserWebId, ChatMessageInfo[]>)
  // public readonly mpp_PeerChatMsgs = new Map<UserWebId, ChatMessageInfo[]>();
}
