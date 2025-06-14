import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeeToFlavor } from './coffee-to-flavor.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CoffeeToFlavor, (ctf) => ctf.flavor)
  coffeeToFlavors: CoffeeToFlavor[];
}
