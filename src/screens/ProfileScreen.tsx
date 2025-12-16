import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

export default function ProfileScreen({ navigation }: any) {
  const { userEmail, userName } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Загружаем состояние уведомлений при монтировании
  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notification_settings');
      if (savedSettings !== null) {
        const settings = JSON.parse(savedSettings);
        setNotificationsEnabled(settings.enabled);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const saveNotificationSettings = async (enabled: boolean) => {
    try {
      const settings = { enabled };
      await AsyncStorage.setItem('notification_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    saveNotificationSettings(newValue);
  };

  // Если userName не задан, используем часть до @ из email
  const displayName = userName || (userEmail ? userEmail.split('@')[0] : 'Иван Иванов');
  const displayEmail = userEmail || 'student@edu.kait20.ru';

  // Форматируем имя: первую букву заглавной
  const formattedName = displayName 
    ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
    : 'Иван Иванов';

  return (
    <ScrollView style={styles.container}>
      {/* Шапка профиля */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Профиль</Text>
      </View>

      {/* Аватар и основная информация */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/account.png')}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.userName}>{formattedName}</Text>
        <Text style={styles.userEmail}>{displayEmail}</Text>
        <Text style={styles.userDepartment}>УО: Дидижитал</Text>
      </View>

      {/* Статистика */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Статистика</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Курсов</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Прогресс</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Часов</Text>
          </View>
        </View>
      </View>

      {/* Настройки */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Настройки</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Редактировать профиль</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        {/* Уведомления с тумблером */}
        <View style={styles.menuItemWithToggle}>
          <Text style={styles.menuText}>Уведомления</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#D1D5DB"
            style={styles.toggleSwitch}
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Безопасность</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Помощь</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка выхода */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          // Здесь можно добавить логику выхода
          navigation.replace('Login');
        }}
      >
        <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#8B5CF6',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userDepartment: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  statsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingsSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 18,
    color: '#999',
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});