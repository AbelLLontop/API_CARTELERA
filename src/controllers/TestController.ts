import { Request, Response } from "express";
import axios from "axios";
export class TestController{
    public async test(req:Request,res:Response){
        try{
           
        res.json("ready");
            
        }catch(e){ 
            console.log("error")
            res.status(401).send({message:"Error"});
        }
    }
}
