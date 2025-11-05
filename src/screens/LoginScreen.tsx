import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    
    if (!text) {
      setEmailError('Поле обязательно для заполнения');
      return false;
    }
    
    if (!text.includes('@')) {
      setEmailError('Email должен содержать @');
      return false;
    }
    
    if (!text.endsWith('@edu.kait20.ru')) {
      setEmailError('Только учебные email @edu.kait20.ru');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    
    if (!text) {
      setPasswordError('Поле обязательно для заполнения');
      return false;
    }
    
    if (text.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

const handleLogin = () => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  
  if (isEmailValid && isPasswordValid) {
    // Переход на экран выбора отделения
    navigation.replace('Department');
  }
};

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Маленькое лого в правом верхнем углу */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logokait20.png')}
            style={styles.smallLogo}
            resizeMode="contain"
          />
        </View>

        {/* Заголовок */}
        <Text style={styles.title}>Авторизируйтесь</Text>
        
        {/* Подзаголовок */}
        <Text style={styles.subtitle}>
          Введите свой адрес учебной электронной почты, чтобы войти
        </Text>

        {/* Поле ввода почты */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="example@edu.kait20.ru"
            placeholderTextColor="#999"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Поле ввода пароля */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Пароль"
            placeholderTextColor="#999"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Кнопка войти */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Войти</Text>
        </TouchableOpacity>

        {/* Подпись внизу */}
        <Text style={styles.footerText}>
          Нажимая войти, вы соглашаетесь с нашими{'\n'}
          <Text style={styles.link}>Условиями предоставления услуг</Text> и {' '}
          <Text style={styles.link}>Политикой конфиденциальности</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  smallLogo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
});