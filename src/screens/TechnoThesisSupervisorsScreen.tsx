import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

interface Supervisor {
  id: string;
  name: string;
  department: string;
  maxStudents: number;
  currentStudents: string[];
  isAvailable: boolean;
  specialization: string;
}

interface StudentApplication {
  id: string;
  studentName: string;
  studentEmail: string;
  supervisorId: string;
  supervisorName: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export default function TechnoThesisSupervisorsScreen({ navigation }: any) {
  const { userEmail, userName } = useUser();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedSupervisors = await AsyncStorage.getItem('techno_thesis_supervisors');
      if (savedSupervisors) {
        setSupervisors(JSON.parse(savedSupervisors));
      } else {
        const initialSupervisors: Supervisor[] = [
          {
            id: '1',
            name: 'Волков А.И.',
            department: 'Разработка ПО',
            maxStudents: 4,
            currentStudents: ['alex@edu.kait20.ru', 'maria@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Веб-разработка, Мобильные приложения'
          },
          {
            id: '2',
            name: 'Смирнова Т.В.',
            department: 'Искусственный интеллект',
            maxStudents: 4,
            currentStudents: ['dmitry@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Машинное обучение, Нейронные сети'
          },
          {
            id: '3',
            name: 'Кузнецов П.Е.',
            department: 'Кибербезопасность',
            maxStudents: 4,
            currentStudents: ['olga@edu.kait20.ru', 'sergey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Защита данных, Пентестинг'
          },
          {
            id: '4',
            name: 'Петрова С.М.',
            department: 'Data Science',
            maxStudents: 4,
            currentStudents: ['artem@edu.kait20.ru', 'ekaterina@edu.kait20.ru', 'vladimir@edu.kait20.ru', 'elena@edu.kait20.ru'],
            isAvailable: false,
            specialization: 'Big Data, Аналитика'
          },
          {
            id: '5',
            name: 'Захаров Д.К.',
            department: 'DevOps',
            maxStudents: 4,
            currentStudents: ['andrey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Облачные технологии, CI/CD'
          },
          {
            id: '6',
            name: 'Николаева О.В.',
            department: 'UI/UX Дизайн',
            maxStudents: 4,
            currentStudents: ['kirill@edu.kait20.ru', 'tatyana@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Прототипирование, User Research'
          },
          {
            id: '7',
            name: 'Федоров И.Л.',
            department: 'IoT и Робототехника',
            maxStudents: 4,
            currentStudents: ['irina@edu.kait20.ru', 'pavel@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Умные устройства, Автоматизация'
          },
          {
            id: '8',
            name: 'Алексеева М.С.',
            department: 'Blockchain',
            maxStudents: 4,
            currentStudents: ['maxim@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Смарт-контракты, DeFi'
          },
        ];
        setSupervisors(initialSupervisors);
        await AsyncStorage.setItem('techno_thesis_supervisors', JSON.stringify(initialSupervisors));
      }

      const savedApplications = await AsyncStorage.getItem('techno_thesis_applications');
      if (savedApplications) {
        setApplications(JSON.parse(savedApplications));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveApplications = async (updatedApplications: StudentApplication[]) => {
    try {
      await AsyncStorage.setItem('techno_thesis_applications', JSON.stringify(updatedApplications));
    } catch (error) {
      console.error('Error saving applications:', error);
    }
  };

  const hasExistingApplication = (supervisorId: string) => {
    return applications.some(app => 
      app.studentEmail === userEmail && app.supervisorId === supervisorId
    );
  };

  const getApplicationStatus = (supervisorId: string) => {
    const application = applications.find(app => 
      app.studentEmail === userEmail && app.supervisorId === supervisorId
    );
    return application?.status;
  };

  const handleSupervisorPress = (supervisor: Supervisor) => {
    if (hasExistingApplication(supervisor.id)) {
      const status = getApplicationStatus(supervisor.id);
      Alert.alert(
        'Заявка уже отправлена',
        `Статус вашей заявки: ${getStatusText(status)}`
      );
      return;
    }

    if (!supervisor.isAvailable) {
      Alert.alert('Недоступно', 'Этот преподаватель больше не принимает новых студентов');
      return;
    }

    setSelectedSupervisor(supervisor);
    setApplicationModalVisible(true);
  };

  const handleApply = async () => {
    if (!selectedSupervisor) return;

    const newApplication: StudentApplication = {
      id: Date.now().toString(),
      studentName: userName || 'Студент',
      studentEmail: userEmail || '',
      supervisorId: selectedSupervisor.id,
      supervisorName: selectedSupervisor.name,
      status: 'pending',
      timestamp: new Date().toLocaleDateString('ru-RU'),
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    await saveApplications(updatedApplications);

    setApplicationModalVisible(false);
    setSelectedSupervisor(null);
    
    Alert.alert(
      'Заявка отправлена',
      `Вы подали заявку к преподавателю ${selectedSupervisor.name}. Ожидайте подтверждения.`
    );
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'pending': return 'На рассмотрении';
      case 'approved': return 'Одобрена';
      case 'rejected': return 'Отклонена';
      default: return 'Не отправлена';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending': return '#2563EB'; // Синий
      case 'approved': return '#059669'; // Зеленый
      case 'rejected': return '#DC2626'; // Красный
      default: return '#6B7280'; // Серый
    }
  };

  const renderSupervisor = ({ item }: { item: Supervisor }) => {
    const hasApplication = hasExistingApplication(item.id);
    const applicationStatus = getApplicationStatus(item.id);
    const freeSlots = item.maxStudents - item.currentStudents.length;

    return (
      <TouchableOpacity 
        style={[
          styles.supervisorCard,
          !item.isAvailable && styles.supervisorCardDisabled
        ]}
        onPress={() => handleSupervisorPress(item)}
        disabled={!item.isAvailable && !hasApplication}
      >
        <View style={styles.supervisorHeader}>
          <Text style={styles.supervisorName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.isAvailable ? '#E0F2FE' : '#F3F4F6' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: item.isAvailable ? '#2563EB' : '#6B7280' }
            ]}>
              {item.isAvailable ? 'Свободен' : 'Занят'}
            </Text>
          </View>
        </View>

        <Text style={styles.supervisorDepartment}>{item.department}</Text>
        <Text style={styles.supervisorSpecialization}>{item.specialization}</Text>

        <View style={styles.studentsInfo}>
          <Text style={styles.studentsText}>
            Студенты: {item.currentStudents.length}/{item.maxStudents}
          </Text>
          <Text style={styles.freeSlotsText}>
            Свободно мест: {freeSlots}
          </Text>
        </View>

        {hasApplication && (
          <View style={[styles.applicationStatus, { backgroundColor: getStatusColor(applicationStatus) }]}>
            <Text style={styles.applicationStatusText}>
              {getStatusText(applicationStatus)}
            </Text>
          </View>
        )}

        {!item.isAvailable && !hasApplication && (
          <Text style={styles.unavailableText}>
            Не принимает новых студентов
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Выбор руководителя диплома</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.studentInfo}>
        <View style={styles.techBadge}>
          <Text style={styles.techBadgeText}>TECHNO</Text>
        </View>
        <Text style={styles.studentName}>{userName}</Text>
        <Text style={styles.studentEmail}>{userEmail}</Text>
      </View>

      <FlatList
        data={supervisors}
        renderItem={renderSupervisor}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.supervisorsList}
        numColumns={2}
      />

      <Modal
        visible={applicationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setApplicationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Подача заявки</Text>
            
            {selectedSupervisor && (
              <>
                <Text style={styles.modalText}>
                  Вы хотите подать заявку к преподавателю:
                </Text>
                <Text style={styles.supervisorNameModal}>{selectedSupervisor.name}</Text>
                <Text style={styles.modalText}>
                  {selectedSupervisor.department}
                </Text>
                <Text style={styles.modalText}>
                  Специализация: {selectedSupervisor.specialization}
                </Text>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setApplicationModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Отмена</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={handleApply}
                  >
                    <Text style={styles.applyButtonText}>Подать заявку</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
    backgroundColor: '#2563EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  studentInfo: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  techBadge: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  techBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'monospace',
  },
  supervisorsList: {
    padding: 16,
  },
  supervisorCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  supervisorCardDisabled: {
    opacity: 0.7,
    borderColor: '#E2E8F0',
  },
  supervisorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  supervisorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  supervisorDepartment: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 6,
  },
  supervisorSpecialization: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 16,
  },
  studentsInfo: {
    marginBottom: 12,
  },
  studentsText: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
  freeSlotsText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  applicationStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  applicationStatusText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
  },
  unavailableText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
    textAlign: 'center',
  },
  supervisorNameModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});