import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity';

@Entity()
export class CoffeeToFlavor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coffee, (coffee) => coffee.coffeeToFlavors)
  @JoinColumn()
  coffee: Coffee;

  @ManyToOne(() => Coffee, (flavor) => flavor.coffeeToFlavors)
  @JoinColumn()
  flavor: Flavor;
}
