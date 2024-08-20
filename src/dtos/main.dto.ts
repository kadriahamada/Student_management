abstract class EntityMain {
  creationDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
  deletedBy: string;
  deletedDate: Date;
}

export abstract class EntityPrimaryNumber extends EntityMain {
  id: number;
}

export abstract class EntityPrimaryString extends EntityMain {
  id: string;
}
