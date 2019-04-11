// Test away
import React from 'react';
import * as rt from 'react-testing-library';
import "jest-dom/extend-expect";
import Dashboard from './Dashboard';

afterEach(rt.cleanup);

function setUpWrap(props = {}) {
  rt.cleanup();
  return rt.render(<Dashboard {...props} />);
}


describe('Dashboard', () => {
  let wrap;

  beforeEach(() => {
    wrap = setUpWrap();
  });

  it('Defaults to unlocked and open', () => {
    expect(wrap.getByText(/unlocked/i)).toBeTruthy();
    expect(wrap.getByText(/\bopen\b/i)).toBeTruthy(); 
    expect(wrap.getByText(/\bclose gate\b/i)).toBeTruthy(); 
  })

  it('Cannot be closed or opened if it is locked', async () => {
    // expect({}).toMatchObject(wrap);
    const closeOpenButton = wrap.queryByTestId(/closeOpenButton/i)
    const lockUnlockButton = wrap.queryByTestId(/lockUnlockButton/i)

    rt.fireEvent.click(closeOpenButton);
    const closedElement = await wrap.findByText(/\bclosed\b/i); // findBy wraps Getby with a wait
    expect(closedElement).toBeTruthy(); 

    rt.fireEvent.click(lockUnlockButton);
    const lockedElement = await wrap.findByText(/\blocked\b/i); 
    expect(lockedElement).toBeTruthy(); 

    rt.fireEvent.click(closeOpenButton);
    const closedElement2 = await wrap.findByText(/\bclosed\b/i);
    expect(closedElement2).toBeTruthy()
    expect(wrap.queryByText(/\bclose gate\b/i)).toBeFalsy()
  })

  it('Cannot be closed or opened if it is locked v2', async () => {
    rt.fireEvent.click(wrap.queryByTestId(/closeOpenButton/i));
    await wrap.findByText(/\bclosed\b/i);
    rt.fireEvent.click(wrap.queryByTestId(/lockUnlockButton/i));
    await wrap.findByText(/\blocked\b/i);
    expect(wrap.queryByTestId(/closeOpenButton/i)).toBeDisabled();
  })


})