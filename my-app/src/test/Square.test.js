import React from 'react'
import Enzyme from './Enzyme.config';
import Square from '../component/Square';

const {shallow}=Enzyme;

describe('There are some components', function () {
    //setup
    let wrapper = shallow(<Square/>);

    it('square component', function () {
        //action
        expect(wrapper.find('button')).toExist();
        //assertion
    });
    it('p component', function () {
        expect(wrapper.find('p')).toExist();
    })
});


