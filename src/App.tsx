import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from './useSafeAreaInsets';
import { CollapsibleHeaderScrollView } from './CollapsibleHeaderScrollView';

const FONT_FAMILY = Platform.select({
  android: 'Roboto',
  ios: 'Avenir Next'
});
const HEADER_HEIGHT = 50;
const PADDING_VERTICAL = 15;
const PADDING_HORIZONTAL = 30;

const styles = StyleSheet.create({
  header: {
    flex: 1,
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

  const renderHeader = React.useCallback(() => {
    return (
      <View style={[styles.header, { paddingTop: safeAreaInsetsTop }]}>
          <Text style={styles.headerTitle}>Title</Text>
      </View>
    );
  }, [safeAreaInsetsTop]);

  return (
    <React.Fragment>
      <StatusBar />
      <CollapsibleHeaderScrollView
        headerHeight={safeAreaInsetsTop + HEADER_HEIGHT}
        renderHeader={renderHeader}
      >
        <View style={{ backgroundColor: 'tomato' }}>
          <View style={{
            marginTop: PADDING_VERTICAL,
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
        </View>
      </CollapsibleHeaderScrollView>
    </React.Fragment>
  );
});