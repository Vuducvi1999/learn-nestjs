import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { User } from 'src/schemas/user.schema';
import { UserAction } from 'src/shared/types/user-actions';

type Subjects = InferSubjects<
  typeof ItemSchema | typeof Item | typeof StoreSchema | typeof Store
>;

@Injectable()
export class CaslService {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can(UserAction.read, Item);
    can(UserAction.read, Store);
    can(UserAction.create, Store);

    if (user.stores) {
      can(UserAction.create, Item, {
        store: {
          $in: user.stores,
        },
      });
      can(UserAction.update, Item, {
        store: {
          $in: user.stores,
        },
      });
      can(UserAction.delete, Item, {
        store: {
          $in: user.stores,
        },
      });
      can(UserAction.update, Store, {
        owner: {
          _id: user._id,
        },
      });
      can(UserAction.delete, Store, {
        owner: {
          _id: user._id,
        },
      });
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
