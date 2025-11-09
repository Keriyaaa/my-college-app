import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

interface Post {
  id: string;
  user: string;
  userEmail: string;
  content: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  timestamp: string;
}

interface Comment {
  id: string;
  user: string;
  userEmail: string;
  text: string;
  timestamp: string;
}

export default function MossovetMainScreen({ navigation }: any) {
  const { userEmail, userName } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  // Загрузка постов из хранилища
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('mossovet_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        // Начальные данные для Mossovet
        const initialPosts: Post[] = [
          {
            id: '1',
            user: 'Анна Иванова',
            userEmail: 'anna@edu.kait20.ru',
            content: 'Сегодня обсуждали проекты благоустройства городских территорий. Очень важно учитывать мнение жителей при планировании общественных пространств!',
            likes: 18,
            comments: [
              { 
                id: '1', 
                user: 'Михаил Петров', 
                userEmail: 'mikhail@edu.kait20.ru',
                text: 'Полностью согласен! Какие районы планируется благоустраивать в первую очередь?', 
                timestamp: '2 часа назад' 
              },
            ],
            isLiked: false,
            timestamp: '4 часа назад',
          },
          {
            id: '2',
            user: 'Денис Смирнов',
            userEmail: 'denis@edu.kait20.ru',
            content: 'Подготовил аналитику по транспортной доступности в центре города. Данные показывают необходимость развития велоинфраструктуры и общественного транспорта.',
            likes: 24,
            comments: [
              { 
                id: '2', 
                user: 'Ольга Козлова', 
                userEmail: 'olga@edu.kait20.ru',
                text: 'Отличная работа! Можно использовать эти данные для нашего проекта по умному городу.', 
                timestamp: '1 час назад' 
              },
            ],
            isLiked: false,
            timestamp: '1 день назад',
          },
          {
            id: '3',
            user: 'Екатерина Волкова',
            userEmail: 'ekaterina@edu.kait20.ru',
            content: 'Ищем волонтеров для организации субботника в парке Горького. Планируем не только уборку, но и посадку новых деревьев. Кто с нами?',
            likes: 35,
            comments: [
              { 
                id: '3', 
                user: 'Алексей Новиков', 
                userEmail: 'alexey@edu.kait20.ru',
                text: 'Я готов помочь! Есть опыт организации подобных мероприятий.', 
                timestamp: '3 часа назад' 
              },
              { 
                id: '4', 
                user: 'Мария Сидорова', 
                userEmail: 'maria@edu.kait20.ru',
                text: 'Когда планируется субботник? Я могу привести группу студентов.', 
                timestamp: '2 часа назад' 
              },
            ],
            isLiked: false,
            timestamp: '2 дня назад',
          },
          {
            id: '4',
            user: 'Сергей Кузнецов',
            userEmail: 'sergey@edu.kait20.ru',
            content: 'Разработал концепцию цифровизации муниципальных услуг. Предлагаю обсудить внедрение единого портала для жителей города.',
            likes: 21,
            comments: [],
            isLiked: false,
            timestamp: '3 дня назад',
          },
          {
            id: '5',
            user: 'Наталья Павлова',
            userEmail: 'natalia@edu.kait20.ru',
            content: 'Провели социологический опрос среди молодежи о качестве досуговой инфраструктуры. Результаты показывают высокий спрос на современные библиотеки и коворкинги.',
            likes: 29,
            comments: [
              { 
                id: '5', 
                user: 'Артем Белов', 
                userEmail: 'artem@edu.kait20.ru',
                text: 'Интересные данные! Можно ли ознакомиться с полной версией отчета?', 
                timestamp: '5 часов назад' 
              },
            ],
            isLiked: false,
            timestamp: '4 дня назад',
          }
        ];
        setPosts(initialPosts);
        await AsyncStorage.setItem('mossovet_posts', JSON.stringify(initialPosts));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const savePosts = async (updatedPosts: Post[]) => {
    try {
      await AsyncStorage.setItem('mossovet_posts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  };

  const handleAddPost = async () => {
    if (!newPostContent.trim()) {
      Alert.alert('Ошибка', 'Пост не может быть пустым');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      user: userName || 'Пользователь',
      userEmail: userEmail || 'unknown@edu.kait20.ru',
      content: newPostContent,
      likes: 0,
      comments: [],
      isLiked: false,
      timestamp: 'Только что',
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    await savePosts(updatedPosts);
    setNewPostContent('');
    setAddPostModalVisible(false);
    
    Alert.alert('Успех', 'Пост добавлен!');
  };

  const handleLike = async (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    await savePosts(updatedPosts);
  };

  const handleAddComment = async () => {
    if (!selectedPost || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: userName || 'Пользователь',
      userEmail: userEmail || 'unknown@edu.kait20.ru',
      text: newComment,
      timestamp: 'Только что',
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    await savePosts(updatedPosts);
    setNewComment('');
    setCommentModalVisible(false);
    setSelectedPost(null);
  };

  const openComments = (post: Post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const handleAccountPress = () => {
    navigation.navigate('Profile');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showLikedOnly) {
      return matchesSearch && post.isLiked;
    }
    
    return matchesSearch;
  });

  const likedPostsCount = posts.filter(post => post.isLiked).length;

  // Выпадающий список для Mossovet
  const dropdownOptions = [
   { 
    id: '1', 
    title: 'Дипломная работа', 
    action: () => navigation.navigate('MossovetThesisSupervisors')
  },
  { 
    id: '2', 
    title: 'Учебный план', 
    action: () => Alert.alert('Учебный план', 'Расписание и учебные материалы') 
  },
  { 
    id: '3', 
    title: 'Партнеры', 
    action: () => navigation.navigate('MossovetPartners')
  },
  { 
    id: '5', 
    title: 'Отделения', 
    action: () => navigation.navigate('Department') 
  },
  { 
    id: '6', 
    title: 'Устав', 
    action: () => navigation.navigate('MossovetCharter')
  },
  ];

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.tempAvatar}>
          <Text style={styles.tempAvatarText}>
            {item.user.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.userEmail}>{item.userEmail}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Text style={[styles.likeText, item.isLiked && styles.likedText]}>
            ❤️ {item.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openComments(item)}
        >
          <Text style={styles.commentText}>💬 {item.comments.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Шапка с поиском, лайками и аккаунтом */}
      <View style={styles.header}>
        {/* Кнопка лайкнутых постов слева */}
        <TouchableOpacity 
          style={[styles.likedButton, showLikedOnly && styles.likedButtonActive]}
          onPress={() => setShowLikedOnly(!showLikedOnly)}
        >
          <Text style={[styles.likedButtonText, showLikedOnly && styles.likedButtonTextActive]}>
            ❤️ {likedPostsCount}
          </Text>
        </TouchableOpacity>

        {/* Поиск по центру */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по новостям..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Кнопка аккаунта справа */}
        <TouchableOpacity 
          style={styles.accountButton}
          onPress={handleAccountPress}
        >
          <Text style={styles.accountButtonText}>👤</Text>
        </TouchableOpacity>

        {/* Кнопка выпадающего списка */}
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownButtonText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Выпадающий список */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            {dropdownOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.dropdownItem}
                onPress={() => {
                  option.action();
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Лента новостей */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {showLikedOnly ? 'Нет лайкнутых постов' : 'Нет постов'}
            </Text>
          </View>
        }
      />

      {/* Кнопка добавления поста - справа снизу */}
      <TouchableOpacity 
        style={styles.addPostButton}
        onPress={() => setAddPostModalVisible(true)}
      >
        <Text style={styles.addPostButtonText}>+</Text>
      </TouchableOpacity>

      {/* Модальное окно добавления поста */}
      <Modal
        visible={addPostModalVisible}
        animationType="slide"
        onRequestClose={() => setAddPostModalVisible(false)}
      >
        <View style={styles.addPostModal}>
          <View style={styles.addPostHeader}>
            <TouchableOpacity onPress={() => setAddPostModalVisible(false)}>
              <Text style={styles.backButton}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.addPostTitle}>Новый пост</Text>
            <TouchableOpacity onPress={handleAddPost}>
              <Text style={styles.publishButton}>Опубликовать</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postAuthor}>
            <View style={styles.tempAvatar}>
              <Text style={styles.tempAvatarText}>
                {(userName || 'П').substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{userName || 'Пользователь'}</Text>
              <Text style={styles.authorEmail}>{userEmail || 'email@edu.kait20.ru'}</Text>
            </View>
          </View>

          <TextInput
            style={styles.postInput}
            placeholder="Что у вас нового?"
            value={newPostContent}
            onChangeText={setNewPostContent}
            multiline
            textAlignVertical="top"
          />
        </View>
      </Modal>

      {/* Модальное окно комментариев */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.commentsModal}>
          <View style={styles.commentsHeader}>
            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
              <Text style={styles.backButton}>Назад</Text>
            </TouchableOpacity>
            <Text style={styles.commentsTitle}>Комментарии</Text>
          </View>

          <FlatList
            data={selectedPost?.comments || []}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{item.user}</Text>
                  <Text style={styles.commentEmail}>{item.userEmail}</Text>
                </View>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            style={styles.commentsList}
          />

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Напишите комментарий..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleAddComment}
            >
              <Text style={styles.sendButtonText}>Отправить</Text>
            </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  likedButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  likedButtonActive: {
    backgroundColor: '#DC2626', // Красный цвет для Mossovet
  },
  likedButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  likedButtonTextActive: {
    color: 'white',
  },
  searchContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  accountButton: {
    padding: 8,
    marginRight: 8,
  },
  accountButtonText: {
    fontSize: 20,
    color: '#333',
  },
  dropdownButton: {
    padding: 8,
  },
  dropdownButtonText: {
    fontSize: 20,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  postsList: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tempAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DC2626', // Красный цвет для Mossovet
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tempAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f8f9fa',
    paddingTop: 12,
  },
  actionButton: {
    marginRight: 20,
  },
  likeText: {
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#DC2626', // Красный цвет для лайков
  },
  commentText: {
    fontSize: 14,
    color: '#666',
  },
  // Плюсик справа снизу - красный
  addPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DC2626', // Красный цвет для Mossovet
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addPostButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -2,
  },
  addPostModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  addPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  addPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    fontSize: 16,
    color: '#DC2626', // Красный цвет
  },
  publishButton: {
    fontSize: 16,
    color: '#DC2626', // Красный цвет
    fontWeight: '600',
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  authorEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  postInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  commentsModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentEmail: {
    fontSize: 12,
    color: '#666',
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#DC2626', // Красный цвет
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});