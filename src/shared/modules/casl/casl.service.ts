import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Item } from 'src/schemas/item.schema';
import { Store } from 'src/schemas/store.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { UserAction } from 'src/shared/types/user-actions';

type Subjects = InferSubjects<typeof Item | typeof Store>;

@Injectable()
export class CaslService {
  createForUser(user: UserDocument) {
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
          $eq: user._id,
        },
      });
      can(UserAction.delete, Store, {
        owner: {
          $eq: user._id,
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
