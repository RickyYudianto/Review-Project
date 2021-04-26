import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { App } from '../index';

const renderer = createRenderer();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: key => key }),
}));

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
