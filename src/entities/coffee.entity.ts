import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeeToFlavor } from './coffee-to-flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CoffeeToFlavor, (ctf) => ctf.coffee, { cascade: true })
  coffeeToFlavors: CoffeeToFlavor[];
}
