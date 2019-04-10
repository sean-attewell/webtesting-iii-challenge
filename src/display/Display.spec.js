// Test away!
import React from 'react';
import * as rt from 'react-testing-library';
import "jest-dom/extend-expect";
import Display from './Display';

afterEach(rt.cleanup);

describe('Display', () => {

  it('displays Closed if the closed prop is true', () => {
    const wrap = rt.render(<Display closed={true} locked={false}/>);
    expect(wrap.getByText(/closed/i)).toBeTruthy();;
  })

  it('displays Open if the closed prop is false', () => {
    const wrap = rt.render(<Display closed={false} locked={false}/>);
    expect(wrap.getByText(/open/i)).toBeTruthy();;
  })

  it('displays Locked if the locked prop is true', () => {
    const wrap = rt.render(<Display closed={true} locked={true}/>);
    expect(wrap.getByText(/\blocked\b/i)).toBeTruthy();;
  })

  it('displays Unlocked if the locked prop is false', () => {
    const wrap = rt.render(<Display closed={true} locked={false}/>);
    expect(wrap.getByText(/unlocked/i)).toBeTruthy();;
  })

  it("when locked or closed use the red-led class", () => {
    const wrap = rt.render(<Display locked={true} closed={false}/>);
    expect(wrap.queryByText(/\blocked\b/i).classList.contains("red-led")).toBe(true);
    
    const wrap2 = rt.render(<Display locked={false} closed={true} />);
    expect(wrap2.queryByText(/\bclosed\b/i).classList.contains("red-led")).toBe(true);
  });

  it("when unlocked or open use the green-led class", () => {
    const wrap = rt.render(<Display locked={false} closed={true} />);
    expect(wrap.queryByText(/\bunlocked\b/i).classList.contains("green-led")).toBe(true);
    
    const wrap2 = rt.render(<Display locked={true} closed={false} />);
    expect(wrap2.queryByText(/\open\b/i).classList.contains("green-led")).toBe(true);
  });


})