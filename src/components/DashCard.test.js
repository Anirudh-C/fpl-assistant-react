import React from 'react';
import { shallow } from 'enzyme';
import DashCard from './DashCard';

describe('DashCard', () => {
    it('should render correctly', () => {
        const component = shallow(<DashCard visible={true}/>);
    });
});
