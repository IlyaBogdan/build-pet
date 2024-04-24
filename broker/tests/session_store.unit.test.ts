
import { SessionStore } from '../src/SessionStore';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';

_chai.should();
_chai.expect;

@suite class SessionStoreModuleTest {
  private SUT: SessionStore;

  before() {
    this.SUT = new SessionStore();
  }
}