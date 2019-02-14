import { forOwn } from 'lodash';
// import bcrypt from 'bcrypt';
import {
  login,
  order,
  cash,
  router,
  role,
  room,
  article,
  location,
} from './schema';

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/phelomi', { useNewUrlParser: true });

const {
  connection: db,
  Schema,
  model: Model,
} = mongoose;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));

// 檢查是否有需要轉換成Schema特有的類型, 大多為ObjectId
function initSchema(schema) {
  forOwn(schema, (value, key) => {
    const { type } = (typeof value === 'object') ? value : { type: value };
    const target = (typeof value === 'object') ? value : {};
    if (typeof type === 'string') schema[key] = { ...target, type: Schema.Types[type] };
  });
  return Schema(schema, { versionKey: false });
}

const loginSchema = initSchema(login);
// loginSchema.virtual('passwordHash').set(async function bcryptPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(password, salt);
//   console.log(this);
//   this.password = passwordHash;
// });

const orderSchema = initSchema(order);

const cashSchema = initSchema(cash);

const routerSchema = initSchema(router);

const roleSchema = initSchema(role);

const roomSchema = initSchema(room);

const articleSchema = initSchema(article);

const locationSchema = initSchema(location);

// model
const Models = {
  User: Model('User', loginSchema),
  Order: Model('Order', orderSchema),
  Cash: Model('Cash', cashSchema),
  Router: Model('Router', routerSchema),
  Role: Model('Role', roleSchema),
  Room: Model('Room', roomSchema),
  Article: Model('Article', articleSchema),
  Location: Model('Location', locationSchema),
};

export {
  Models,
  db,
  Schema,
};
