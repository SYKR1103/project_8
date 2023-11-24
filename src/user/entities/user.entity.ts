


import { BaseEntity } from "src/common/base.entity";
import { Entity, Column } from "typeorm";

@Entity()


export class User extends BaseEntity{

    @Column()
    public nickname : string;

    @Column()
    public email : string;

    @Column()
    public password : string;


}
