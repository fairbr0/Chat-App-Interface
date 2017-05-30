import { ChatClientInterfacePage } from './app.po';

describe('chat-client-interface App', function() {
  let page: ChatClientInterfacePage;

  beforeEach(() => {
    page = new ChatClientInterfacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
