import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStore} from '../store/useStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme, toggleTheme} = useTheme();
  const {t, language} = useLanguage();
  const logout = useStore((state) => state.logout);
  const currentUser = useStore((state) => state.currentUser);
  const blockedUsers = useStore((state) => state.blockedUsers);
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);

  const handleLogout = () => {
    Alert.alert(
      t('common.logout'),
      'Are you sure you want to logout?',
      [
        {text: t('common.cancel'), style: 'cancel'},
        {
          text: t('common.logout'),
          style: 'destructive',
          onPress: () => {
            logout();
            Alert.alert('Logged Out', 'You have been logged out successfully');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('settings.deleteAccount'),
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {text: t('common.cancel'), style: 'cancel'},
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted');
            logout();
          },
        },
      ]
    );
  };

  const getLanguageName = (code: string) => {
    const languages: {[key: string]: string} = {
      en: 'English',
      vi: 'Tiếng Việt',
    };
    return languages[code] || 'English';
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('settings.title')}
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.textSecondary}]}>
            {t('settings.account').toUpperCase()}
          </Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('AccountInfo')}>
            <Icon name="person-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.accountInfo')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Icon name="key-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.changePassword')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Verification')}>
            <Icon name="shield-checkmark-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.verification')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.textSecondary}]}>
            {t('settings.privacy').toUpperCase()}
          </Text>
          
          <View style={styles.menuItem}>
            <Icon name="notifications-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.notifications')}
            </Text>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSettings({notifications: value})}
              trackColor={{false: '#ccc', true: theme.colors.primary}}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuItem}>
            <Icon name="eye-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.showOnlineStatus')}
            </Text>
            <Switch
              value={settings.showOnline}
              onValueChange={(value) => updateSettings({showOnline: value})}
              trackColor={{false: '#ccc', true: theme.colors.primary}}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuItem}>
            <Icon name="location-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.showDistance')}
            </Text>
            <Switch
              value={settings.showDistance}
              onValueChange={(value) => updateSettings({showDistance: value})}
              trackColor={{false: '#ccc', true: theme.colors.primary}}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('BlockedUsers')}>
            <Icon name="lock-closed-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.blockedUsers')}
            </Text>
            {blockedUsers.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{blockedUsers.length}</Text>
              </View>
            )}
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.textSecondary}]}>
            {t('settings.preferences').toUpperCase()}
          </Text>
          
          <View style={styles.menuItem}>
            <Icon name="moon-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.darkMode')}
            </Text>
            <Switch
              value={settings.darkMode}
              onValueChange={toggleTheme}
              trackColor={{false: '#ccc', true: theme.colors.primary}}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Language')}>
            <Icon name="globe-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.language')}
            </Text>
            <Text style={[styles.menuValue, {color: theme.colors.textSecondary}]}>
              {getLanguageName(language)}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Filters')}>
            <Icon name="options-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.discoverySettings')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.textSecondary}]}>
            {t('settings.support').toUpperCase()}
          </Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('HelpCenter')}>
            <Icon name="help-circle-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.helpCenter')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('TermsConditions')}>
            <Icon name="document-text-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.termsConditions')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Icon name="shield-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={[styles.menuText, {color: theme.colors.text}]}>
              {t('settings.privacyPolicy')}
            </Text>
            <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>{t('common.logout')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Icon name="trash-outline" size={24} color="#FF3B30" />
            <Text style={styles.deleteText}>{t('settings.deleteAccount')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, {color: theme.colors.textSecondary}]}>
            {t('settings.version')} 1.0.0
          </Text>
          <Text style={[styles.copyrightText, {color: theme.colors.disabled}]}>
            {t('settings.copyright')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  content: {flex: 1},
  badge: {backgroundColor: '#FF3B30', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, marginLeft: 8},
  badgeText: {color: '#fff', fontSize: 12, fontWeight: 'bold'},
  section: {paddingVertical: 8, borderBottomWidth: 8, borderBottomColor: '#f5f5f5'},
  sectionTitle: {fontSize: 14, fontWeight: '600', paddingHorizontal: 16, paddingVertical: 12, textTransform: 'uppercase', letterSpacing: 0.5},
  menuItem: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12},
  menuText: {flex: 1, fontSize: 16},
  menuValue: {fontSize: 15, marginRight: 8},
  logoutButton: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12},
  logoutText: {fontSize: 16, color: '#FF3B30', fontWeight: '600'},
  deleteButton: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12},
  deleteText: {fontSize: 16, color: '#FF3B30', fontWeight: '600'},
  versionContainer: {alignItems: 'center', paddingVertical: 24},
  versionText: {fontSize: 14, marginBottom: 4},
  copyrightText: {fontSize: 12},
});

export default SettingsScreen;