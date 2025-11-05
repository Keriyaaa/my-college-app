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
    { id: 1, name: 'Отделение 1', image: require('../assets/images/digital.png') },
    { id: 2, name: 'Отделение 2', image: require('../assets/images/datahub.png') },
    { id: 3, name: 'Отделение 3', image: require('../assets/images/kiber.png') },
    { id: 4, name: 'Отделение 4', image: require('../assets/images/mossovet.png') },
    { id: 5, name: 'Отделение 5', image: require('../assets/images/tehno.png') },
    { id: 6, name: 'Отделение 6', image: require('../assets/images/avto.png') },
  ];

  const handleDepartmentPress = (departmentId: number) => {
    // Здесь будет логика выбора отделения
    console.log('Выбрано отделение:', departmentId);
    // navigation.navigate('NextScreen');
  };

  const handleAccountPress = () => {
    navigation.navigate('Account');
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
    width: 24,
    height: 24,
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
    width: '80%',
    height: '80%',
  },
});