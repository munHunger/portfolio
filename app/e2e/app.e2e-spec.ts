import { WunderbarenPage } from './app.po';

describe('wunderbaren App', () => {
  let page: WunderbarenPage;

  beforeEach(() => {
    page = new WunderbarenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
