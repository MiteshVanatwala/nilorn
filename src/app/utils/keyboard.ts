import { KeyboardEvent } from 'react';

export function handleOnEnter(e: KeyboardEvent, handler: () => void) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handler();
  }
}
