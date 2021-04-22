import React from 'react';
import { shallow } from 'enzyme';
import Compare from './Compare';

describe('Compare', () => {
    it('should render correctly', () => {
        const component = shallow(<DashCard visible={true}/>);
    });
});
