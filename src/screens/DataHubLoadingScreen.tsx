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

export default function DataHubLoadingScreen({ navigation }: any) {
  const progress = new Animated.Value(0);

  useEffect(() => {
    // Анимация прогресс-бара на 3 секунды
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      // Переход на следующий экран
      navigation.replace('DataHubMain');
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
          source={require('../assets/images/datahub.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Надпись под логотипом */}
      <Text style={styles.departmentText}>Датахаб</Text>

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
    width: 150,
    height: 150,
  },
  departmentText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 50,
  },
  progressBackground: {
    width: width - 80,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#8B5CF6', // Фиолетовый цвет
    borderRadius: 3,
  },
});