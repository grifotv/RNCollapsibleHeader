import React from 'react';
import { Dimensions } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export function useSafeAreaInsets() {
  const [insets, setInsets] = React.useState({
    safeAreaInsetsTop: StaticSafeAreaInsets.safeAreaInsetsTop,
    safeAreaInsetsBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    safeAreaInsetsLeft: StaticSafeAreaInsets.safeAreaInsetsLeft,
    safeAreaInsetsRight: StaticSafeAreaInsets.safeAreaInsetsRight,
  });

  React.useEffect(() => {
    let didCancel = false;

    function handleDimensionsChange() {
      StaticSafeAreaInsets.getSafeAreaInsets(values => {
        if (didCancel) {
          return;
        }
        setInsets(values);
      });
    }

    handleDimensionsChange();

    Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      didCancel = true;
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  return insets;
}
