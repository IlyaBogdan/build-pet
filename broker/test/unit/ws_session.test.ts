
import { WsSession } from '../../src/SessionStore';
import { expect } from 'chai';
import { UserDto } from '../../src/brokers/dto/user.dto';

describe('Test class WsSession', () => {

  const user: UserDto = { id: 1, email: 'testemail@gmail.com', first_name: 'Tester', created_at: new Date() };
  const token: string = 'test_user_token';
  const sessionId: string = 'qwertyuiop';
  let wsSession: WsSession|undefined;

  it('init new session', () => {
    wsSession = new WsSession({ user, sessionId });
  });

  it('test method `addToken`', () => {
    wsSession.addToken(token);
  });
  
  it('test method `removeToken`', () => {
    wsSession.removeToken(token);
  });

  it('test methods `getOnline` and `setOnline`', () => {
    wsSession.setOnline(true);
    expect(wsSession.getOnline() == true);

    wsSession.setOnline(false);
    expect(wsSession.getOnline() == false);
  });

  it('test method `getSessionId`', () => {
    expect(wsSession.getSessionId() == sessionId);
  });

  it('test method `getUser`', () => {
    const result = wsSession.getUser();
    expect(result == user);
  });
});