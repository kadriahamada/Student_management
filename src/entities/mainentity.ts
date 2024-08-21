export class MainEntity<T extends String | Number = number> {
  id: T;
  createdBy: string;
  creationDate: Date;
  updatedBy: string;
  updatedDate: Date;
  deletedBy: string;
  deletedDate: Date;
  isActive: 0 | 1;
}
