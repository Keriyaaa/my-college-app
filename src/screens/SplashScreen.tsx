import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const progress = new Animated.Value(0);

  useEffect(() => {
    // Анимация прогресс-бара на 3 секунды
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
  navigation.replace('Login');
});
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Логотип по центру */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logokait20.png')} // Замени на свой логотип
          style={styles.logo}
        />
        {/* Если нет логотипа, используй это: */}
        {/* <View style={styles.tempLogo}>
          <Text style={styles.tempLogoText}>ЛОГО</Text>
        </View> */}
      </View>

      {/* Надпись под логотипом */}
      <Text style={styles.collegeText}>
        Колледж автоматизации и информационных технологий №20
      </Text>

      {/* Фиолетовый прогресс-бар */}
      <View style={styles.progressBackground}>
        <Animated.View 
          style={[styles.progressBar, { width: progressWidth }]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  tempLogo: {
    width: 120,
    height: 120,
    backgroundColor: '#8B5CF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempLogoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  collegeText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#505050ff',
    marginBottom: 50,
    lineHeight: 22,
  },
  progressBackground: {
    width: width - 80,
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
});