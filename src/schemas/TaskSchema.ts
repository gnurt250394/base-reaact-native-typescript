import {ObjectId} from 'bson';

class TaskSchema {
  date: Date;
  name: string;
  services: any[];
  _id: ObjectId;
  constructor({name, data, id = new ObjectId(), date = new Date()}) {
    this.services = data;
    this._id = id;
    this.date = date;
    this.name = name;
  }

  static serviceSchema = {
    name: 'Service',
    properties: {
      name: 'string',
      price: 'int',
      count: 'int',
    },
  };
  static schema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      date: 'date',
      name: 'string',
      services: 'Service[]',
    },
    primaryKey: '_id',
  };
}

export {TaskSchema};
