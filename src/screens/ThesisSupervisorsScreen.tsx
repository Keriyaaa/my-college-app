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

export default function ThesisSupervisorsScreen({ navigation }: any) {
  const { userEmail, userName } = useUser();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // Загрузка данных
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Загружаем преподавателей
      const savedSupervisors = await AsyncStorage.getItem('thesis_supervisors');
      if (savedSupervisors) {
        setSupervisors(JSON.parse(savedSupervisors));
      } else {
        // Начальные данные преподавателей
        const initialSupervisors: Supervisor[] = [
          {
            id: '1',
            name: 'Иванова А.М.',
            department: 'Веб-разработка',
            maxStudents: 4,
            currentStudents: ['petr@edu.kait20.ru', 'sidor@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'React, Node.js, MongoDB'
          },
          {
            id: '2',
            name: 'Петров С.И.',
            department: 'Мобильная разработка',
            maxStudents: 4,
            currentStudents: ['ivan@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'React Native, Flutter, iOS'
          },
          {
            id: '3',
            name: 'Сидорова Е.В.',
            department: 'UI/UX дизайн',
            maxStudents: 4,
            currentStudents: ['olga@edu.kait20.ru', 'maxim@edu.kait20.ru', 'anna@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Figma, Adobe XD, User Research'
          },
          {
            id: '4',
            name: 'Козлов Д.Н.',
            department: 'Backend разработка',
            maxStudents: 4,
            currentStudents: ['alex@edu.kait20.ru', 'maria@edu.kait20.ru', 'dmitry@edu.kait20.ru', 'ekaterina@edu.kait20.ru'],
            isAvailable: false,
            specialization: 'Python, Django, PostgreSQL'
          },
          {
            id: '5',
            name: 'Николаева О.С.',
            department: 'Data Science',
            maxStudents: 4,
            currentStudents: ['sergey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Python, ML, Data Analysis'
          },
          {
            id: '6',
            name: 'Васильев М.А.',
            department: 'Кибербезопасность',
            maxStudents: 4,
            currentStudents: ['natalia@edu.kait20.ru', 'artem@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Network Security, Cryptography'
          },
          {
            id: '7',
            name: 'Алексеева Т.П.',
            department: 'DevOps',
            maxStudents: 4,
            currentStudents: ['vladimir@edu.kait20.ru', 'elena@edu.kait20.ru', 'andrey@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Docker, Kubernetes, AWS'
          },
          {
            id: '8',
            name: 'Морозов И.К.',
            department: 'Game Development',
            maxStudents: 4,
            currentStudents: ['kirill@edu.kait20.ru'],
            isAvailable: true,
            specialization: 'Unity, C#, 3D Modeling'
          },
        ];
        setSupervisors(initialSupervisors);
        await AsyncStorage.setItem('thesis_supervisors', JSON.stringify(initialSupervisors));
      }

      // Загружаем заявки
      const savedApplications = await AsyncStorage.getItem('thesis_applications');
      if (savedApplications) {
        setApplications(JSON.parse(savedApplications));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveApplications = async (updatedApplications: StudentApplication[]) => {
    try {
      await AsyncStorage.setItem('thesis_applications', JSON.stringify(updatedApplications));
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
      case 'pending': return '#FFA500';
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
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
              { color: item.isAvailable ? '#10B981' : '#EF4444' }
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
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Выбор руководителя диплома</Text>
      </View>

      {/* Информация о студенте */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{userName}</Text>
        <Text style={styles.studentEmail}>{userEmail}</Text>
      </View>

      {/* Список преподавателей */}
      <FlatList
        data={supervisors}
        renderItem={renderSupervisor}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.supervisorsList}
        numColumns={2}
      />

      {/* Модальное окно подачи заявки */}
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
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 16,
    backgroundColor: '#FFA500',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#ffffffff',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  studentInfo: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    color: '#FFA500',
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
    color: '#10B981',
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
    color: '#EF4444',
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
    color: '#FFA500',
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
    backgroundColor: '#FFA500',
    marginLeft: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});