import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

interface Partner {
  id: string;
  name: string;
  description: string;
  category: string;
  website?: string;
  phone?: string;
  email?: string;
}

export default function AutoPartnersScreen({ navigation }: any) {
  const partners: Partner[] = [
    {
      id: '1',
      name: 'АВТОВАЗ',
      description: 'Крупнейший производитель автомобилей в России и Восточной Европе',
      category: 'Автопроизводство',
      website: 'https://www.lada.ru',
      phone: '+7 (800) 200-52-32',
      email: 'info@lada.ru'
    },
    {
      id: '2',
      name: 'КАМАЗ',
      description: 'Производитель грузовых автомобилей и дизельных двигателей',
      category: 'Грузовой транспорт',
      website: 'https://www.kamaz.ru',
      phone: '+7 (843) 205-01-01',
      email: 'office@kamaz.ru'
    },
    {
      id: '3',
      name: 'ГАЗ Групп',
      description: 'Ведущий производитель коммерческого транспорта в России',
      category: 'Коммерческий транспорт',
      website: 'https://www.gazgroup.ru',
      phone: '+7 (831) 296-30-00',
      email: 'info@gaz.ru'
    },
    {
      id: '4',
      name: 'Bosch Автосервис',
      description: 'Сеть официальных автосервисов с использованием оригинальных запчастей Bosch',
      category: 'Автосервис',
      website: 'https://www.boschcarservice.com/ru/ru/',
      phone: '+7 (800) 200-05-04',
      email: 'bcs.russia@bosch.com'
    },
    {
      id: '5',
      name: 'Шиномонтаж 24/7',
      description: 'Сеть круглосуточных шиномонтажных центров',
      category: 'Шиномонтаж',
      website: 'https://www.shinamontag24.ru',
      phone: '+7 (495) 123-45-67',
      email: 'info@shinamontag24.ru'
    },
    {
      id: '6',
      name: 'Autodoc',
      description: 'Крупнейший онлайн-магазин автозапчастей в Европе',
      category: 'Автозапчасти',
      website: 'https://www.autodoc.ru',
      phone: '+7 (495) 234-56-78',
      email: 'info@autodoc.ru'
    },
    {
      id: '7',
      name: 'ООО "Автотехцентр Профи"',
      description: 'Сервисный центр полного цикла для всех марок автомобилей',
      category: 'Автосервис',
      phone: '+7 (495) 345-67-89',
      email: 'autoprofi@mail.ru'
    },
    {
      id: '8',
      name: 'ООО "Автолакс"',
      description: 'Специализированный центр кузовного ремонта и покраски',
      category: 'Кузовной ремонт',
      phone: '+7 (495) 456-78-90',
      email: 'autolax@yandex.ru'
    },
    {
      id: '9',
      name: 'ООО "Автодеталь"',
      description: 'Оптово-розничная продажа автозапчастей для отечественных и импортных автомобилей',
      category: 'Автозапчасти',
      phone: '+7 (495) 567-89-01',
      email: 'avtodetal@gmail.com'
    },
    {
      id: '10',
      name: 'ООО "Гараж Моторс"',
      description: 'Автосервис премиум-класса с диагностическим оборудованием',
      category: 'Автосервис',
      phone: '+7 (495) 678-90-12',
      email: 'garagemotors@mail.ru'
    },
    {
      id: '11',
      name: 'Shell Автосервис',
      description: 'Сеть автосервисов при АЗС Shell с гарантией качества',
      category: 'Автосервис',
      website: 'https://www.shell.ru',
      phone: '+7 (495) 789-01-23',
      email: 'carservice.ru@shell.com'
    },
    {
      id: '12',
      name: 'ООО "Автоэлектрика Профи"',
      description: 'Специализированный центр по ремонту автомобильной электрики и электроники',
      category: 'Автоэлектрика',
      phone: '+7 (495) 890-12-34',
      email: 'auto.electro@gmail.com'
    },
    {
      id: '13',
      name: 'Lada Центр Москва',
      description: 'Официальный дилер и сервисный центр Lada',
      category: 'Дилерский центр',
      website: 'https://www.lada-moscow.ru',
      phone: '+7 (495) 901-23-45',
      email: 'moscow@lada-center.ru'
    },
    {
      id: '14',
      name: 'Hyundai Motor CIS',
      description: 'Официальный представитель Hyundai в России и СНГ',
      category: 'Автопроизводство',
      website: 'https://www.hyundai.ru',
      phone: '+7 (800) 200-02-00',
      email: 'info@hyundai.ru'
    },
    {
      id: '15',
      name: 'ГИБДД Москвы',
      description: 'Совместные программы по безопасности дорожного движения и обучению',
      category: 'Государственные органы',
      website: 'https://гибдд.рф',
      phone: '+7 (495) 012-34-56',
      email: 'partnership@kait20.ru'
    }
  ];

  const categories = [
    'Все',
    'Автопроизводство',
    'Грузовой транспорт', 
    'Коммерческий транспорт',
    'Автосервис',
    'Шиномонтаж',
    'Автозапчасти',
    'Кузовной ремонт',
    'Автоэлектрика',
    'Дилерский центр',
    'Государственные органы'
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('Все');

  const filteredPartners = selectedCategory === 'Все' 
    ? partners 
    : partners.filter(partner => partner.category === selectedCategory);

  const handleWebsitePress = async (url?: string) => {
    if (!url) {
      Alert.alert('Ошибка', 'Веб-сайт не указан');
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Невозможно открыть веб-сайт');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при открытии веб-сайта');
    }
  };

  const handlePhonePress = (phone?: string) => {
    if (!phone) {
      Alert.alert('Ошибка', 'Телефон не указан');
      return;
    }

    Alert.alert(
      'Позвонить',
      `Вы хотите позвонить по номеру ${phone}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Позвонить', 
          onPress: () => Linking.openURL(`tel:${phone}`)
        }
      ]
    );
  };

  const handleEmailPress = (email?: string) => {
    if (!email) {
      Alert.alert('Ошибка', 'Email не указан');
      return;
    }

    Alert.alert(
      'Написать письмо',
      `Вы хотите написать на email ${email}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Написать', 
          onPress: () => Linking.openURL(`mailto:${email}`)
        }
      ]
    );
  };

  const renderPartner = (partner: Partner) => (
    <View key={partner.id} style={styles.partnerCard}>
      <View style={styles.partnerHeader}>
        <Text style={styles.partnerName}>{partner.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{partner.category}</Text>
        </View>
      </View>
      
      <Text style={styles.partnerDescription}>{partner.description}</Text>
      
      <View style={styles.contacts}>
        {partner.website && (
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleWebsitePress(partner.website)}
          >
            <Text style={styles.contactText}>🌐 Веб-сайт</Text>
          </TouchableOpacity>
        )}
        
        {partner.phone && (
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handlePhonePress(partner.phone)}
          >
            <Text style={styles.contactText}>📞 {partner.phone}</Text>
          </TouchableOpacity>
        )}
        
        {partner.email && (
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleEmailPress(partner.email)}
          >
            <Text style={styles.contactText}>✉️ Email</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Партнеры колледжа</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.counter}>
        <Text style={styles.counterText}>
          Найдено партнеров: {filteredPartners.length}
        </Text>
      </View>

      <ScrollView 
        style={styles.partnersList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.partnersContent}
      >
        {filteredPartners.map(renderPartner)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
    backgroundColor: '#F97316',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white', // Оранжевый цвет
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 6,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    minWidth: 100,
    maxWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#F97316', // Оранжевый цвет
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  counter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  counterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  partnersList: {
    flex: 1,
  },
  partnersContent: {
    padding: 16,
  },
  partnerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  partnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F97316', // Оранжевый цвет
  },
  categoryText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  partnerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  contacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});