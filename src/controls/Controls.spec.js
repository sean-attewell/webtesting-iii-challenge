// Test away!
import React from 'react';
import * as rt from 'react-testing-library';
import "jest-dom/extend-expect";
import Controls from './Controls';
import Dashboard from "../dashboard/Dashboard";


afterEach(rt.cleanup);

function setUpWrap(props = {}) {
  rt.cleanup();
  return rt.render(<Controls {...props} />);
}

describe('Controls', () => {
  let wrap;

  beforeEach(() => {
    wrap = setUpWrap();
  })

  it('provide buttons to toggle the closed and locked states.', () => {
    expect(wrap.getByTestId('lockUnlockButton')).toBeTruthy();;
    expect(wrap.getByTestId('closeOpenButton')).toBeTruthy();;
  })


  it('button text shows Unlock Gate if locked prop is true', () => {
    wrap = setUpWrap( { locked: true, closed: true });
    expect(wrap.getByText(/\bunlock gate\b/i)).toBeTruthy();;
  })

  it('button text shows Lock Gate if locked prop is flase', () => {
    wrap = setUpWrap( { locked: false, closed: true });
    expect(wrap.getByText(/\block gate\b/i)).toBeTruthy();;
  })

  it("the locked toggle button is disabled if the gate is open", () => {
    wrap = setUpWrap( { locked: false, closed: false });
    // expect(wrap.queryByTestId(/lockUnlockButton/i).disabled).toBe(true);
    expect(wrap.queryByTestId(/lockUnlockButton/i)).toBeDisabled()
  });

  it('button text shows Close Gate if closed prop is false', () => {
    wrap = setUpWrap( { locked: false, closed: false });
    expect(wrap.getByText(/\bclose gate\b/i)).toBeTruthy();;
  })

  it('button text shows Open Gate if closed prop is true', () => {
    wrap = setUpWrap( { locked: false, closed: true });
    expect(wrap.getByText(/\bopen gate\b/i)).toBeTruthy();;
  })

  it("the closed toggle button is disabled if the gate is locked", () => {
    wrap = setUpWrap( { locked: true, closed: true });
    expect(wrap.queryByTestId(/closeOpenButton/i)).toBeDisabled();
  });

  // it('locked toggle button text changes if clicked', async () => {
  //   const wrap2 = rt.render(<Dashboard />);
  //   expect(wrap2.getByText(/\block gate\b/i)).toBeTruthy();

  //   rt.fireEvent.click(wrap2.queryByTestId(/closeOpenButton/i));
  //   await wrap2.findByText(/\bopen gate\b/i);

  //   rt.fireEvent.click(wrap2.queryByTestId(/lockUnlockButton/i));
  //   const unlockedButtonElement = await wrap2.findByText(/\bUnlock Gate\b/i);

  //   expect(unlockedButtonElement).toBeTruthy(); 
  // })

})