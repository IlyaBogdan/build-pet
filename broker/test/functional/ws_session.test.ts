
import { SessionStore, WsSession } from '../../src/SessionStore';
import { expect } from 'chai';
import { UserDto } from '../../src/brokers/dto/user.dto';

describe('Test class WsSession', () => {

  const user: UserDto = { id: 1, email: 'testemail@gmail.com', first_name: 'Tester', created_at: new Date() };
  const token: string = 'test_user_token';
  let wsSession: WsSession|undefined;

  it('test method `addConnection`', () => {
    return true;
  });

  it('test method `removeConnection`', () => {
    return true;
  });

  it('test method `getConnections`', () => {
    return true;
  });

  it('test method `setOnline`', () => {
    return true;
  });

  it('test method `getOnline`', () => {
    return true;
  });
});