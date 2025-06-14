import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './flavor.entity';
import { Coffee } from './coffee.entity';

@Entity()
export class CoffeeToFlavor {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => Coffee, (coffeee) => coffeee.coffeeToFlavors)
  coffee: Coffee;

  @JoinColumn()
  @ManyToOne(() => Flavor, (flavor) => flavor.coffeeToFlavors)
  flavor: Flavor;
}
