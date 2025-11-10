import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStore} from '../store/useStore';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

const BlockedUsersScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const blockedUsers = useStore((state) => state.blockedUsers);
  const allUsers = useStore((state) => state.allUsers);
  const unblockUser = useStore((state) => state.unblockUser);

  const blockedUsersList = allUsers.filter(user => blockedUsers.includes(user.id));

  const handleUnblock = (userId: string, userName: string) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${userName}?`,
      [
        {text: t('common.cancel'), style: 'cancel'},
        {
          text: 'Unblock',
          onPress: () => {
            unblockUser(userId);
            Alert.alert('Unblocked', `${userName} has been unblocked`);
          },
        },
      ]
    );
  };

  const renderBlockedUser = ({item}: any) => (
    <View style={[styles.userItem, {backgroundColor: theme.colors.card}]}>
      <Image source={{uri: item.photos[0]}} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, {color: theme.colors.text}]}>{item.name}, {item.age}</Text>
        <Text style={[styles.userOccupation, {color: theme.colors.textSecondary}]}>{item.occupation}</Text>
      </View>
      <TouchableOpacity
        style={[styles.unblockButton, {borderColor: theme.colors.primary}]}
        onPress={() => handleUnblock(item.id, item.name)}>
        <Text style={[styles.unblockText, {color: theme.colors.primary}]}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('settings.blockedUsers')}
        </Text>
        <View style={{width: 24}} />
      </View>

      {blockedUsersList.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="ban-outline" size={64} color={theme.colors.disabled} />
          <Text style={[styles.emptyText, {color: theme.colors.textSecondary}]}>No blocked users</Text>
          <Text style={[styles.emptySubtext, {color: theme.colors.textSecondary}]}>
            Users you block will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={blockedUsersList}
          renderItem={renderBlockedUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  list: {padding: 16},
  userItem: {flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 12},
  avatar: {width: 50, height: 50, borderRadius: 25},
  userInfo: {flex: 1, marginLeft: 12},
  userName: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  userOccupation: {fontSize: 14},
  unblockButton: {paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, borderWidth: 1},
  unblockText: {fontSize: 14, fontWeight: '600'},
  emptyState: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32},
  emptyText: {fontSize: 18, fontWeight: '600', marginTop: 16},
  emptySubtext: {fontSize: 14, marginTop: 8, textAlign: 'center'},
});

export default BlockedUsersScreen;