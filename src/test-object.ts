export class TestObject {
  public static readonly OBJECT_1 = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    hobbies: ['reading', 'traveling', 'hiking'],
  };

  public static readonly OBJECT_2 = {
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: new Date(),
    author: {
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
    tags: ['lorem', 'ipsum', 'dolor'],
  };

  public static readonly OBJECT_3 = {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    phone: '+1 (555) 555-1234',
    address: {
      street: '456 Second St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    orders: [
      {
        id: '001',
        items: [
          {
            sku: 'ABC123',
            name: 'Product A',
            quantity: 2,
            price: 10.99,
          },
          {
            sku: 'DEF456',
            name: 'Product B',
            quantity: 1,
            price: 19.99,
          },
        ],
        total: 41.97,
      },
      {
        id: '002',
        items: [
          {
            sku: 'GHI789',
            name: 'Product C',
            quantity: 3,
            price: 5.99,
          },
        ],
        total: 17.97,
      },
    ],
  };

  public static readonly OBJECT_4 = {
    string: 'Hello, world!',
    number: 42,
    boolean: true,
    null: null,
    array: [1, 2, 3],
    object: { name: 'John', age: 30 },
    date: new Date().toISOString(),
    regex: '^([a-z]+)+$',
  };
}
