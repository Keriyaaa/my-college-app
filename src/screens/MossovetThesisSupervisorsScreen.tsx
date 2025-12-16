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

export default function MossovetThesisSupervisorsScreen({ navigation }: any) {
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
      const savedSupervisors = await AsyncStorage.getItem('mossovet_thesis_supervisors');
      if (savedSupervisors) {
        setSupervisors(JSON.parse(savedSupervisors));
      } else {
        const initialSupervisors: Supervisor[] = [
          {
            id: '1',
            name: 'Волкова Т.П.',
            department: 'Муниципальное управление',
            maxStudents: 4,
            currentStudents: ['alex@edu.kait20.ru', 'maria@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Городское планирование, Управление ЖКХ'
          },
          {
            id: '2',
            name: 'Смирнов А.В.',
            department: 'Социальные проекты',
            maxStudents: 4,
            currentStudents: ['dmitry@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Социальное предпринимательство, Волонтерство'
          },
          {
            id: '3',
            name: 'Кузнецова Е.И.',
            department: 'Государственная служба',
            maxStudents: 4,
            currentStudents: ['olga@edu.kait20.ru', 'sergey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Административное право, Государственные услуги'
          },
          {
            id: '4',
            name: 'Петров И.С.',
            department: 'Общественные инициативы',
            maxStudents: 4,
            currentStudents: ['artem@edu.kait20.ru', 'ekaterina@edu.kait20.ru', 'vladimir@edu.kait20.ru', 'elena@edu.kait20.ru'],
            isAvailable: false,
            specialization: 'Гражданские инициативы, ТОС'
          },
          {
            id: '5',
            name: 'Захарова М.К.',
            department: 'Экология и благоустройство',
            maxStudents: 4,
            currentStudents: ['andrey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Экологические проекты, Благоустройство территорий'
          },
          {
            id: '6',
            name: 'Николаев В.Д.',
            department: 'Бюджет и финансы',
            maxStudents: 4,
            currentStudents: ['kirill@edu.kait20.ru', 'tatyana@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Муниципальные финансы, Бюджетный процесс'
          },
          {
            id: '7',
            name: 'Федорова Л.А.',
            department: 'Образование и культура',
            maxStudents: 4,
            currentStudents: ['irina@edu.kait20.ru', 'pavel@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Культурная политика, Образовательные проекты'
          },
          {
            id: '8',
            name: 'Алексеев С.П.',
            department: 'Транспорт и инфраструктура',
            maxStudents: 4,
            currentStudents: ['maxim@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Транспортное планирование, Городская инфраструктура'
          },
        ];
        setSupervisors(initialSupervisors);
        await AsyncStorage.setItem('mossovet_thesis_supervisors', JSON.stringify(initialSupervisors));
      }

      const savedApplications = await AsyncStorage.getItem('mossovet_thesis_applications');
      if (savedApplications) {
        setApplications(JSON.parse(savedApplications));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveApplications = async (updatedApplications: StudentApplication[]) => {
    try {
      await AsyncStorage.setItem('mossovet_thesis_applications', JSON.stringify(updatedApplications));
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
      case 'pending': return '#DC2626';
      case 'approved': return '#DC2626';
      case 'rejected': return '#6B7280';
      default: return '#6B7280';
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
          <View style={styles.statusBadge}>
            <Text style={[
              styles.statusText,
              { color: item.isAvailable ? '#DC2626' : '#6B7280' }
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
          <Text style={styles.backButtonText}>Назад  </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Выбор руководителя диплома</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.studentInfo}>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
    backgroundColor: '#8B0000',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white', // Красный цвет
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  studentInfo: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 14,
    color: '#666',
  },
  supervisorsList: {
    padding: 16,
  },
  supervisorCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 2,
  },
  supervisorCardDisabled: {
    opacity: 0.6,
  },
  supervisorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  supervisorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  supervisorDepartment: {
    fontSize: 14,
    color: '#DC2626', // Красный цвет
    fontWeight: '600',
    marginBottom: 4,
  },
  supervisorSpecialization: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    lineHeight: 16,
  },
  studentsInfo: {
    marginBottom: 8,
  },
  studentsText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  freeSlotsText: {
    fontSize: 12,
    color: '#DC2626', // Красный цвет
    fontWeight: '600',
  },
  applicationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  applicationStatusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  unavailableText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  supervisorNameModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626', // Красный цвет
    textAlign: 'center',
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#DC2626', // Красный цвет
    marginLeft: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});