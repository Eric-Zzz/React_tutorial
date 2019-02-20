import React from 'react';
import Square from './Square';
import { shallow } from 'enzyme';

describe('There are some components', function () {
    //setup
    let wrapper = shallow(<Square/>);

    it('square component', function () {
        //action
        // expect(wrapper.find('button').length).toEqual(1);
        // expect(wrapper.find('button').exists()).toBeTruthy();
        expect(wrapper.exists('button')).toBeTruthy();
        //assertion
    });
});


