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

export default function PartnersScreen({ navigation }: any) {
  const partners: Partner[] = [
    {
      id: '1',
      name: 'АО «НПЦ газотурбостроения «Салют»',
      description: 'Ведущее предприятие по разработке и производству газотурбинных двигателей и энергетических установок',
      category: 'Промышленность',
      website: 'https://www.salut-rtc.ru',
      phone: '+7 (495) 123-45-67',
      email: 'info@salut-rtc.ru'
    },
    {
      id: '2',
      name: 'Акционерное общество "НПО" Орион',
      description: 'Научно-производственное объединение в области радиотехники и электроники',
      category: 'Электроника',
      website: 'https://www.npo-orion.ru',
      phone: '+7 (495) 234-56-78',
      email: 'contact@npo-orion.ru'
    },
    {
      id: '3',
      name: 'АО "ВДНХ"',
      description: 'Крупнейший экспозиционный, музейный и рекреационный комплекс в мире',
      category: 'Культура и образование',
      website: 'https://vdnh.ru',
      phone: '+7 (495) 544-34-00',
      email: 'info@vdnh.ru'
    },
    {
      id: '4',
      name: 'АО "ГОКБ "Прожектор"',
      description: 'Государственное опытно-конструкторское бюро в области светотехники и оптики',
      category: 'Оптика и светотехника',
      website: 'https://www.prozhektor.ru',
      phone: '+7 (495) 345-67-89',
      email: 'gokb@prozhektor.ru'
    },
    {
      id: '5',
      name: 'Открытое общество "Московский завод тепловой автоматики" ОАО МЗТА',
      description: 'Производство приборов и систем тепловой автоматики для ЖКХ и промышленности',
      category: 'Промышленная автоматика',
      website: 'https://www.mzta.ru',
      phone: '+7 (495) 456-78-90',
      email: 'sales@mzta.ru'
    },
    {
      id: '6',
      name: 'АО "НПП "Пульсар" - управляющей организации АО "ГЗ "Пульсар"',
      description: 'Научно-производственное предприятие в области радиотехники и телекоммуникаций',
      category: 'Радиотехника',
      website: 'https://www.pulsar-rti.ru',
      phone: '+7 (495) 567-89-01',
      email: 'office@pulsar-rti.ru'
    },
    {
      id: '7',
      name: 'ООО ПМ-Авто',
      description: 'Сервисный центр по ремонту и обслуживанию автомобилей',
      category: 'Автосервис',
      phone: '+7 (495) 678-90-12',
      email: 'pm-auto@mail.ru'
    },
    {
      id: '8',
      name: 'ООО "Автоартис"',
      description: 'Комплекс услуг по кузовному ремонту и покраске автомобилей',
      category: 'Автосервис',
      phone: '+7 (495) 789-01-23',
      email: 'autoartis@yandex.ru'
    },
    {
      id: '9',
      name: 'ООО "Авто детали"',
      description: 'Продажа автозапчастей и аксессуаров для всех марок автомобилей',
      category: 'Автозапчасти',
      phone: '+7 (495) 890-12-34',
      email: 'autodetails@gmail.com'
    },
    {
      id: '10',
      name: 'ООО "Гараж и К"',
      description: 'Автосервис полного цикла с собственным магазином запчастей',
      category: 'Автосервис',
      phone: '+7 (495) 901-23-45',
      email: 'garage-k@mail.ru'
    },
    {
      id: '11',
      name: 'Преображенский РОСП УФССП и ГБПОУ КАИТ№20',
      description: 'Совместная образовательная программа с Федеральной службой судебных приставов',
      category: 'Государственные органы',
      phone: '+7 (495) 012-34-56',
      email: 'partnership@kait20.ru'
    }
  ];

  const categories = [
    'Все',
    'Промышленность',
    'Электроника', 
    'Культура и образование',
    'Оптика и светотехника',
    'Промышленная автоматика',
    'Радиотехника',
    'Автосервис',
    'Автозапчасти',
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
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Партнеры колледжа</Text>
      </View>

      {/* Категории */}
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
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Счетчик */}
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          Найдено партнеров: {filteredPartners.length}
        </Text>
      </View>

      {/* Список партнеров */}
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoriesContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#FFA500',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  counter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
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
    backgroundColor: '#FFA500',
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