import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '../../../utils/backendRequest';
import { mockUserInfo } from '../__mocks__/api__pull.mock';

const userToken = '345678iaisdauh';
const url = `${BACKEND_URL}/api/user?token=${userToken}`;

describe('Test for API methods of ChatBroker (`pull`)', () => {

  it('Info about connected user successfully accepted', () => {
    fetchMock.mock({
      url,
      method: 'GET',
      response: mockUserInfo
    })
    

    
  });
});