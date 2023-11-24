

import { BaseEntity } from "src/common/base.entity";
import { Entity, Column } from "typeorm";


@Entity()

export class Product extends BaseEntity {


    @Column()
    public name : string;

    @Column()
    public price : number;



}
