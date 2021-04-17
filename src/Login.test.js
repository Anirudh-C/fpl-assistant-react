import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
    it('should render correctly', () => {
        const component = shallow(<Login />);
    });
});
