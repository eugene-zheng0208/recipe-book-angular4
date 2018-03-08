import { TaskAppPage } from './app.po';

describe('task-app App', function() {
  let page: TaskAppPage;

  beforeEach(() => {
    page = new TaskAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
