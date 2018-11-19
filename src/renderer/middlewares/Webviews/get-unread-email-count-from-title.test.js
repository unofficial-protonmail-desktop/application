import { expect } from 'chai';
import getUnread from './get-unread-email-count-from-title';

describe('middlewares/Webviews/getUnreadEmailCountFromTitle', () => {
  it('should returns digits that\'s present before "Inbox"', () => {
    const count = 8;
    const title = `(${count}) Inbox`;

    expect(getUnread(title)).to.equal(count);
  });

  it('should return 0 when there\'s no digits before "Inbox"', () => {
    expect(getUnread('Inbox')).to.equal(0);
  });

  it('should return accurate value when the amount is separated by a space', () => {
    expect(getUnread('(1 000) Inbox')).to.equal(1000);
  });

  it('should return null if "Inbox" isnt found in title', () => {
    expect(getUnread('Outbox')).to.equal(null);
  });
});
