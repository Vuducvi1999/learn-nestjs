import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity';

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
