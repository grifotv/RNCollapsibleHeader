import React from 'react';
import {
  Animated,
  // Easing,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from './useSafeAreaInsets';

const FONT_FAMILY = Platform.select({
  android: 'Roboto',
  ios: 'Avenir Next'
});
const HEADER_HEIGHT = 50;
const PADDING_VERTICAL = 15;
const PADDING_HORIZONTAL = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(100,130,170,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000',
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
  scroll: {
    flex: 1,
  },
  paragraph: {
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: PADDING_HORIZONTAL,
    color: '#000',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_FAMILY,
  },
});

export const App = React.memo(() => {
  // safe are insets
  const { safeAreaInsetsTop, safeAreaInsetsBottom, safeAreaInsetsLeft, safeAreaInsetsRight } = useSafeAreaInsets();
  
  // TODO: to be reviewed
  const headerHeight = React.useMemo(() => {
    return safeAreaInsetsTop + HEADER_HEIGHT;
  }, [safeAreaInsetsTop]);
  
  // values
  const scrollYRef = React.useRef(0);
  const offsetYRef = React.useRef(0);
  const clampedScrollYRef = React.useRef(0);
  
  // animated values
  const animatedScrollYRef = React.useRef(new Animated.Value(0));
  const animatedOffsetYRef = React.useRef(new Animated.Value(0));
  const animatedClampedScrollYRef = React.useRef(Animated.diffClamp(
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
  ));

  // timeout handles
  const scrollEndTimeoutHandleRef = React.useRef<number>(null);
  const animationRef = React.useRef<any>(null); // TODO: review type

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
      // easing: Easing.inOut(Easing.cubic),
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
    <React.Fragment>
      <StatusBar />
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
          <View style={{
            marginTop: headerHeight + PADDING_VERTICAL,
            marginBottom: safeAreaInsetsBottom + PADDING_VERTICAL,
            marginLeft: safeAreaInsetsLeft,
            marginRight: safeAreaInsetsRight
          }}>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum sed arcu ut mattis. Nullam sed gravida ex. Suspendisse ac felis rhoncus, auctor leo eu, suscipit eros. Suspendisse et libero eros. Ut vel mi id tellus pharetra dictum. In dictum, diam sed auctor malesuada, purus mi sagittis ipsum, et tristique mauris nisl nec metus. Morbi in dignissim sem. Phasellus sit amet metus sed neque egestas efficitur.</Text>
            <Text style={styles.paragraph}>Nam leo eros, tempus quis luctus vestibulum, dignissim nec justo. Nam dignissim tincidunt sollicitudin. Donec laoreet posuere lacus. Quisque lobortis commodo pharetra. Sed auctor ligula porttitor urna consequat tristique. Nulla tempor scelerisque odio, at placerat dolor blandit egestas. Nunc porta diam nec malesuada tristique. Pellentesque ut orci tellus.</Text>
            <Text style={styles.paragraph}>Aliquam cursus magna urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam non turpis ac tellus pretium euismod vel sit amet lectus. Duis quis dolor ipsum. Fusce non efficitur erat. Aliquam ornare ex nulla, eu condimentum arcu sollicitudin et. Donec sollicitudin auctor magna et posuere. Morbi a dui vulputate, mollis diam et, auctor purus.</Text>
            <Text style={styles.paragraph}>Integer at cursus massa. Morbi at lobortis leo. Nunc id auctor libero, sit amet tempus tellus. Vestibulum vestibulum augue at quam fermentum fermentum. Vivamus vitae lobortis ligula. Nunc at ex a ipsum tincidunt placerat vitae eget ligula. In pulvinar felis lectus, vitae tempor turpis commodo vulputate. Fusce luctus iaculis neque, cursus accumsan urna dapibus at. Cras et felis egestas, fringilla neque ac, rhoncus felis. Phasellus laoreet sapien eu porta gravida. Phasellus tempor fringilla pharetra. Donec risus erat, fermentum et sagittis et, eleifend quis ante. Proin convallis nibh eu velit consectetur, nec vehicula sem vehicula. Nullam aliquet purus a ligula facilisis vehicula.</Text>
            <Text style={styles.paragraph}>Sed mi quam, placerat sit amet odio eu, porta viverra justo. Duis a ex ex. Praesent quam quam, vestibulum eu dignissim id, elementum in justo. Morbi non lobortis leo. Aenean vitae ante arcu. Vivamus diam orci, venenatis vel varius in, sollicitudin id elit. Morbi interdum a massa eget eleifend.</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum sed arcu ut mattis. Nullam sed gravida ex. Suspendisse ac felis rhoncus, auctor leo eu, suscipit eros. Suspendisse et libero eros. Ut vel mi id tellus pharetra dictum. In dictum, diam sed auctor malesuada, purus mi sagittis ipsum, et tristique mauris nisl nec metus. Morbi in dignissim sem. Phasellus sit amet metus sed neque egestas efficitur.</Text>
            <Text style={styles.paragraph}>Nam leo eros, tempus quis luctus vestibulum, dignissim nec justo. Nam dignissim tincidunt sollicitudin. Donec laoreet posuere lacus. Quisque lobortis commodo pharetra. Sed auctor ligula porttitor urna consequat tristique. Nulla tempor scelerisque odio, at placerat dolor blandit egestas. Nunc porta diam nec malesuada tristique. Pellentesque ut orci tellus.</Text>
            <Text style={styles.paragraph}>Aliquam cursus magna urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam non turpis ac tellus pretium euismod vel sit amet lectus. Duis quis dolor ipsum. Fusce non efficitur erat. Aliquam ornare ex nulla, eu condimentum arcu sollicitudin et. Donec sollicitudin auctor magna et posuere. Morbi a dui vulputate, mollis diam et, auctor purus.</Text>
            <Text style={styles.paragraph}>Integer at cursus massa. Morbi at lobortis leo. Nunc id auctor libero, sit amet tempus tellus. Vestibulum vestibulum augue at quam fermentum fermentum. Vivamus vitae lobortis ligula. Nunc at ex a ipsum tincidunt placerat vitae eget ligula. In pulvinar felis lectus, vitae tempor turpis commodo vulputate. Fusce luctus iaculis neque, cursus accumsan urna dapibus at. Cras et felis egestas, fringilla neque ac, rhoncus felis. Phasellus laoreet sapien eu porta gravida. Phasellus tempor fringilla pharetra. Donec risus erat, fermentum et sagittis et, eleifend quis ante. Proin convallis nibh eu velit consectetur, nec vehicula sem vehicula. Nullam aliquet purus a ligula facilisis vehicula.</Text>
            <Text style={styles.paragraph}>Sed mi quam, placerat sit amet odio eu, porta viverra justo. Duis a ex ex. Praesent quam quam, vestibulum eu dignissim id, elementum in justo. Morbi non lobortis leo. Aenean vitae ante arcu. Vivamus diam orci, venenatis vel varius in, sollicitudin id elit. Morbi interdum a massa eget eleifend.</Text>
          </View>
        </Animated.ScrollView>
        <Animated.View style={[
          styles.header,
          {
            height: headerHeight,
            paddingTop: safeAreaInsetsTop,
            transform: [{ translateY }],
            opacity,
          }
        ]}>
          <Text style={styles.headerTitle}>Title</Text>
        </Animated.View>
      </View>
    </React.Fragment>
  );
});