// Haptic Vibration helper for mobile touch devices
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'jackpot' = 'light') {
  if (typeof window === 'undefined' || !navigator.vibrate) return;

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(20);
        break;
      case 'medium':
        navigator.vibrate(50);
        break;
      case 'heavy':
        navigator.vibrate([60, 40, 60]);
        break;
      case 'jackpot':
        navigator.vibrate([100, 50, 100, 50, 200]);
        break;
    }
  } catch {
    // Ignore devices that do not support vibration
  }
}
