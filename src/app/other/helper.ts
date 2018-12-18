import { MOBILE_WIDTH } from './constant';

/**
 * Determine whenever of screen to mobile resolution.
 */

export function isMobile(): boolean {
  return window.innerWidth < MOBILE_WIDTH;
}
