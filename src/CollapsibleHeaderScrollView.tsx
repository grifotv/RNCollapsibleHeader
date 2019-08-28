import React, { ReactNode } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

type Props = {
    headerHeight: number,
    renderHeader: () => ReactNode,
    children: ReactNode,
}

export const CollapsibleHeaderScrollView:React.FC<Props> = React.memo(({ headerHeight, renderHeader, children }) => {
  // values
  const scrollYRef = React.useRef(0);
  const offsetYRef = React.useRef(0);
  const clampedScrollYRef = React.useRef(0);
  
  // animated values
  const animatedScrollYRef = React.useRef(new Animated.Value(0));
  const animatedOffsetYRef = React.useRef(new Animated.Value(0));
  const animatedClampedScrollYRef = React.useRef(new Animated.Value(0));

  // timeout handles
  const scrollEndTimeoutHandleRef = React.useRef<number>(null);
  const animationRef = React.useRef<any>(null); // TODO: review type

  React.useEffect(() => {
    animatedClampedScrollYRef.current = Animated.diffClamp(
        Animated.add(
          animatedScrollYRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          animatedOffsetYRef.current,
        ),
        0,
        headerHeight,
      );
  }, [headerHeight]);

  React.useEffect(() => {
    // add animated scroll y listener
    animatedScrollYRef.current.addListener(({ value }) => {
      const diff = value - scrollYRef.current;
      scrollYRef.current = value;
      clampedScrollYRef.current = Math.min(
        Math.max(clampedScrollYRef.current + diff, 0),
        headerHeight,
      );
    });
    
    // add animated offset y listener
    animatedOffsetYRef.current.addListener(({ value }) => {
      offsetYRef.current = value;
    });

    return () => {
        // remove listeners
      animatedScrollYRef.current.removeAllListeners();
      animatedOffsetYRef.current.removeAllListeners();
    }
  }, [headerHeight]);

  const handleMomentumScrollEnd = React.useCallback(() => {
    const toValue = scrollYRef.current > headerHeight &&
      clampedScrollYRef.current > headerHeight * 0.5
      ? offsetYRef.current + headerHeight
      : offsetYRef.current - headerHeight;

    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(animatedOffsetYRef.current, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    });
    
    animationRef.current.start();
  }, [headerHeight]);

  const handleScrollEndDrag = React.useCallback(() => {
    scrollEndTimeoutHandleRef.current = setTimeout(handleMomentumScrollEnd, 250);
  }, [handleMomentumScrollEnd]);

  const handleMomentumScrollBegin = React.useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    if (scrollEndTimeoutHandleRef.current) {
      clearTimeout(scrollEndTimeoutHandleRef.current);
    }
  }, []);
  
  const translateY = animatedClampedScrollYRef.current.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });
  
  const opacity = animatedClampedScrollYRef.current.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
        <Animated.ScrollView
            style={styles.scroll}
            scrollEventThrottle={1}
            onMomentumScrollBegin={handleMomentumScrollBegin}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onScrollEndDrag={handleScrollEndDrag}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: animatedScrollYRef.current } } }],
                { useNativeDriver: true },
            )}
        >
            <View style={{ marginTop: headerHeight }}>{children}</View>
        </Animated.ScrollView>
        <Animated.View
            style={[styles.header, {
                height: headerHeight,
                transform: [{ translateY }],
                opacity,
            }]}
        >
            {renderHeader()}
        </Animated.View>
    </View>
  );
});