import { Request } from "express";

export interface NewRequest extends Request{
    userId?:string
}