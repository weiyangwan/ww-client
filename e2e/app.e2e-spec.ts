import { WwClientPage } from './app.po';

describe('ww-client App', function() {
  let page: WwClientPage;

  beforeEach(() => {
    page = new WwClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
