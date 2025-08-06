import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Injectable, Type } from '@nestjs/common';
import { Item } from '../../../schemas/item.schema';
import { Store } from '../../../schemas/store.schema';
import { UserDocument } from '../../../schemas/user.schema';
import { UserAction } from '../../types/user-actions';

type Subjects = Item | Store;

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
      detectSubjectType: (subject) => {
        // Ép kiểu subject.constructor thành 'any' để bỏ qua kiểm tra của TypeScript
        // Hoặc ép kiểu thành một object có thuộc tính modelName
        const constructor = subject.constructor as {
          modelName?: 'Item' | 'Store';
        };

        return constructor.modelName === 'Item'
          ? Item
          : constructor.modelName == 'Store'
            ? Store
            : (subject.constructor as Type<Subjects>);
      },
    });
  }
}
