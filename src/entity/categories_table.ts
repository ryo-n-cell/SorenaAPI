import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";

@Entity({ synchronize: false })
export class categories_table {

    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category_name: string;

    // @Column()
    // Created_at: Timestamp;
}
