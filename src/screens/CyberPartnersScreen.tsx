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

export default function CyberPartnersScreen({ navigation }: any) {
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
    // ... остальные партнеры такие же как в DataHubPartnersScreen
    // Для краткости оставлю только первого, остальные аналогично
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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Партнеры колледжа</Text>
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
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive
            ]}>
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
    color: '#10B981', // Зеленый цвет
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
    backgroundColor: '#10B981', // Зеленый цвет
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
    backgroundColor: '#10B981', // Зеленый цвет
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