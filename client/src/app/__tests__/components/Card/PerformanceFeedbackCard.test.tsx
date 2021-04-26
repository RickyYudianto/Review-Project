import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import React from 'react';
import PerformanceFeedbackCard from '../../../components/Card/PerformanceFeedbackCard';
import PerformanceFeedback from '../../../models/performance-feedback.model';
import Reviewer from '../../../models/reviewer.model';
import UserPerformanceFeedback from '../../../models/user-performance-feedback.model';

import '../../../../locales/i18n';

let mount;

configure({ adapter: new Adapter() });
describe('<PerformanceFeedbackCard />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render with PerformanceFeedback data and match the snapshot', () => {
    const data = {
      ...new UserPerformanceFeedback(),
      performanceFeedbacks: [
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 1,
            name: 'reviewer 1',
            email: 'reviewer1@gmail.com',
          },
          score: 1,
          feedback: 'feedback 1',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 2,
            name: 'reviewer 2',
            email: 'reviewer2@gmail.com',
          },
          score: 2,
          feedback: 'feedback 2',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 3,
            name: 'reviewer 3',
            email: 'reviewer3@gmail.com',
          },
          score: 3,
          feedback: 'feedback 3',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 4,
            name: 'reviewer 4',
            email: 'reviewer4@gmail.com',
          },
          score: 4,
          feedback: 'feedback 4',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 5,
            name: 'reviewer 5',
            email: 'reviewer5@gmail.com',
          },
          score: 5,
          feedback: 'feedback 5',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 6,
            name: 'reviewer 6',
            email: 'reviewer6@gmail.com',
          },
          score: 0,
          feedback: '',
        },
      ],
    };
    const component = mount(
      <PerformanceFeedbackCard userPerformanceFeedback={data} />,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should render without PerformanceFeedback data and match the snapshot', () => {
    const data = new UserPerformanceFeedback();
    const component = mount(
      <PerformanceFeedbackCard userPerformanceFeedback={data} />,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('toggle expand button', async () => {
    const data = {
      ...new UserPerformanceFeedback(),
      performanceFeedbacks: [
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 1,
            name: 'reviewer 1',
            email: 'reviewer1@gmail.com',
          },
          score: 1,
          feedback: 'feedback 1',
        },
        {
          ...new PerformanceFeedback(),
          reviewer: {
            ...new Reviewer(),
            id: 6,
            name: 'reviewer 6',
            email: 'reviewer6@gmail.com',
          },
          score: 0,
          feedback: '',
        },
      ],
    };

    const component = mount(
      <PerformanceFeedbackCard userPerformanceFeedback={data} />,
    );
    act(() => {
      component.find(IconButton).props().onClick();
    });
    component.update();
    component.find(Collapse).props();
    expect(component.find(Collapse).props().in).toBeTruthy();

    act(() => {
      component.find(IconButton).props().onClick();
    });
    component.update();
    component.find(Collapse).props();
    expect(component.find(Collapse).props().in).toBeFalsy();
  });
});
