import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function DepartmentScreen({ navigation }: any) {
  // Массив отделений - замени пути на свои картинки
  const departments = [
    { id: 1, name: 'Диджитал', image: require('../assets/images/digital.png') },
    { id: 2, name: 'ДатаХаб', image: require('../assets/images/datahub.png') },
    { id: 3, name: 'Кибер', image: require('../assets/images/kiber.png') },
    { id: 4, name: 'Моссовет', image: require('../assets/images/mossovet.png') },
    { id: 5, name: 'Техно', image: require('../assets/images/tehno.png') },
    { id: 6, name: 'Авто', image: require('../assets/images/avto.png') },
  ];

  const handleDepartmentPress = (departmentId: number) => {
  if (departmentId === 1) {
    navigation.navigate('DigitalLoading');
  } else if (departmentId === 2) {
    navigation.navigate('DataHubLoading');
  } else if (departmentId === 3) {
    navigation.navigate('CyberLoading');
  } else if (departmentId === 4) {
    navigation.navigate('MossovetLoading');
  } else if (departmentId === 5) {
    navigation.navigate('TechnoLoading');
  } else if (departmentId === 6) {
    navigation.navigate('AutoLoading');
  }
  };

const handleAccountPress = () => {
  navigation.navigate('Profile');
};

  return (
    <View style={styles.container}>
      {/* Шапка с кнопкой аккаунта */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.accountButton}
          onPress={handleAccountPress}
        >
          <Image
            source={require('../assets/images/account.png')}
            style={styles.accountIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Заголовок */}
      <Text style={styles.title}>Выберите отделение</Text>

      {/* Сетка отделений */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {departments.map((department, index) => (
            <TouchableOpacity
              key={department.id}
              style={styles.departmentItem}
              onPress={() => handleDepartmentPress(department.id)}
            >
              <Image
                source={department.image}
                style={styles.departmentImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingBottom: 20,
  },
  accountButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountIcon: {
    width: 43,
    height: 43,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  departmentItem: {
    width: '48%', // 2 колонки с небольшим отступом
    aspectRatio: 1, // Квадратные кнопки
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  departmentImage: {
    width: '85%',
    height: '85%',
  },
});