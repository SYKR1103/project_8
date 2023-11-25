import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";


//로그인 관련 보안목적으로 추가된 모듈


@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {



    constructor(private authservice:AuthService){
        super({
            usernameField : 'email',
        })

     }

     //로그인 요청 -> local-auth.guard(local-auth.st를 활용) -> authservice.loginuser -> 됐냐 안됐냐 
     async validate(email: string, password : string) : Promise<User> {



        return await this.authservice.loginU({email, password})


     }



}
