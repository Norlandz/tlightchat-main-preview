import { v4 as uuidv4 } from 'uuid';
import { UserWebId } from '../../user/UserWeb';
import { Type } from 'class-transformer';
import 'reflect-metadata';                                          
import * as prismaClientNs from '@prisma/client';
                                                              


export class ChatMessageInfo implements prismaClientNs.ChatMessageInfo {
  public readonly uuid = uuidv4();
  @Type(() => Date)
  public readonly creationTime = new Date();

                                                         
  public readonly msgType: ChatMsgType;
  public readonly msgData: string;

  public readonly msgFromId: UserWebId;
  public readonly msgToId: UserWebId;

  public seq_debug: number | null;

  constructor(msgType: ChatMsgType, msgData: string, msgFromId: UserWebId, msgToId: UserWebId, seq_debug?: number) {
    this.msgType = msgType;
    this.msgData = msgData;
    this.msgFromId = msgFromId;
    this.msgToId = msgToId;
    this.seq_debug = seq_debug ?? null;
  }
}

export enum ChatMsgType {
  text = 'text',
                     
}