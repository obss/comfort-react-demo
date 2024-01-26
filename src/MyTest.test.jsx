import React from 'react';
import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComfortReactProvider, Button } from 'comfort-react';

test('renders Button component', () => {
    const label = 'aaa';
    render(
        <ComfortReactProvider>
            <Button>{label}</Button>
        </ComfortReactProvider>
    );
    const button = document.querySelector('button');
    expect(button).toHaveTextContent(label);
});
