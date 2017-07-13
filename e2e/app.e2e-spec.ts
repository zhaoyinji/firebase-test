import { ListAppPage } from './app.po';

describe('list-app App', () => {
  let page: ListAppPage;

  beforeEach(() => {
    page = new ListAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
